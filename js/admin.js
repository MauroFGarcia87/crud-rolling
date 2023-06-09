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
let productoExistente = false; // si es falso tengo que agregar un nuevo producto, 
//si es verdedare es para modificar
let btnNuevoProducto = document.querySelector('#btnNuevoProducto')

cargaInicial();

// Añedimos el evento a las etiquetas con su funcion


codigo.addEventListener('blur', () => {validarCodigo(codigo)});
cantidad.addEventListener('blur', () => {validarNumeros(cantidad)});
producto.addEventListener('blur', () => {validarCampoRequerido(producto)});
url.addEventListener('blur',() => {validarUrl(url)});
descripcion.addEventListener('blur', () => {validarCampoRequerido(descripcion)});
formulario.addEventListener('submit', guardarProducto);
btnNuevoProducto.addEventListener('click', limpiarFormulario);

// funciones

function guardarProducto(e){
    e.preventDefault();
    // Verificar que pase todas las validaciones
    if(validarGeneral()){

        // tengo que ver en que estado esta mi variable productoExistente
        if(productoExistente === false){
            //Tengo que crear el producto
            console.log('Aca creo el producto');
            agregarProducto();
        }else {
            //tengo que modificar el producto
            actualizarProducto();
            console.log('aca es para midifcar')
            limpiarFormulario();
        }
            
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
    //mostar el producto a la tabla 
    crearFilas(productoNuevo);

    //Limpiar el formulario
    limpiarFormulario();

    //mostrar un mensaje al usuario
    Swal.fire(
        'Producto agregado',
        'Su producto fue correctamente agregado!',
        'success'
      );
    


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
    // resetear la variable productoExistente
    productoExistente = false;
}

function cargaInicial(){
    // traer los productos de localestore sino de dejar el array vacio
    listaProductos =JSON.parse(localStorage.getItem('arregloProductos')) || [];

    // Si hay producto los muestro en la tabla
    listaProductos.forEach((itemProducto)=> {
        // codigo que se ejecuta por cada elemento del arreglo
        crearFilas(itemProducto);
    });
    
}

function crearFilas(itemProducto){
    let tabla = document.querySelector('#tablaProducto');
    console.log(itemProducto);
    tabla.innerHTML += `<tr>
    <th scope="row">${itemProducto.codigo}</th>
    <td>${itemProducto.nombre}</td>
    <td>${itemProducto.detalle}</td>
    <td>${itemProducto.cantidad}</td>
    <td>${itemProducto.url}</td>
    <td>
      <button class="btn btn-warning" onclick="prepararEdicion('${itemProducto.codigo}')">Editar</button>
      <button class="btn btn-danger" onclick="eliminarProducto('${itemProducto.codigo}')">Borrar</button>
    </td>
  </tr>`
}

window.prepararEdicion = (codigoProdcuto)=>{
    console.log(codigoProdcuto);

    // Buscar el objeto
    let porductoBuscado = listaProductos.find((itemProducto) => {return itemProducto.codigo == codigoProdcuto})
    console.log(porductoBuscado);

    //Mostar el objeto

    codigo.value = porductoBuscado.codigo;
    producto.value = porductoBuscado.nombre;
    descripcion.value = porductoBuscado.detalle;
    cantidad.value = porductoBuscado.cantidad;
    url.value = porductoBuscado.url;
    productoExistente = true;
}

window.eliminarProducto = (codigo)=>{

    Swal.fire({
        title: 'Estas seguro de eliminar este producto?',
        text: "Una vez eliminado no se puede recuperar el producto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar producto!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            //Filtramos todos los elemento menos el que queremos eliminar
            let productoFiltrado = listaProductos.filter((itemProducto)=>{return itemProducto.codigo != codigo;});
            // asamos los elemento filtrados
            listaProductos = productoFiltrado;
            //Pasamos la lista a localstorage
            localStorage.setItem('arregloProductos', JSON.stringify(listaProductos));
            //Volver a dibujar la tabla
            borrarTabla();
            listaProductos.forEach((itemProducto)=>{crearFilas(itemProducto)});
          Swal.fire(
            'Borrado!',
            'Su producto fue borrado!.',
            'success'
          )
        }
      })



    
   
}

function actualizarProducto(){
    // buscar la posicion del elemento a modificar en le arreglo
    let posicionProducto = listaProductos.findIndex((itemProducto)=>{return itemProducto.codigo == codigo.value})
    console.log(posicionProducto);
    // modificar los datos de esa posicion del arreglo
    listaProductos[posicionProducto].codigo = codigo.value;
    listaProductos[posicionProducto].nombre = producto.value;
    listaProductos[posicionProducto].detalle = descripcion.value;
    listaProductos[posicionProducto].cantidad = cantidad.value;
    listaProductos[posicionProducto].url = url.value;
    console.log(listaProductos[posicionProducto]);
    //modificar el localstorage
    localStorage.setItem('arregloProductos', JSON.stringify(listaProductos));
    // volver a dibujar la tabla
    borrarTabla();
    listaProductos.forEach((itemProducto)=>{crearFilas(itemProducto)});
    // Mostrar mensaje al usuario
    Swal.fire(
        'Producto modificado',
        'Su producto fue correctamente modificado!',
        'success'
      );
}

function borrarTabla(){
    let tabla = document.querySelector('#tablaProducto');
    tabla.innerHTML = '';
}
