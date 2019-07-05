<?php
require_once "m_conexiondb.php"
class OperacionesUsuario{
    //la función para obtener un usuario por el id
    public static function getUsuario($id_tarjeta){
        //buscar
        $db=DB::conectar();
        $select=$db->prepare('SELECT * FROM usuarios WHERE Id_tarjeta=:id');
        $select->bindValue('id',$id_tarjeta);
        $select->execute();
        //asignarlo al objeto usuario
        $usuarioDb=$select->fetch();
        $usuario= new Usuario($usuarioDb['id'],$usuarioDb['id_tarjeta'],$usuarioDb['id_localizacion'],$usuarioDb['id_horarios']);
        return $usuario;
    }
}
?>