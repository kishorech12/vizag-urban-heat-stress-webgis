from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from sqlalchemy import create_engine
from urllib.parse import quote_plus
import geopandas as gpd
import os

app = FastAPI(title="Vizag Urban Heat Stress API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# =========================
# DATABASE CONFIG
# =========================
PG_USER = "postgres"
PG_PASSWORD = quote_plus(os.getenv("PG_PASSWORD"))
PG_HOST = "127.0.0.1"
PG_PORT = "5432"
PG_DB = "vizag_heat"

DB_URL = f"postgresql+psycopg2://{PG_USER}:{PG_PASSWORD}@{PG_HOST}:{PG_PORT}/{PG_DB}"
engine = create_engine(DB_URL)

# =========================
# ALL WARDS WITH HEAT DATA
# =========================
@app.get("/wards")
def get_wards():
    sql = """
    SELECT
        fid,
        ward_lgd_name,
        heat_stress,
        "ndvi-- — zonal_statistics ndvi_ndvi_mean" AS ndvi_mean,
        "lst-- — zonal_statistics_lst_mean" AS lst_mean,
        2024 AS data_year,
        ST_Transform(geom, 4326) AS geom
    FROM "GVMC_wards";
    """
    gdf = gpd.read_postgis(sql, engine, geom_col="geom")
    return gdf.__geo_interface__
# =========================
# TOP 10 HOTTEST WARDS
# =========================
@app.get("/top10")
def top10():
    sql = """
    SELECT
        ward_lgd_name,
        heat_stress,
        geom
    FROM "top10_hottest_wards";
    """
    gdf = gpd.read_postgis(sql, engine, geom_col="geom")
    return gdf.__geo_interface__
