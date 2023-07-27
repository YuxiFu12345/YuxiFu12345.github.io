mapboxgl.accessToken = 'pk.eyJ1IjoieXV4aS1mMTIzIiwiYSI6ImNsY3BhNjJocDBnb2kzeGxhb21uazR2ODIifQ.23ODEOAL23zEbwNCWwnnMg';

const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/yuxi-f123/cldaaxuqb004i01qrj91gg3ka' // replace this with your style URL
});




map.on('load', () => {
    const layers = [
    "Very High",
    "High",
    "Moderate ",
    "Low",
    "Very low"
  ];
  const colors = [
    "#1a9641",
    "#a6d96a",
    "#ffffbf",
    "#fdae61",
    "#d17172"
  ];

// create legend
const legend = document.getElementById('legend');
 
layers.forEach((layer, i) => {
const color = colors[i];
const item = document.createElement('div');
const key = document.createElement('span');
key.className = 'legend-key';
key.style.backgroundColor = color;
 
const value = document.createElement('span');
value.innerHTML = `${layer}`;
item.appendChild(key);
item.appendChild(value);
legend.appendChild(item);
});

  map.addSource("hover", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] }
  });

  map.addLayer({
    id: "dz-hover",
    type: "line",
    source: "hover",
    layout: {},
    paint: {
      "line-color": "black",
      "line-width": 1
}
});



map.on("mousemove", (event) => {
  const areas = map.queryRenderedFeatures(event.point, {
    layers: ["opportunity-index-equity-trac-936awh"]
  });

document.getElementById('pd').innerHTML = areas.length
? `<h3>Geo-information id: ${areas[0].properties.geoid10}</h3><p>health index:<strong><em>${areas[0].properties.hlth_index}</strong> </p>`
: `<p>Hover over a zone!</p>`;
  
    map.getSource("hover").setData({
    type: "FeatureCollection",
    features: areas.map(function (f) {
      return { type: "Feature", geometry: f.geometry };
    })
  });
  

});
});



const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for places in Puget Sound Regional", // Placeholder text for the search bar
  proximity: {
    longitude: 47.56743,
    latitude: -121.89995
  } // Coordinates of Puget Sound Regional center
});

map.addControl(geocoder, "top-left");

map.addControl(new mapboxgl.NavigationControl(), "top-left");

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "top-left"
);