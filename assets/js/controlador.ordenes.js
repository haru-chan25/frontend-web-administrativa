
var idOrden1 = "";
var idMotorista = "";


const verOrdenes = async (zona) => {
  
        const respuesta = await fetch(`http://localhost:3001/api/admin/ordenesDisponibles/${zona}`, {
            method: "post",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        estado:0
                }),
        });
    
        
        const ordenes = await respuesta.json();    
        console.log(ordenes);

        let ordenesDis = ""
        ordenes.forEach(orden => {
            ordenesDis += `
            <div class="d-flex align-items-center flex-column flex-md-row justify-content-md-between">
                <div class="texto-detalles" >Nombre empresa: ${orden.nombreEmpresa},  Direccion de empresa de Orden: ${orden.direccionEmpresa},  destino de la orden: ${orden.destino}</div>
                <div class="contenedor-btn-detalles">                         
                    <!-- Button trigger modal -->
                <button class="btn  shadow-sm  btn-nueva-subcategoria"  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"  onclick="verMotoristas('${orden.idOrden}')">
                    Asignar
                  </button>
                </div>                        
            </div>
            <div class="divisor mt-1" ><span></span></div>`
        });

        document.getElementById(zona).innerHTML = ordenesDis;
    }


    const verMotoristas = async (idOrden) => {
  
        const respuesta = await fetch(`http://localhost:3001/api/admin/listarMotoristas`, {
            method: "get",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    }
        });
    
        
        const motoristas = await respuesta.json();    
        console.log(motoristas);
        idOrden1 = idOrden;

        let optMotoristas = "";
        motoristas.forEach(motorista => {
            optMotoristas += `<option value="${motorista._id}" value="">${motorista.nombre}</option>`
        });

        document.getElementById('sltMotoristas').innerHTML = optMotoristas;
    }

    // if(localStorage.getItem('idAdmin') != null){
    //     verMotoristas();
    // };
    

// function finalizar(){
//     idMotorista =  document.getElementById('sltMotoristas').value;
// }
    

const finalizar = async () => {
    idMotorista =  document.getElementById('sltMotoristas').value;
  
    const respuesta = await fetch(`http://localhost:3001/api/admin/asignarOrdenMotorista`, {
        method: "put",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idMotorista:idMotorista,
                    estado:1,
                    idOrden: idOrden1
            }),
    });

    
    const mensaje = await respuesta.json();    
    console.log(mensaje);

    document.getElementById('mensaje').innerHTML = mensaje.mensaje;



    
}
