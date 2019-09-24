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
    lifeexp2007:  78,
    GDP1952:"13990",
    GDP2007:"42951",
    Population1952:"157553000",
    Population2007: "301139947",
    changeinLifeExp:"14.71",
    changeinpop: "91.14",
    changeinGDP:"207.01"
  },
  {
      name: "China",
      location: [35.8617, 104.1954],
      lifeExp1952:44,
      lifeexp2007:  72,
      GDP1952:"400.45",
      GDP2007:"4959.11",
      Population1952:"556263527",
      Population2007:"1318683096",
      changeinLifeExp:"63.64",
      changeinpop: "91.14",
      changeinGDP: "1138.38"
  },
  {
      name:"India",
      location: [20.5937, 78.9629],
      lifeExp1952:37,
      lifeexp2007:  64,
      GDP1952:"546.56",
      GDP2007:"2452.21",
      Population1952:"372000000",
      Population2007:"1110396331",
      changeinLifeExp:"72.97",
      changeinpop: "198.49",
      changeinGDP:"348.66"
  }
];

//Define arrays to hold various country data circles
var countryCirclesLExp = [];
var countryCirclesGDP2007 = [];
var countryCirclesPop = [];

for(var i=0; i<country_data.length;i++){
    var lifecolor="";
    if(country_data[i].lifeexp2007 >75){
      color = "green";
    }
    else if(country_data[i].lifeexp2007>70){
      color='blue';
    }
    else {
      color='red';
    }
    var GDPcolor="";
    if(country_data[i].GDP2007 >10000){
      color = "green";
    }
    else if(country_data[i].GDP2007>5000){
      color='blue';
    }
    else {
      color='red';
    }
    var Popcolor="";
    if(country_data[i].Population2007 >1250000000){
      color = "green";
    }
    else if(country_data[i].Population2007>1000000000){
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
        radius:country_data[i].lifeexp2007*16000
      }).bindPopup("<h1>"+country_data[i].name+"</h1><hr><h3> Life Expectancy 1952: "+ country_data[i].lifeExp1952 + "<h3> Life Expectancy 2007: " + country_data[i].lifeexp2007 + "<hr> Change in Life Expectancy " +(parseFloat(country_data[i].changeinLifeExp).toFixed(2)+'%')+"</h3>")
    );

    countryCirclesGDP2007.push(
      L.circle(country_data[i].location,{
        stroke:false,
        fillOpacity:.75,
        color:"black",
        fillColor:color,
        radius:country_data[i].GDP2007*100
      }).bindPopup("<h1>"+country_data[i].name+"</h1><hr><h3>GDP 1952: " + '$'.concat(parseFloat(country_data[i].GDP1952).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) +"<h3>GDP 2007: " + '$'.concat(parseFloat(country_data[i].GDP2007).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) + "<hr> Change in GDP "+(parseFloat(country_data[i].changeinGDP).toFixed(2)+'%')+ "</h3>")
    );

    countryCirclesPop.push(
      L.circle(country_data[i].location,{
        stroke:false,
        fillOpacity:.75,
        color:"black",
        fillColor:color,
        radius:country_data[i].Population2007 *1/500
      }).bindPopup("<h1>"+country_data[i].name+"</h1> <hr> <h3>Population 1952: " + (parseFloat(country_data[i].Population1952).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + "<h3>Population 2007: " + (parseFloat(country_data[i].Population2007).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + "<hr> Change in Population "+(parseFloat(country_data[i].changeinpop).toFixed(2) + '%')+ "</h3>")
    );
}

//Create three separate layer groups for the cirles for:lifeExp2007,Pop,GDP2007
var LifeExp2007Layer = L.layerGroup(countryCirclesLExp);
var GDP2007Layer = L.layerGroup(countryCirclesGDP2007);
var PopLayer = L.layerGroup(countryCirclesPop);

//Create baseMaps object
var baseMaps ={
  "Light Map": lightmap,
  "Dark Map": darkmap
};

//Create overlay object
var overlayMaps ={
  "Country Life Expectancy": LifeExp2007Layer,
  "Country GDP": GDP2007Layer,
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



