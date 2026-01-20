// ================= MAP INIT =================
const map = L.map("map").setView([17.72, 83.30], 11);

// ================= BASEMAPS =================
const osm = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  { attribution: "© OpenStreetMap" }
).addTo(map);

const satellite = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  { attribution: "© Esri World Imagery" }
);

// ================= HSI COLOR =================
function getColor(hsi) {
  return hsi > 0.90 ? "#67000D" :
         hsi > 0.80 ? "#CB181D" :
         hsi > 0.65 ? "#FC8D59" :
         hsi > 0.45 ? "#FEE08B" :
                      "#1A9850";
}

// ================= STYLE =================
function wardStyle(feature) {
  return {
    fillColor: getColor(feature.properties.heat_stress),
    weight: 0.8,
    color: "#333",
    fillOpacity: 0.75
  };
}

// ================= WARD POPUP =================
function wardPopup(feature, layer) {
  const p = feature.properties;
  layer.bindPopup(`
    <b>Ward:</b> ${p.ward_lgd_name}<br>
    <b>HSI:</b> ${p.heat_stress.toFixed(3)}<br>
    <b>LST Mean:</b> ${p.lst_mean.toFixed(2)} °C<br>
    <b>NDVI Mean:</b> ${p.ndvi_mean.toFixed(3)}<br>
    <b>Year:</b> 2025
  `);
}

// ================= TOP 10 STYLE =================
function top10Style() {
  return {
    fillColor: "#b11226",   // cherry red
    color: "#000",
    weight: 2,
    fillOpacity: 0.85
  };
}

// ================= TOP 10 POPUP =================
function top10Popup(feature, layer) {
  const p = feature.properties;
  layer.bindPopup(`
    <b>🔥 Top 10 Hottest Ward</b><br>
    <b>Ward:</b> ${p.ward_lgd_name}<br>
    <b>HSI:</b> ${p.heat_stress.toFixed(3)}<br>
    <b>LST Mean:</b> ${p.lst_mean.toFixed(2)} °C
  `);
}

// ================= LAYERS =================
const wardsLayer = L.geoJSON(null, {
  style: wardStyle,
  onEachFeature: wardPopup
});

const top10Layer = L.geoJSON(null, {
  style: {
    fillColor: "#B10026",   // cherry red
    color: "#FFFFFF",
    weight: 3,
    fillOpacity: 0.9
  },
  onEachFeature: function (feature, layer) {
    const p = feature.properties;
    layer.bindPopup(`
      <b>🔥 TOP 10 HOTTEST WARD</b><br>
      <b>Ward:</b> ${p.ward_lgd_name}<br>
      <b>Heat Stress Index:</b> ${p.heat_stress.toFixed(3)}
    `);
  }
});


// ================= LOAD DATA =================
fetch("http://127.0.0.1:8000/wards")
  .then(res => res.json())
  .then(data => {
    wardsLayer.addData(data).addTo(map);
    map.fitBounds(wardsLayer.getBounds());
  });

fetch("http://127.0.0.1:8000/top10")
  .then(res => res.json())
  .then(data => {
    top10Layer.addData(data);

    // 🔥 ADD THESE TWO LINES
    top10Layer.addTo(map);       // actually draw it
    top10Layer.bringToFront();   // ensure it sits above HSI
  })
  .catch(err => console.error("Top10 load error:", err));



// ================= SEARCH =================
const searchControl = new L.Control.Search({
  layer: wardsLayer,
  propertyName: "ward_lgd_name",
  zoom: 14,
  marker: false
});
map.addControl(searchControl);

// ================= LAYER CONTROL =================
L.control.layers(
  {
    "OpenStreetMap": osm,
    "Satellite": satellite
  },
  {
    "Heat Stress Index (All Wards)": wardsLayer,
    "🔥 Top 10 Hottest Wards": top10Layer
  },
  { collapsed: false }
).addTo(map);

// ================= LEGEND =================
const legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
  const div = L.DomUtil.create("div", "info legend");
  div.innerHTML = `
    <b>🔥 Heat Stress Index</b><br>
    <i style="background:#1A9850"></i> Low (0.27–0.45)<br>
    <i style="background:#FEE08B"></i> Moderate (0.45–0.65)<br>
    <i style="background:#FC8D59"></i> High (0.65–0.80)<br>
    <i style="background:#CB181D"></i> Very High (0.80–0.90)<br>
    <i style="background:#67000D"></i> Extreme (&gt;0.90)
  `;
  return div;
};
legend.addTo(map);


// ================= TOP 10 LEGEND =================
const top10Legend = L.control({ position: "bottomright" });

top10Legend.onAdd = function () {
  const div = L.DomUtil.create("div", "info legend");
  div.innerHTML = `
    <b>🔥 Top 10 Hottest Wards</b><br>
    <i style="background:#B10026"></i> Highest Heat Stress Zones
  `;
  return div;
};

// ================= LIVE COORDINATES =================
const coordControl = L.control({ position: "bottomleft" });
coordControl.onAdd = function () {
  this._div = L.DomUtil.create("div", "coord-box");
  this._div.innerHTML = "Lat: -- , Lng: --";
  return this._div;
};
coordControl.addTo(map);

map.on("mousemove", function (e) {
  coordControl._div.innerHTML =
    "Lat: " + e.latlng.lat.toFixed(5) +
    " , Lng: " + e.latlng.lng.toFixed(5);
});
