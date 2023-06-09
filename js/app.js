
let listaProductos = [];
cargaInicial();

function cargaInicial(){
    // Revisar si tengo datos en localstorage
    listaProductos = JSON.parse(localStorage.getItem('arregloProductos' )) || [];
    //Dibujar cada una de las columnas con sus respectivas card
    if(listaProductos.length >0){
        listaProductos.forEach(itemProducto => {
            crearColumna(itemProducto);
        });
    }
    
}

function crearColumna(producto){
   let grilla = document.querySelector('#grilla');
   grilla.innerHTML += `<div class=" col-sm-12 col-md-4 col-lg-3 mb-3">
   <div class="card" >
       <img src="${producto.url}" class="card-img-top" alt="${producto.nombre}">
       <div class="card-body">
         <h5 class="card-title">${producto.nombre}</h5>
         <p class="card-text">${producto.detalle}</p>
        
       </div>
     </div>
</div>`
}