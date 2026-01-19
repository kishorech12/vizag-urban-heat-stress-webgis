🌆 Vizag Urban Heat Stress WebGIS

A ward-level Urban Heat Stress Index (HSI) WebGIS platform developed for Visakhapatnam Municipal Corporation (GVMC) using PostGIS, FastAPI, and Leaflet.
This project integrates Land Surface Temperature (LST) and NDVI to identify spatial heat stress patterns and highlight the top 10 hottest wards for urban planning and climate resilience.

🎯 Objective

Quantify urban heat stress at ward level

Identify high-risk zones within Visakhapatnam

Provide an interactive WebGIS for planners, researchers, and decision-makers

Demonstrate end-to-end GIS + WebGIS + Spatial Database workflow

🧠 Methodology (Scientific Basis)
🔹 Input Data

LST (Land Surface Temperature) – derived from satellite thermal bands

NDVI (Normalized Difference Vegetation Index) – vegetation density indicator

Ward boundaries – GVMC administrative polygons

🔹 Processing Steps

Zonal statistics performed for each ward:

Mean LST

Mean NDVI

Values normalized to 0–1 scale

Heat Stress Index (HSI) calculated using a weighted combination:

HSI ∝ High LST + Low NDVI


Wards ranked by HSI

Top 10 hottest wards extracted as a separate spatial layer

HSI values range from 0.27 (low stress) to 0.98 (extreme stress)

🗺️ WebGIS Features
✔ Interactive Map

OpenStreetMap & Satellite basemaps

Ward-level choropleth (HSI)

✔ Layers

Heat Stress Index (All Wards)

🔥 Top 10 Hottest Wards (highlighted)

✔ Popups

Ward name

Heat Stress Index

Mean LST (°C)

Mean NDVI

Year of analysis

✔ Tools

Layer control (toggle layers)

Search by ward name

Live latitude/longitude display

Scientific color legend

🧰 Tech Stack
Layer	Technology
Database	PostgreSQL + PostGIS
Backend API	FastAPI
Spatial Processing	GeoPandas
Frontend	HTML, CSS, JavaScript
Web Mapping	Leaflet.js
Version Control	Git & GitHub
🚀 How to Run Locally
1️⃣ Backend
cd backend
venv\Scripts\activate
uvicorn main:app --reload

API endpoints:

/wards → All ward HSI data

/top10 → Top 10 hottest wards

2️⃣ Frontend

Open:

frontend/index.html

in browser

📎 Limitations

HSI values are relative indicators intended for intra-city comparison.
Results depend on satellite acquisition date and seasonal conditions.
📌 Applications

Urban climate planning

Heat mitigation strategy design

Green infrastructure prioritization

Academic & professional GIS portfolios

👤 Author

Kishore
GIS | Remote Sensing | WebGIS
📍 Visakhapatnam, India
