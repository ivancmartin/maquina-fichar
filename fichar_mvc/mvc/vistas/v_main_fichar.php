<main>
    <div class="container">
        <div class="card m-auto" id="compFichar">
            <div class="card-header">
                <h2>Fichar</h2> 
            </div>
            <div class="card-body">
                <form method="post" name="fichar" action="" onsubmit="return comprobarCredenciales(1)">
                    <div class="form-row">
                        <div class="form-group col-12">
                            <span for="ident_user">
                                <?php 
                                    echo "Bienvenido: ".$_COOKIE['identificador'];
                                ?>
                            </span>
                        </div>
                        <div class="form-group col-12">
                            <button type="submit" name="fichar" class="btn btn-orangered">Fichar</button>
                            <div class="info d-none"></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>
