function mostrarElemento(value, idx){
    
    if(value == 1){
        document.getElementById(idx).style.display = "block";
    }
    else{
        if(value == 33){
            alert('Las contraseñas no coniciden');
        }
        else{
            alert('Por favor, insertar los campos mencionados')
        }
    }
    
}
function ocultarElemento(value, idx){
    
    if(value == 1){
        document.getElementById(idx).style.display = "none";
    }
}


function validarNombres(){
    var nombre = document.getElementById('nombreRegistro').value;
    var apellido = document.getElementById('apellidoRegistro').value;

    /* console.log(nombre);
    console.log(apellido); */
    if(nombre == '' &&  apellido == '' || nombre == null && apellido == null)
    {
        return 0;
    }
    else{
        if(nombre == '' || nombre == null){
            return 0;
        }
        if(apellido == '' || apellido == null){
            return 0;
        }
        else{
            return 1  
        }
        
    }
}
function validarDNI(){
    var dni = document.getElementById('dniRegistro').value;
    var archivo = document.getElementById('fotoRegistro').value;
    /* console.log(dni);
    console.log(archivo) */;
    if(dni == '' &&  archivo == '' || dni == null && archivo == null)
    {
        return 0;
    }
    else{
        if(dni == '' || dni == null){
            return 0;
        }
        if(archivo == '' || archivo == null){
            return 0;
        }
        else{
            return 1  
        }
        
    }
}

function igualesPassword(){
    var pw1 = document.getElementById('passwordRegistro').value;
    var pw2 = document.getElementById('passwordRegistro2').value;

    if(pw1 == pw2)
    {
        return 1;
    }
    else return 0;
}

function validarCorreoPassword(){

    var value = igualesPassword()
    var correo = document.getElementById('correoRegistro').value;
    var password = document.getElementById('passwordRegistro').value;
    
    if(value == 1){
        if(correo == '' &&  password == '' || correo == null && password == null)
        {
            return 33;
        }
        else{
            if(correo == '' || correo == null){
                return 33;
            }
            if(password == '' || password == null){
                return 33;
            }
            else{
                return 1  
            }
        }
    }
    else{
        return 33;
    }
}

function mostrarTodos(){
    
    var nombre = document.getElementById('nombreRegistro').value;
    var apellido = document.getElementById('apellidoRegistro').value;
    var dni = document.getElementById('dniRegistro').value;
    var archivo = document.getElementById('fotoRegistro').value;
    var correo = document.getElementById('correoRegistro').value;
    var password = document.getElementById('passwordRegistro').value;
    var direccion = document.getElementById('direccionRegistro').value;
    var region = document.getElementById('selectDepartamento').value;
    var provincia = document.getElementById('selectProvincia').value;
    var distrito = document.getElementById('selectDistrito').value;
    var politica = document.getElementById('checkboxPoliticamente').checked;
    var terminos = document.getElementById('checkboxTerminos').checked;

    console.log(nombre);
    console.log(apellido);
    console.log(dni);
    console.log(archivo);
    console.log(password);
    console.log(correo);
    console.log(direccion);
    console.log(region);
    console.log(provincia);
    console.log(distrito);
    console.log(politica);
    console.log(terminos);
}

function validarDireccion(){
    var direccion = document.getElementById('direccionRegistro').value;
    var region = document.getElementById('selectDepartamento').value;
    var provincia = document.getElementById('selectProvincia').value;
    var distrito = document.getElementById('selectDistrito').value;
    var politica = document.getElementById('checkboxPoliticamente').checked;
    var terminos = document.getElementById('checkboxTerminos').checked;

    /*
        Códigos de error:
        1: Todo correcto
        77: politica fallada
        88: terminos no aceptados
        0: algún dato no está bien seleccionado
    */

    if(direccion != '' && region != '' && provincia != '' && distrito != ''){
        if(politica == true && terminos == true){
            return 1;
        }
        else{
            if (politica != true)
            {
                return 77;
            }
            if (terminos != true)
            {
                return 88;
            }
        }
    }
    else{
        return 0;
    }

}

function redirigir(adrex){
    window.location.href = adrex;
}



function cambiarOpciones(){
    var cat = localStorage.getItem('miGato');
}

function logout(){
    alert('Salió exitosamente');    
    deslogear();
    redirigir('index.html')
  }