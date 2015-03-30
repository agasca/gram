/*
--------------------------------
SCIAG imgur Upload
--------------------------------
+ version 1.0
+ Copyright 2015 AGB
+ Licensed under the MIT license
* preparando para cloosures
*/
//<!--acceso al API -->
var instagram_client_id="fc8041d4af1544a2939c3f5a9a1ef8cf";
var _photo_uri;
var imgur_client_id = "1841367133e3c0151755f5632959b990";
var la, lo;
var xValor, yValor;
var ubicacion;
var direcciones = [];
var pasoCuatro = [];

//funcion multiple principal
function getPhotos(){
    var map_visible = $("#mapa").is(':visible');
    var list_visible = $("#list").is(':visible');
    var showing = 0;
    var arrayDirecciones = JSON.parse(localStorage.getItem("dir")); //extrae localstorage
    

    $(".search-button").addClass('ui-disabled');
    $(".result-count").html("cargando...");


    if (map_visible) {
        $("#map_canvas").gmap('clear','markers');
    } else if (list_visible) {
        $("#element_list").empty();}


    if(arrayDirecciones !=null){
        var camina = 0;
        showing++;

        showing = arrayDirecciones.length/4;
        if (map_visible) {
                /*if (arrayDirecciones.length>79){
                    localStorage.removeItem('dir');
                    alert("vacio");
                }*/
                arrayDirecciones.forEach(function(e,i){
                    pasoCuatro[camina] = e;
                    //console.log(i,pasoCuatro[camina]);

                    if( camina == 3 ){
                        //ini.imprime en mapa
                        var position = new google.maps.LatLng( parseFloat(pasoCuatro[0]), parseFloat(pasoCuatro[1]) );
                        var info_window = $('<span>')
                            //.append($('<img>').attr('src', thumbnail))
                            .append($('<br />'))
                            .append($('<a>').attr('href',pasoCuatro[2]).text(pasoCuatro[3])).html();
                            //.append($('<a>').attr('href',link).text(caption)).html();
                        $('#map_canvas').gmap('addMarker', {'position':position}).click(function(){
                            $('#map_canvas').gmap('openInfoWindow', {'content':info_window}, this);
                            $('#map_canvas').gmap('getMap').panTo(position);
                            });
                        //fin.imprime en mapa
                        camina = 0;
                    }else{
                        camina += 1;}
                });
        } else if (list_visible) {
            /*recorreo*/
            arrayDirecciones.forEach(function (index,item) {
                pasoCuatro[camina] = index;
                
                if( camina == 3 ){
                    //console.log(item,"->", pasoCuatro[0],",",pasoCuatro[1],"-",pasoCuatro[2],"-",pasoCuatro[3],"...>",index,"<...");
                    //console.log(item,index,"->",camina);
                    //formato, inyectar codigo
                    $("#element_list").append(
                        $('<li>' ).append(
                            $('<a>').attr('href', pasoCuatro[2] ).append(
                                $('<img>').attr('src', "http://www.pegoga.com/images/logoico.ico")).append(
                                pasoCuatro[3] ))
                        );
                    camina = 0;
                }else{
                    camina +=1;}
            });
            /*recorreo*/
        }
    }
    //recarga estilos
    if (list_visible) {
        $("#element_list").listview("refresh");}

    $(".search-button").removeClass('ui-disabled');
    $(".result-count").html("mostrando  hasta " + showing + " resultados...");
}



//<!--llamadas -->
$("#upload").live("pageshow", function(){
    if(geo){
        geo.getCurrentPosition(
            locationSuccess,
            locationError,
            {enableHighAccuracy: true});

        $("#result-GPS").html("");
        $("#result-GPS").append("No utilizar minetras conduce<br />uscando via GPS.<br />Para mayor precision active el WiFi");
        obtenerGeoInformacion(la, lo);
    }

    //$("#uploadBtn").addClass('ui-disabled');
    //$("#tf").addClass('ui-disabled');
    //$("#pf").removeClass('ui-disabled');
    console.log('upload');
});

//refresh automatico para el listado sin clic en buscar
$("#list").live("pageshow", function(){
    getPhotos();
});

$("#mapa").live("pagecreate", function(){
    $("#tf").addClass('ui-disabled');
    //$("#btnUp").addClass('ui-disabled');
    //$("#uploadBtn").addClass('ui-disabled');
    //$(".fileinput-button").addClass('ui-disabled');

    
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
                locationSuccess,
                locationError,
                {enableHighAccuracy: true});
    }
});

//<!--navega con base en el menu al dar click -->
$(document).on('click','[data-role="navbar"] a',
    function(){
        $.mobile.changePage($(this).attr("data-href"), {
            transition: "none",
            changeHash: false
        });
        return false;
    });

$(document).on('click','[data-role="box"] a',
    function(){
        //if( $(this).attr("id") == "tf"){
            //$("#tf").addClass('ui-disabled');
            //$("#pf").removeClass('ui-disabled');
            //$("#uploadBtn").removeClass('ui-disabled');
            
        //} else if( $(this).attr("id") == "pf"){ //on off camara
            //$("#pf").addClass('ui-disabled');
            //$("#tf").removeClass('ui-disabled');
            //$("#uploadBtn").addClass('ui-disabled');

            //gps
            if(geo){
                geo.getCurrentPosition(
                    locationSuccess,
                    locationError,
                    {enableHighAccuracy: true});

                $("#result-GPS").html("");
                $("#result-GPS").append("No utilizar minetras conduce<br />uscando via GPS.<br />Para mayor precision active el WiFi");
                obtenerGeoInformacion(la, lo);
            //}
        }
        //
        console.log( $(this).attr("id") );
});



/*
--------------------------------
imgur Upload
--------------------------------
+ https://github.com/pinceladasdaweb/imgur-upload
+ version 1.0
+ Copyright 2013 Pedro Rogerio
+ Licensed under the MIT license

+ Documentation: https://github.com/pinceladasdaweb/imgur-upload
*/

var Imgur = (function (d) {
    "use strict";
    /*jslint browser: true*/
    var module = {
        xhr: function () {
            return new XMLHttpRequest();
        },
        create: function (name, props) {
            var el = d.createElement(name), p;
            for (p in props) {
                if (props.hasOwnProperty(p)) {
                    el[p] = props[p];
                }
            }
            return el;
        },
        remove: function (els) {
            while (els.hasChildNodes()) {
                els.removeChild(els.lastChild);
            }
        },
        bindEvent: function () {
            var fileinput = d.querySelector('#uploadBtn'),
                fileName  = d.querySelector('#uploadFile'),
                status    = d.querySelector('.status'),
                self      = this;

            fileinput.addEventListener('change', function (e) {
                var files = e.target.files, file, p, t, i, len;
                for (i = 0, len = files.length; i < len; i += 1) {
                    file = files[i];
                    if (file.type.match(/image.*/)) {
                        self.remove(status);
                        fileName.value = this.value;

                        p = self.create('p');
                        t = d.createTextNode("Uploading...");

                        p.appendChild(t);
                        status.appendChild(p);

                        self.upload(file);
                    } else {
                        self.remove(status);

                        p = self.create('p');
                        t = d.createTextNode("Invalid Archive");

                        p.appendChild(t);
                        status.appendChild(p);
                    }
                }
            }, false);
        },
        upload: function (file) {
            var self     = this,
                xhttp    = self.xhr(),
                status   = d.querySelector('.status'),
                fd       = new FormData();

            fd.append('image', file);
            fd.append('title', "titulo");
            fd.append('description', ubicacion);


            xhttp.open('POST', 'https://api.imgur.com/3/image');
            xhttp.setRequestHeader('Authorization', 'Client-ID f0f458e1b398cb0'); //Get yout Client ID here: http://api.imgur.com/
            xhttp.onreadystatechange = function () {
                if (xhttp.status === 200 && xhttp.readyState === 4) {
                    var res = JSON.parse(xhttp.responseText), link, p, t;

                    self.remove(status);

                    link = res.data.link;
                    p    = self.create('p');
                    t    = d.createTextNode(link);

                    p.appendChild(t);
                    status.appendChild(p);
                    if (xhttp.responseText.length>0){
                        //direcciones.push(xValor, yValor, link, ubicacion);
                        //localStorage.setItem("dir", JSON.stringify(direcciones));                        
                        try {
                            
                            //var direcc = JSON.parse(localStorage["dir"]);
                            //var repeated=direcc.filter(function(a){ return a.yValor==yValor}).length;
                                
                            //if(!repeated){

                                //allitems.push({"myitem":newitem});
                                

                                //if ( direcc.length>0 ){
                                //    alert(1);
                                //direcciones = JSON.parse(localStorage.getItem("dir"));
                                //}
                                var arrayDir = JSON.parse(localStorage.getItem("dir")); 
                                if(arrayDir.length>0){
                                   direcciones = JSON.parse(localStorage.getItem("dir")); 
                               }

                                direcciones.push(xValor+'', yValor+'', link, ubicacion);
                                localStorage.setItem('dir', JSON.stringify(direcciones));

                            //}else{
                            //    alert('already added');}

                        } catch (exception) {

                            
                            //if(exception.message == "Cannot read property 'push' of null"){
                                //direcciones = JSON.parse(localStorage.getItem("dir"));                            
                            //    console.log((xValor+'', yValor+'', link, ubicacion));
                            //}
                            //console.log(exception);
                            if(exception.message == "Cannot read property 'length' of null" || exception.message == "null is not an object (evaluating 'arrayDir.length')"){
                                //console.log(xValor+'', yValor+'', link, ubicacion);
                                direcciones.push(xValor+'', yValor+'', link, ubicacion);
                                localStorage.setItem('dir', JSON.stringify(direcciones));
                                //console.log("Primer registro");
                                //console.log(exception.message);
                                //console.log("...");
                            }else if(exception == null){
                                direcciones = JSON.parse(localStorage.getItem("dir"));

                            } else if (exception == "QUOTA_EXCEEDED_ERR") {
                                console.log("Error: Local Storage limit exceeds.");

                            }else {
                                console.log("Error: Saving to local storage.");}

                            //alert(exception);

                        }

                    }
                }
            };
            //console.log(xhttp);
            xhttp.send(fd);
        },
        init: function () {
            module.bindEvent();
        }
    };
    return {
        init: module.init
    };
}(document));