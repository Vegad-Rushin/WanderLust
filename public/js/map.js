
// mapboxgl.accessToken = mapToken
// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/standard', // Use the standard style for the map
//     zoom: 9, // initial zoom level, 0 is the world view, higher values zoom in
//     center: [77.2088, 28.6139], // or write coordinates center the map on this longitude and latitude
// });

// map.on('load', () => {
//     new mapboxgl.Marker()
//         .setLngLat(listing.geometry.coordinates)
//         .addTo(map);

//     map.flyTo({
//         center: listing.geometry.coordinates,
//         zoom: 10
//     });
// });

// const marker = new mapboxgl.Marker({ color: "red" })
// .setLngLat(coordinates) // Listing.geometry.coordinates
// .setPopup(
//     new mapboxgl.Popup({ offset: 25 }).setHTML(
//         `<h4>${listing.location}</h4><p>Exact location provided after booking</p>`
//     )
// )
// .addTo(map);

mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/standard',
  zoom: 9,
  center: listing.geometry.coordinates
});

map.on('load', () => {
  const popup = new mapboxgl.Popup({ offset: 25 })
    .setHTML(`
      <h4>${listing.title}</h4>
      <p>Exact location will be provided after booking</p>
    `);

  const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(popup)
    .addTo(map);

  map.flyTo({
    center: listing.geometry.coordinates,
    zoom: 10
  });

//   // 🔥 THIS LINE opens the popup automatically
//   marker.togglePopup();
});
