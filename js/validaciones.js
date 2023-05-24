


function validarUrl(input){
    // Crear una exprecion regular
    let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;  
    if (input.value.trim() != '' && patron.test(input.value.trim())) {
        input.className = "form-control is-valid";
        return true;
    }else{
        input.className = "form-control is-invalid";
        return false;
    }
}
function validarCampoRequerido(input){
    
    if (input.value.trim() != '') {
       
        input.className = "form-control is-valid"
        return true;
    }
    else{
        
        input.className = "form-control is-invalid"
        return false;
    }
}

function validarCodigo(input){
    
    if (input.value.trim() != '' && input.value.trim().length >= 3) {
       
        input.className = "form-control is-valid"
        return true;

    }
    else{
        
        input.className = "form-control is-invalid"
        return false;
    }
}

function validarNumeros(input){
    //Creamo exprecion regular
    let patron = /^[0-9]{1,3}$/;

    if(patron.test(input.value)){
        input.className = "form-control is-valid";
        return true;
    }else{
        input.className = "form-control is-invalid";
        return false;
    }

}

function validarGeneral(event){
    
    // Previene que recargue la pagina
    event.preventDefault();
   // && validarCampoRequerido(producto) && validarUrl(url) && validarCampoRequerido(descripcion)
    if (validarCampoRequerido(producto) && validarCampoRequerido(producto) && validarUrl(url) && validarCampoRequerido(descripcion)) {
       
       textAlerta.className = 'alert alert-danger mt-2 d-none';
    } else{
        textAlerta.className = 'alert alert-danger mt-2';
        
    }
}

// obtenemos del html las etiquetas

let codigo = document.querySelector('#codigo');
let producto = document.querySelector('#producto');
let cantidad = document.querySelector('#cantidad');
let url = document.querySelector('#url');
let descripcion = document.querySelector('#descripcion');
let formulario = document.querySelector('#formularioProducto')
let textAlerta = document.querySelector("#textAlerta");

// Añedimos el evento a las etiquetas con su funcion

cantidad.addEventListener('blur', () => {validarNumeros(cantidad)});
codigo.addEventListener('blur', () => {validarCodigo(codigo)});
producto.addEventListener('blur', () => {validarCampoRequerido(producto)});
url.addEventListener('blur',() => {validarUrl(url)});
descripcion.addEventListener('blur', () => {validarCampoRequerido(descripcion)});
formulario.addEventListener('submit', validarGeneral);
