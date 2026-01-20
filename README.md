🌆 Vizag Urban Heat Stress WebGIS

A ward-level Urban Heat Stress Index (HSI) WebGIS application developed for Visakhapatnam Municipal Corporation (GVMC).

This project uses satellite-derived Land Surface Temperature (LST) and NDVI to visualize relative heat stress patterns across urban wards using an interactive web map.

🎯 Project Objective

Analyze spatial variation of urban heat stress at ward level

Identify relatively high heat-stress zones within Visakhapatnam

Develop an interactive WebGIS platform for visualization

Demonstrate an end-to-end GIS → Database → API → WebGIS workflow

📊 Data Used

Satellite data: Sentinel-2 Level-2A (December 2025)

Parameters derived:

Land Surface Temperature (LST)

NDVI (Normalized Difference Vegetation Index)

Administrative boundaries: GVMC ward polygons

🧠 Methodology (Overview)

Mean LST and NDVI values calculated for each ward using zonal statistics

Values normalized to a 0–1 scale

Heat Stress Index (HSI) computed as a relative indicator:

Higher LST → Higher stress

Lower NDVI → Higher stress

Wards ranked based on HSI

Top 10 hottest wards extracted as a separate layer

⚠️ HSI represents relative heat stress, not absolute thermal comfort or health risk.

🗺️ WebGIS Features

OpenStreetMap & Satellite basemaps

Ward-level Heat Stress Index (HSI) choropleth

Top 10 hottest wards highlighted

Interactive popups showing:

Ward name

HSI value

Mean LST (°C)

Mean NDVI

Year (2025)

Search by ward name

Layer toggle and scientific legend

Live latitude/longitude display


🧰 Technology Stack

Database: PostgreSQL + PostGIS

Backend API: FastAPI

Spatial Processing: GeoPandas

Frontend: HTML, CSS, JavaScript

Web Mapping: Leaflet.js

🚀 How to Run
Backend
cd backend
uvicorn main:app --reload


API endpoints:

/wards

/top10

Frontend

Open:

frontend/index.html

⚠️ Limitations

Analysis based on single-date satellite data

Seasonal and diurnal temperature variation not captured

HSI is a comparative spatial index, not a direct health risk metric

👤 Author
Kishore

GIS Analyst

Remote Sensing | Spatial Analysis | WebGIS

Visakhapatnam, India
