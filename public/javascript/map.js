const myMap = L.map("map").setView([-34.25, -54.5], 9);
let popUp = L.popup();

let rochaBeaches = 0;
let maldonadoBeaches = 0;
let canelonesBeaches = 0;
let montevideoBeaches = 0;

const customKmlBeaches = function(layer) {
  this.eachLayer(function(marker) {
    let markerJson = marker.toGeoJSON();

    checkBeachDepartment(markerJson.properties.depto);
    const markerIcon = getBeachMarker(markerJson.properties.depto);
    const theIcon = L.icon(markerIcon);
    const markerPopUp =
      "<div class='popup'>Nombre: <span class='name-beach'><strong>" +
      markerJson.properties.nombre +
      "</strong></span><br /><span class='depto-beach'><i>" +
      markerJson.properties.depto +
      "</i></span><br /><span class='coordinates'>Coords: " +
      markerJson.geometry.coordinates[0] +
      ", " +
      markerJson.geometry.coordinates[1] +
      "</span></div>";
    marker.bindPopup(markerPopUp);
    marker.setIcon(theIcon);
  });
  setQuantityInHtml();
};

const setQuantityInHtml = function() {
  document.getElementById("montevideo").innerHTML = montevideoBeaches;
  document.getElementById("rocha").innerHTML = rochaBeaches;
  document.getElementById("canelones").innerHTML = canelonesBeaches;
  document.getElementById("maldonado").innerHTML = maldonadoBeaches;
};

const checkBeachDepartment = function(dept) {
  if (dept === "ROCHA" || dept === "Rocha") {
    rochaBeaches++;
  }
  if (dept === "MALDONADO" || dept === "Maldonado") {
    maldonadoBeaches++;
  }
  if (dept === "CANELONES" || dept === "Canelones") {
    canelonesBeaches++;
  }
  if (dept === "MONTEVIDEO" || dept === "Montevideo") {
    montevideoBeaches++;
  }
};

const getBeachMarker = function(dept) {
  if (dept === "ROCHA" || dept === "Rocha") {
    const markerRocha = {
      iconUrl: "/icons/beach-icon-rocha.png",
      iconSize: [50, 50],
      iconAnchor: [25, 25]
    };
    return markerRocha;
  }
  if (dept === "MALDONADO" || dept === "Maldonado") {
    const markerMald = {
      iconUrl: "/icons/beach-icon-maldonado.png",
      iconSize: [50, 50],
      iconAnchor: [25, 25]
    };
    return markerMald;
  }
  if (dept === "CANELONES" || dept === "Canelones") {
    const markerCanelones = {
      iconUrl: "/icons/beach-icon-canelones.png",
      iconSize: [50, 50],
      iconAnchor: [25, 25]
    };
    return markerCanelones;
  }
  if (dept === "MONTEVIDEO" || dept === "Montevideo") {
    const markerMontevideo = {
      iconUrl: "/icons/beach-icon-montevideo.png",
      iconSize: [50, 50],
      iconAnchor: [25, 25]
    };
    return markerMontevideo;
  }
};

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a>",
  maxZoom: 18,
  id: "map-container"
}).addTo(myMap);

omnivore
  .kml("/data/beaches.kml")
  .addTo(myMap)
  .on("error", error => {
    console.log(error);
  })
  .on("ready", customKmlBeaches);

omnivore
  .kml("/data/depts.kml")
  .addTo(myMap)
  .on("error", error => {
    console.log(error);
  });
