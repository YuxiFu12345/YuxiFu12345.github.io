mapboxgl.accessToken = 'pk.eyJ1IjoieXV4aS1mMTIzIiwiYSI6ImNsY3BhNjJocDBnb2kzeGxhb21uazR2ODIifQ.23ODEOAL23zEbwNCWwnnMg';

const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/yuxi-f123/cld0bha5600mn14qnd3ytnska' // replace this with your style URL
});




map.on('load', () => {
    const layers = [
    "Acute",
    "Extremely high",
    "Relatively high ",
    "Average",
    "Relatively low",
    "Extremely low"
  ];
  const colors = [
    "#862d37",
    "#ef8a62",
    "#fddbc7",
    "#d1e5f0",
    "#67a9cf",
    "#2166ac"
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
    layers: ["1111111111-9ao8jh"]
  });

document.getElementById('pd').innerHTML = areas.length
? `<h3>CODE: ${areas[0].properties.DZ_CODE}</h3><p>Level of exposure:<strong><em>${areas[0].properties.Zexp_cl}</strong> </p>`
: `<p>Hover over an areas!</p>`;
  
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
  placeholder: "Search for places in Edinburgh", // Placeholder text for the search bar
  proximity: {
    longitude: 55.94669,
    latitude: -3.21114
  } // Coordinates of Edinburgh center
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