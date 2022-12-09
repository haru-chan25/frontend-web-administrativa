var idEmpresaSelect = "";

var zonas = [
    {
        nombre:"Tegucigalpa",
        zona: "z1"
    },
    {
        nombre:"San Pedro Sula",
        zona: "z2"
    },
    {
        nombre:"La Ceiba",
        zona: "z3"
    }
]

const obtenerCategorias = async () => {
    const respuesta = await fetch(`http://localhost:3001/api/cliente/obtenerCategorias`, {
        method: "get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
    });
    const categorias = await respuesta.json();

    if(categorias.length > 0){
        verAfiliados(categorias);
    }


};

obtenerCategorias();



function verAfiliados(categorias){
    console.log(categorias)

    let contCategorias = document.getElementById('Categorias');
    contCategorias.innerHTML= ""
    categorias.forEach(categoria => {
        let superior = `<section class="mt-4">   <section class="mt-4"> <!-- Restaurantes -->
        <div class="d-flex justify-content-center titulo-ubicacion mb-3"><span>${categoria.nombre}</span></div>
        <div class="divisores"><span></span></div>`;

        let empresas ="";
        zonas.forEach(zona => {
            empresas += `<section onclick="mostrarEmpresas('${categoria.nombre}','${zona.zona}','${categoria.nombre}${zona.zona}')" class=" d-flex justify-content-between" style="width: 100%;"><!--Zona inicio-->
            <div></div>
            <div>
                <div class="texto-solicitudes m-2 d-flex align-items-md-center"><span style="margin-left: 3rem;">${zona.nombre}</span></div>
            </div>
            <div class="d-flex flex-column justify-content-end align-items-center flex-md-row justify-content-sm-end">
                <div onclick= "agregarEmpresa()" class="cont-iconos" style="margin-right: 0.3rem;"><i class="fa-solid fa-plus"></i></div>
                
                <div onclick= "editarEmpresa()" class="cont-iconos me-1"><i class="fa-solid fa-pen-to-square"></i></div>
                <div onclick= "eliminarEmpresa()" class="cont-iconos"><i class="fa-sharp fa-solid fa-trash"></i></div>
            </div> 
        </section>
        <!-- Contenedor de las empresas -->
        <div class="container" style="width: auto;">
            <div id="${categoria.nombre}${zona.zona}" class="row " style="width: 100%;"> <!--aca se deben cargar las empresas-->
            
            </div>
        </div> <!-- Contenedor de las empresas fin -->  
        <div class="divisores"><span></span></div>  `;
    
            
        });


        let inferior = `</section> 
        <div class="divisorlargo pt-3"><span></span></div>`;


        let total = superior+empresas+inferior;
        contCategorias.innerHTML += total
    });
}

function eliminarEmpresa(){
    console.log('eliminar ', idEmpresaSelect)
}



function editarEmpresa(){
    console.log('editar ', idEmpresaSelect)
}


function agregarEmpresa(){
    console.log('agregar nueva empresa')
}

const mostrarEmpresas = async (nombreCategoria, zona,idDiv) => {
    const respuesta = await fetch(`http://localhost:3001/api/admin/obtenerEmpresas`, {
        method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify({
                        nombreCategoria: nombreCategoria,
                        zona: zona,
                }),
    });
    const empresasCategoriaZona = await respuesta.json();

    console.log(empresasCategoriaZona);
    console.log(idDiv)

    if(empresasCategoriaZona.length >0){
        let contenedorEmpresas = '';

        empresasCategoriaZona.forEach(empresa => {
            contenedorEmpresas +=  `<div onclick="empresaSelect('${empresa._id}')" class="d-flex flex-column align-items-center col-5 col-md-2 mt-2" >
            <div class="fig-producto"><img style="object-fit: contain;
            width:100%;
            height:100%;" src="${empresa.urlImagen}" alt=""></div>
            <div class="nombre-producto mt-1">${empresa.nombre}</div>
        </div>`
        });

    document.getElementById(idDiv).innerHTML ='';
    document.getElementById(idDiv).innerHTML =contenedorEmpresas;
    }

};

function empresaSelect(idEmpresa){
    idEmpresaSelect = idEmpresa;
    console.log(idEmpresaSelect)
}

