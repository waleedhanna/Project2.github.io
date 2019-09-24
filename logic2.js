// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// An array containing each city's name, location, and population
var cities = [{
  location: [40.7128, -74.0059],
  name: "New York",
  population: "8,550,405: GDP per capita 71,831: Life Expectancy 66.3 - 93.6 years"
},
{
  location: [41.8781, -87.6298],
  name: "Chicago",
  population: "2,720,546: GDP per capita: 61,170: Life Expectancy 60 - 90 years"
},
{
  location: [29.7604, -95.3698],
  name: "Houston",
  population: "2,296,224: GDP per capita: 63,311: Life Expectancy 70 - 78.5 years"
},
{
  location: [34.0522, -118.2437],
  name: "Los Angeles",
  population: "3,971,883: GDP per capita: 67,763: Life Expectancy 82 years"
},
{
  location: [41.2524, -95.9980],
  name: "Omaha",
  population: "446,599: GDP per capita 60,246: Life Expectancy 72 - 90 years"
}
];

// Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
for (var i = 0; i < cities.length; i++) {
  var city = cities[i];
  L.marker(city.location)
    .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Population " + city.population + "</h3>")
    .addTo(myMap);
}
