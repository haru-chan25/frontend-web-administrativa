var idSolicitante = "";

const cargarSolicitantes = async () => {
    const respuesta = await fetch(`http://localhost:3001/api/admin/solicitudes`, {
        method: "get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
    });
    const solicitantes = await respuesta.json();

    console.log(solicitantes)

    document.getElementById('listaSolicitantes').innerHTML ='';

    let listaSol = "";
    solicitantes.forEach(sol => {
        listaSol += `<div class="divisores"><span></span></div>
        <div class="d-flex  justify-content-center ">
        <div class="detalles-solicitudes pb-4 pt-3">
            <div class="texto-solicitudes">${sol.nombre}</div>
                <button onclick="mostrarSolicitante('${sol._id}')" type="button" class="btn btn-detalles shadow-sm">Ver detalles</button>
        </div>                     
    </div>`
    });

    document.getElementById('listaSolicitantes').innerHTML = listaSol;

};


if(localStorage.getItem('idAdmin') != null){
    cargarSolicitantes();
};


const mostrarSolicitante = async (id) => {
    const respuesta = await fetch(`http://localhost:3001/api/admin/solicitud/${id}`, {
        method: "get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
    });
    const solicitante = await respuesta.json();
    soli =  solicitante[0];

    document.getElementById('nombre').value = soli.nombre;
    document.getElementById('fecha').value = `${soli.fechaNacimiento.dia}/${soli.fechaNacimiento.mes}/${soli.fechaNacimiento.anio}`
    document.getElementById('sexo').value = soli.sexo;
    document.getElementById('correo').value = soli.correo;
    document.getElementById('celular').value = soli.celular;
    document.getElementById('celAlt').value = soli.celularAlternativo;
    document.getElementById('direccion').value = soli.residencia;

    idSolicitante = id;
    console.log(solicitante[0])
}


const aceptar = async () => {
    if(idSolicitante != ""){
        const respuesta = await fetch(`http://localhost:3001/api/admin//solicitud/aprobar/${idSolicitante}`, {
            method: "put",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    }
        });
    
        
        const mensaje = await respuesta.json();
    
        console.log(mensaje);
    
        cargarSolicitantes();
        };    

    }


    const rechazar = async () => {
        if(idSolicitante != ""){
            const respuesta = await fetch(`http://localhost:3001/api/admin/solicitud/rechazar/${idSolicitante}`, {
                method: "delete",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        }
            });
        
            
            const mensaje = await respuesta.json();
        
            console.log(mensaje);
        
            cargarSolicitantes();
            };    
    
        }