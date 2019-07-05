<?php
class DB {
	private $host = "localhost";
	private $bbdd = "fichar_db";
	private $usuario = "root";
	private $clave = "";
	private $conexion; //Variable que recoge el descriptor del conexion
	public $filas = array(); 
	
	//Creamos el constructor de la clase con solo el nombre de la base de datos a la que nos vamos a conectar
	function __construct(){}
	
	function conectar(){
		try {
			$db = new PDO("mysql:host=". $this -> host .";dbname=". $this -> bbdd, $this -> usuario, $this -> clave);
			$db -> setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
			$db -> exec("set names utf8mb4");
			$this -> conexion = $db;
		} catch(PDOException $e) {
			cabecera("Error grave", MENU_PRINCIPAL);
			print "  <p>Error: No puede conectarse con la base de datos.</p>\n\n";
			print "  <p>Error: " . $e -> getMessage() . "</p>\n";
			pie();
			exit();
		}
	}

	function cerrar(){
		$this -> conexion = NULL;
	}
	
	//Ejecuta una consulta simple
	function consultaSimple($consulta){ 
		$this -> conectar();
		
		if(! $this -> conexion -> query($consulta)){
			echo "Error al realizar la consulta";
		}  
		
		$this -> cerrar();
	}
	
	//Ejecuta una cosulta que devuelve datos
	function consultaDatos($consulta){ 
		$this -> conectar();

		$this -> filas = array(); //Limpiamos el array anterior
		
		$datos = $this -> conexion -> query($consulta);
		
		if(!$datos){
			echo "Error al realizar la consulta"; //Sacamos el resultado por filas
		}else{ 
			while($fila = $datos -> fetch(PDO::FETCH_ASSOC)){
				$this -> filas[] = $fila; //Insertamos las filas una a una en el array de filas
			}
		}
		$this -> cerrar();
	}
}
?>
