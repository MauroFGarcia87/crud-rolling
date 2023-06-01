import {validarCodigo, validarNumeros, validarCampoRequerido, validarUrl, validarGeneral} from './validaciones.js'

import {Producto} from './productoClass.js';
// obtenemos del html las etiquetas

let codigo = document.querySelector('#codigo');
let producto = document.querySelector('#producto');
let cantidad = document.querySelector('#cantidad');
let url = document.querySelector('#url');
let descripcion = document.querySelector('#descripcion');
let formulario = document.querySelector('#formularioProducto')
let textAlerta = document.querySelector("#textAlerta");
let listaProductos = [];

cargaInicial();

// Añedimos el evento a las etiquetas con su funcion


codigo.addEventListener('blur', () => {validarCodigo(codigo)});
cantidad.addEventListener('blur', () => {validarNumeros(cantidad)});
producto.addEventListener('blur', () => {validarCampoRequerido(producto)});
url.addEventListener('blur',() => {validarUrl(url)});
descripcion.addEventListener('blur', () => {validarCampoRequerido(descripcion)});
formulario.addEventListener('submit', guardarProducto);

// funciones

function guardarProducto(e){
    e.preventDefault();
    // Verificar que pase todas las validaciones
    if(validarGeneral()){
        //Tengo que crear el producto
        console.log('Aca creo el producto');
        agregarProducto();
    }else{
        // Aca no se hace nada
        console.log('Aca no se hace nada');
    }
}

function agregarProducto(){
    // Crear objeto producto
    let productoNuevo = new Producto(codigo.value, producto.value, descripcion.value, cantidad.value, url.value);
    console.log(productoNuevo);

    // Cargamos el prodructo dentro del arreglo
    listaProductos.push(productoNuevo);
    console.log(listaProductos);
    // almacenamos el arreglo en localstorage
    localStorage.setItem('arregloProductos', JSON.stringify(listaProductos));

    //Limpiar el formulario
    limpiarFormulario();
    //mostrar un mensaje al usuario

    //mostar el producto a la tabla


}

function limpiarFormulario(){
    // reseteamos el formulario
    formulario.reset();
    //Ponemos la clase original a los input
    codigo.className = 'form-control';
    producto.className = 'form-control';
    descripcion.className = 'form-control';
    cantidad.className = 'form-control';
    url.className = 'form-control';
}

function cargaInicial(){
    // traer los productos de localestore sino de dejar el array vacio
    listaProductos =JSON.parse(localStorage.getItem('arregloProductos')) || [];
}