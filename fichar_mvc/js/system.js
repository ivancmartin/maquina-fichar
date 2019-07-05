"use strict";
var System = (function(){
    var instantiated;
    function init(){

        function System(){
            //comprobamos que se instancie como new
            if(!(this instanceof System)) throw new InvalidAccesConstructorException();
            
        }

        System.prototype = {}; 
		System.prototype.constructor = System;

		//Devolvemos el objeto para que sea una instancia única.
        var inSystem = new System();
        Object.freeze(inSystem);
        return inSystem;
    }return{
        getInstance: function(){
            if(!instantiated){
                instantiated = init();
            }
            return instantiated;
        }
    }
})();