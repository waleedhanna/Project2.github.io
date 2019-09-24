//Base layer
var lightmap= L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

//Country Data
var country_data = [{
    name: "United States",
    location: [37.0902, -95.7129],
    lifeExp1952:  68,
    lifeexp2014:  79,
    GDP1952:"16508",
    GDP2014:"52118",
    Population1952:"163324851",
    Population2014: "317718779",
    changeinLifeExp:"16.18",
    changeinpop: "94.53",
    changeinGDP:"215.71",
    title: "United States"
  },
  {
      name: "China",
      location: [35.8617, 104.1954],
      lifeExp1952:42,
      lifeexp2014:  75,
      GDP1952:"631",
      GDP2014:"12609",
      Population1952:"582029301",
      Population2014:"1390110388",
      changeinLifeExp:"78.57",
      changeinpop: "138.84",
      changeinGDP: "1898.26"
  },
  {
      name:"India",
      location: [20.5937, 78.9629],
      lifeExp1952:37,
      lifeexp2014:  66,
      GDP1952:"546",
      GDP2014:"5565",
      Population1952:"372000000",
      Population2014:"1293859294",
      changeinLifeExp:"78.38",
      changeinpop: "247.81",
      changeinGDP:"919.23"
  }
];

//Define arrays to hold various country data circles
var countryCirclesLExp = [];
var countryCirclesGDP2014 = [];
var countryCirclesPop = [];

for(var i=0; i<country_data.length;i++){
    var lifecolor="";
    if(country_data[i].lifeexp2014 >75){
      color = "green";
    }
    else if(country_data[i].lifeexp2014>70){
      color='blue';
    }
    else {
      color='red';
    }

    countryCirclesLExp.push(
      L.circle(country_data[i].location,{
        stroke:false,
        fillOpacity:.75,
        color:"black",
        fillColor:color,
        radius:country_data[i].lifeexp2014*18000
      }).bindPopup("<h1>"+country_data[i].name+"</h1><hr><h3> Life Expectancy 1952: "+ country_data[i].lifeExp1952 + "<h3> Life Expectancy 2014: " + country_data[i].lifeexp2014 + "<hr> Change in Life Expectancy: +" +(parseFloat(country_data[i].changeinLifeExp).toFixed(2)+'%')+"</h3>")
    );

    countryCirclesGDP2014.push(
      L.circle(country_data[i].location,{
        stroke:false,
        fillOpacity:.75,
        color:"black",
        fillColor:color,
        radius:country_data[i].GDP2014*100
      }).bindPopup("<h1>"+country_data[i].name+"</h1><hr><h3>GDP 1952: " + '$'.concat(parseFloat(country_data[i].GDP1952).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) +"<h3>GDP 2014: " + '$'.concat(parseFloat(country_data[i].GDP2014).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + "<hr> Change in GDP: +"+(parseFloat(country_data[i].changeinGDP).toFixed(2)+'%')+ "</h3>")
    );

    countryCirclesPop.push(
      L.circle(country_data[i].location,{
        stroke:false,
        fillOpacity:.75,
        color:"black",
        fillColor:color,
        radius:country_data[i].Population2014 *1/500
      }).bindPopup("<h1>"+country_data[i].name+"</h1> <hr> <h3>Population 1952: " + (parseFloat(country_data[i].Population1952).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + "<h3>Population 2014: " + (parseFloat(country_data[i].Population2014).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + "<hr> Change in Population: +"+(parseFloat(country_data[i].changeinpop).toFixed(2) + '%')+ "</h3>")
    );
}

//Create three separate layer groups for the cirles for:lifeExp2014,Pop,GDP2014
var LifeExp2014Layer = L.layerGroup(countryCirclesLExp);
var GDP2014Layer = L.layerGroup(countryCirclesGDP2014);
var PopLayer = L.layerGroup(countryCirclesPop);

//Create baseMaps object
var baseMaps ={
  "Light Map": lightmap,
  "Dark Map": darkmap
};

//Create overlay object
var overlayMaps ={
  "Country Life Expectancy": LifeExp2014Layer,
  "Country GDP": GDP2014Layer,
  "Country Population": PopLayer,
};

//Define map object
//Create map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 2,
  layers:[lightmap]
});

//Pass our map layers into layer control
//Add the layer control to the map
L.control.layers(baseMaps,overlayMaps,{
  collapsed:false
}).addTo(myMap);



