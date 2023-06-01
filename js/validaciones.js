


export function validarUrl(input){
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
export function validarCampoRequerido(input){
    
    if (input.value.trim() != '') {
       
        input.className = "form-control is-valid"
        return true;
    }
    else{
        
        input.className = "form-control is-invalid"
        return false;
    }
}

export function validarCodigo(input){
    
    if (input.value.trim() != '' && input.value.trim().length >= 3) {
       
        input.className = "form-control is-valid"
        return true;

    }
    else{
        
        input.className = "form-control is-invalid"
        return false;
    }
}

export function validarNumeros(input){
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

export function validarGeneral(){
    
    // Previene que recargue la pagina
   
    let textAlerta = document.querySelector("#textAlerta");
    if (validarCampoRequerido(producto) && validarCampoRequerido(producto) && validarUrl(url) && validarCampoRequerido(descripcion)) {
       
       textAlerta.className = 'alert alert-danger mt-2 d-none';
       return true;
    } else{
        textAlerta.className = 'alert alert-danger mt-2';
        return false;
    }
}

// obtenemos del html las etiquetas




// Añedimos el evento a las etiquetas con su funcion



