var datosEmpresa = JSON.parse(localStorage.getItem("nuevaEmpresa"));
var idEmpresa = "";

function prueba() {
  console.log(datosEmpresa);
}

prueba();

const crearEmpresa = async (nombre, informacion, urlImagen, direccion) => {
    const respuesta = await fetch(
    `http://localhost:3001/api/admin/crearEmpresa/${datosEmpresa.idCategoria}`,
    {
        method: "post",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            urlImagen:urlImagen,
            nombre:nombre,
            zona : datosEmpresa.zona,
            idCategoria : datosEmpresa.idCategoria,
            nombreCategoria : datosEmpresa.categoria,
            informacion:informacion,
            direccion: direccion,
        }),
    }
    );
    const empresaCreada = await respuesta.json();

    console.log(empresaCreada); 

    document.getElementById('nombreEmpresa').innerHTML = empresaCreada.nombre;
    document.getElementById('imagen').innerHTML = `<img id="imagenEmpresa" style="object-fit: contain;
    width:100%;
    height:100%;" src="${empresaCreada.urlImagen}" alt="">`
    idEmpresa = empresaCreada._id;
    
};


function guardarEmpresa(){
    console.log('sdsdf');

    let nombre = document.getElementById('nombre').value;
    let informacion = document.getElementById('informacion').value;
    let urlImagen = document.getElementById('urlImagen').value;
    let direccion = document.getElementById('direccion').value;
    

    document.getElementById('agregarEmpresa').style.display = "none";
    crearEmpresa(nombre, informacion, urlImagen, direccion);
}


function nuevaSubCat(){


  
    if(idEmpresa != ""){
        let sub = document.getElementById('subcategoria').value;
        agregarSubCategoria(sub);
    }
}

const agregarSubCategoria = async (nombreSubCategoria) => {
    const respuesta = await fetch(`http://localhost:3001/api/admin/nuevaSubCategoria/${idEmpresa}`,
    {
        method: "post",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre:nombreSubCategoria,
        }),
    }
    );
    const subcategoria = await respuesta.json();

    console.log(subcategoria);
    verSubCategorias();
};



const verSubCategorias = async () => {
    const respuesta = await fetch(`http://localhost:3001/api/admin/obtenerSubCategorias/${idEmpresa}`,
    {
        method: "get",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        }
    }
    );
    const subcategorias = await respuesta.json();

    console.log(subcategorias);
    
    //renderizar subcategorias

    
    let opcionesSubCategorias = "";
    if(subcategorias.length >0){
        
        subcategorias.forEach(subcategoria => {
            opcionesSubCategorias += `<option value="${subcategoria._id}">${subcategoria.nombre}</option>`
        });

        document.getElementById('SelectSubcategorias').innerHTML = opcionesSubCategorias;
    }
};


const agregarProducto = async() => {
    let nombreProducto = document.getElementById('nombreProducto').value;
    let precio = document.getElementById('precio').value;
    let descripcion = document.getElementById('descripcion').value;
    let SelectSubcategorias = document.getElementById('SelectSubcategorias').value;
    let urlImagenId = document.getElementById('urlImagenId').value;


    const respuesta = await fetch(`http://localhost:3001/api/admin/crearProducto/${SelectSubcategorias}`,
    {
        method: "post",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            urlImagen:urlImagenId,
            descripcion:descripcion,
            nombre: nombreProducto,
            precio: precio
        }),
    }
    );
    const producto = await respuesta.json();

    console.log(producto);
    

    document.getElementById('imagenProducto').innerHTML = `<img id="imagenProducto" style="object-fit: contain;
    width:75%;
    height:100%;" src="${producto.urlImagen}" alt="">`;

    verProductos();
    
}


const verProductos = async () => {
    const respuesta = await fetch(`http://localhost:3001/api/admin/crearProducto/obtenerProductos/subcategoria/${idEmpresa}`,
    {
        method: "get",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        }
    }
    );
    const productosSub = await respuesta.json();

    console.log(productosSub);
    
    var totalProductos = [];

    if(productosSub.length >0){
        productosSub.forEach(productos => {
            
            if(productos.productos.length >0){

                productos.productos.forEach(producto => {
                    totalProductos.push(producto)
                });
            }
        });
    }

    renderizarProductos(totalProductos);

};

function renderizarProductos(productos){
    console.log(productos)

    let productosDiv = '';
    
    
    productos.forEach(producto => {
        productosDiv += `<div  class="d-flex flex-column align-items-center col-5 col-md-2 mt-2" >
        <div  class="d-flex justify-content-center fig-producto">
        <img  style="object-fit: contain;
    width:65%;
    height:100%;" src="${producto.urlImagen}" alt="">
        </div>
        <div class="nombre-producto mt-1">${producto.nombre}</div>
    </div>    `
    });
        
   
    document.getElementById('contenedorProductos').innerHTML = productosDiv;

}

