/*
--------------------------------
SCIAG imgur Upload
--------------------------------
+ version 1.0
+ Copyright 2015 AGB
+ Licensed under the MIT license

*/
//clear locaStorage, debe activarse la linea debajo
//localStorage.clear();

//geolocalizar para ser asignado a la foto
var geo = navigator.geolocation;
var base_url = "https://query.yahooapis.com/v1/public/yql?";



//ini.obtiene geoInformacion ydl
function procesarGeoInfo(datos){
    var res = datos.query.results.Result;
    var barrio = res.neighborhood;
    var ciudad = res.city;
    var pais = res.country;
    var l1 = res.line1;
    var l2 = res.line2;
    var l3 = res.line3;
    var woeid = res.woeid;

    ubicacion = l1 + " " + l2 + " " + l3;
    $("#result-GPS").html('<p>'+woeid+'<br /><strong>'+l1+'</strong><br />'+l2+', '+l3+'</p>');
    //$('#result-GPS').append('<p>'+woeid+'<br /><strong>'+l1+'</strong><br />'+l2+', '+l3+'</p>');
}


function obtenerGeoInformacion(lat,lon){
    var query = 'SELECT * FROM geo.placefinder WHERE text="'+lat+', '+lon+'" AND gflags = "R"';

    query = encodeURIComponent(query);
    //peticiones ajax genericas, recibe un objeto de opciones
    $.ajax({
        url : base_url+"q="+query,  //equivale a var opciones = {};
        dataType : 'jsonp',
        jsonpCallback : 'procesarGeoInfo',
        data : { format: 'json' }   //respuesta en xml o json
    });
}
//fin.obtiene geoInformacion ydl


//ini.geolocaliza en el mapa
function locationSuccess(position){
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    la = lat;
    lo = lng;
    xValor = lat;
    yValor = lng;

    $("#map_canvas").gmap({'center': new google.maps.LatLng(lat, lng), 'zoom': 12});
    getPhotos();
}


function locationError(error){
    $("#map_canvas").gmap({'zoom':2});
    getPhotos();
}
//fin.geolocaliza en el mapa