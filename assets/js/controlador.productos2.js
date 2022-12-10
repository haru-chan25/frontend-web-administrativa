var idEmpresa = JSON.parse(localStorage.getItem("idEmpresa"));
var idProductoEditar =  "";





const obtenerEmpresa = async () => {
    const respuesta = await fetch(
    `http://localhost:3001/api/admin/obtenerEmpresaUnica/${idEmpresa}`,
    {
        method: "get",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        }
    }
    );
    const empresa = await respuesta.json();
    empresaCreada = empresa[0];

    document.getElementById('nombreEmpresa').innerHTML = empresaCreada.nombre;
    document.getElementById('imagen').innerHTML = `<img id="imagenEmpresa" style="object-fit: contain;
    width:80%;
    height:100%;" src="${empresaCreada.urlImagen}" alt="">`
    idEmpresa = empresaCreada._id;


    verProductos()
    
    
};

function prueba(){
    console.log(idEmpresa)
    if(idEmpresa != null){
        obtenerEmpresa()
    }
}
prueba()




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

    console.log(totalProductos)

    let productosDiv = '';
    
    
    totalProductos.forEach(producto => {
        productosDiv += `<div onclick="verProducto('${producto._id}')"  class="d-flex flex-column align-items-center col-5 col-md-2 mt-2" >
        <div  class="d-flex justify-content-center fig-producto">
        <img  style="object-fit: contain;
    width:65%;
    height:100%;" src="${producto.urlImagen}" alt="">
        </div>
        <div class="nombre-producto mt-1">${producto.nombre}</div>
    </div>    `
    });
        
   
    document.getElementById('contenedorProductos').innerHTML = productosDiv;
    verSubCategorias()
    

};



function renderizarProductos(productos){
    console.log(productos)


}


const  verProducto = async(id) => { //editarProducto
    console.log('id de producto a editar: ',id)

    const respuesta = await fetch(`http://localhost:3001/api/admin/obtenerProductoUnico/${id}`,
    {
        method: "get",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        }
    }
    );
    const producto = await respuesta.json();

    console.log('producto',producto)
    idProductoEditar = producto._id;

    document.getElementById('imagenProducto').innerHTML = `<img id="imagenProducto" style="object-fit: contain;
    width:78%;
    height:100%;" src="${producto.urlImagen}" alt="">`;

    document.getElementById('nombreProducto').value = producto.nombre;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('descripcion').value = producto.descripcion;
    document.getElementById('urlImagenId').value = producto.urlImagen;



    

    

}



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
    width:5%;
    height:100%;" src="${producto.urlImagen}" alt="">`;

    verProductos();
    
}