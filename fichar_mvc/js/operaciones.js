"use estrict";
var coordenadas; 
function comprobarCredenciales(tiempo_exp){
    var valorCompHorario = comprobarHorario();
    var valorCompCoordenada = comprobarCoordenadas();
    alert(valorCompCoordenada);

    if (!comprobarCookie("fichado")) {
        if (valorCompHorario && valorCompCoordenada) {
            var fecha = new Date();
            var n = fecha.getDate();
            console.log(n)
            crearCookie("fichado",n,tiempo_exp);
            return true;
        }else{
            $('.info').attr("class","info");
            $('.info').text("localización u horario incorrecto");
            return false;
        }
    }else{
        $('.info').attr("class","info");
        $('.info').text("Ya has fichado hoy");
        return false;
    }
    //si las credenciales son correctas, creamos una cookie
};
function comprobarUsuario(){
    var usuario = $('#identificador').val();
    
    if (usuario.localeCompare("pepe") == 0){
        //console.log("correcto");
        var identificador = recogerCookie("identificador",usuario);
        crearCookie("identificador",usuario); // comprobar antes la cookie
        return true;
    }else{
        //console.log("incorrecto");
        $('.info').text("Identificador incorrecto");
        $('.info').attr("class","info scale-up-center");
        $('.inp-usuario').attr("style","border-color:red");
        
        return false;
    }
}
function comprobarCoordenadas(){
    //estas son las coordenadas del la localización, cargadas de la bd o json
    var latEstatica = 38.960723;
    var lonEstatica = -3.883766;
    
    function geo_success() {
        console.log(this.status);
        //alert(this);   
    }
    
    function geo_error() {
        alert("Sorry, no position available.");
    }
    
    var geo_options = {
        enableHighAccuracy: true, 
        maximumAge        : 30000, 
        timeout           : 27000
    };
    
    var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
    console.log(wpid);

    if ("geolocation" in navigator) {
        console.log("la geolocalización está disponible");
    } else {
        console.log("la geolocalización NO está disponible");
    }

    if (navigator.geolocation){ 
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            coordenadas = position;
        });
    }else{
        alert('Este navegador es algo antiguo, actualiza para usar el API de localización');                 
    }

    function comprobarRango(position){
        
        console.log(position);
        var latNavegador = position.coords.latitude;
        var lonNavegador = position.coords.longitude;
        console.log(latNavegador + " " + lonNavegador);
        var distancia = calcularDistancia(latNavegador, lonNavegador, latEstatica, lonEstatica);
        //alert(distancia  + " metros");
        
        if (distancia < 45) {
            alert("No puedes fichar: está fuera de rango. Distancia del centro: " + distancia + " metros");
            return false;
        }else{
            alert(distancia  + " metros");
            return true;
        }
        //console.log(distanciaEntrePuntos);
    }

    function calcularDistancia(lat1, lon1, lat2, lon2) {
        
        rad = function (x) {
            return x * Math.PI / 180;
        }
    
        var R = 6378.137;//Radio de la tierra en km
        var dLat = rad(lat2 - lat1);
        var dLong = rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        var d = d*1000;
        return d.toFixed(0);//sin decimales
    }

    return comprobarRango(coordenadas);
}
function crearCookie(nombre,identificador,tiempo_exp){
    var fecha = new Date();
    var f_expiracion = (tiempo_exp !== undefined)? tiempo_exp : "Fri, 31 Dec 9999 23:59:59 GMT";
    fecha.setTime(fecha.getTime() + (1000 * 60 * 60 * f_expiracion)); //dura 8 horas
    
    var expires = "expires="+ fecha.toUTCString();
    document.cookie = nombre + "=" + identificador + ";" + expires + ";path=/";
    return expires;
}
function recogerCookie(identificador) {
    var name = identificador + "=";
    var cadena = document.cookie.split(';');
    for(var i = 0; i < cadena.length; i++) {
        var cokie = cadena[i];
        while (cokie.charAt(0) == ' ') {
            cokie = cokie.substring(1);
        }
        if (cokie.indexOf(name) == 0) {
            return cokie.substring(name.length, cokie.length);
        }
    }
    return "";
}
function comprobarCookie(identificador){
    var user = recogerCookie(identificador);
    if (user != "") {
        return true;
    }else{
        return false;
    }
}

//ejemplo
function comprobarHorario(){ 
    var fecha = new Date();
    var n = fecha.getDate();
    
    if (1 == 1) {
        return true;
    }else{
        return false;
    }
}
//ejemplo
function comprobarCoordenadas_(){
    if (1 == 1) {
        return true;
    }else{
        return false;
    }
}

window.onload = function() {

    if (navigator.geolocation){ 
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            coordenadas = position;
        });
    }else{
        alert('Este navegador es algo antiguo, actualiza para usar el API de localización');                 
    }
}



