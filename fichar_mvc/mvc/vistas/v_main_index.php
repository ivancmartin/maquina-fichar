<main>
    <div class="container">
        <div class="card m-auto" id="compCredenciales">
            <div class="card-header">
                <h2>Iniciar sesión</h2> 
            </div>
            <div class="card-body">
                <form method="post" action="" name="credenciales" onsubmit="return comprobarUsuario()">
                    <div class="form-row">
                        <div class="form-group col-12">
                            <label for="identificador">Identificador del usuario</label>
                        </div>
                        <div class="form-group col-12 col-lg-6 position-relative">
                            <input type="text" class="form-control inp-usuario" placeholder="Introduzca el identificador de su usuario" id="identificador" name="identificador" required>
                            <div class="info d-none"></div>                                
                        </div>
                        <div class="form-group col-12 col-lg-6 text-left">
                            <button type="submit" name="introducir" class="btn btn-orangered">Introducir</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>
