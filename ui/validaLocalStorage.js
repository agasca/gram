/*
//Valida localstorage
if(typeof(Storage)!=="undefined") {
    console.clear();
    console.log(Date());
    console.log("localStorage and sessionStorage support!");
    console.log("About to save:");
    console.log(localStorage);
        localStorage["somekey"] = 'hello';
    console.log("Key saved:");
    console.log(localStorage);
        localStorage.removeItem("somekey");  //<--- key deleted here
    console.log("key deleted:");
        console.log(localStorage);
    console.log("DONE ===");
} else {
  console.log("Sorry! No web storage support..");
}
*/


/*
console.clear();
var myArray = new Array(20);
var paso = [];
var camina = 0;

myArray = [
    19.385516, -99.1676189, "http://i.imgur.com/XUmKhWN.png", null, 
    19.385516, -99.1676189, "http://i.imgur.com/eGZ7Kwp.png", null, 
    19.385516, -99.1676189, "http://i.imgur.com/76j9m3P.png", null, 
    19.385516, -99.1676189, "http://i.imgur.com/j2rriPe.png", "Avenida Coyoacán 739 Del Valle Centro 03100 Benito Juárez", 
    19.385553599999998, -99.16766489999999, "http://i.imgur.com/ARSIJP4.jpg", "Avenida Coyoacán 739 Del Valle Centro 03100 Benito Juárez"
    ]


myArray.forEach(function (index,item) {

    pasoCuatro[camina] = index;
    if( camina == 3 ){
        console.log(item,"->", pasoCuatro[0],",",pasoCuatro[1],"-",pasoCuatro[2],"-",pasoCuatro[3],"...>",index,"<...");
        //console.log(item,index,"->",camina);
        camina = 0;
    }else{
        camina +=1;
    }
});
*/