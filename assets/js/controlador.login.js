
if(localStorage.getItem('idAdmin') != null){
    sesionIniciada();
}

function ingresar(){
    console.log('ingresar')
    let usuario = document.getElementById('usuario').value;
    let contrasenia = document.getElementById('contrasenia').value;

    console.log(usuario,contrasenia)
    verificarAdmin(usuario, contrasenia);
}


const verificarAdmin = async (usuario, contrasenia) => {
    const respuesta = await fetch(`http://localhost:3001/api/admin`, {
        method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify({
                        usuario: usuario,
                        password: contrasenia,
                }),
    });
    const login = await respuesta.json();

    console.log(login)
    if(login){
        localStorage.setItem('idAdmin', JSON.stringify(login.id))
        sesionIniciada();
    }
};


function sesionIniciada(){
    document.getElementById('contenedorLogin').style.display = 'none';
    document.getElementById('subtitulo2').innerHTML = 'Sesion iniciada correctamente'

    let enlaces = document.getElementsByClassName("enlaces");

    for (let index = 0; index < enlaces.length; index++) {
        enlaces[index].style.pointerEvents = 'auto';
        
    }
}



// const verificarEntrega = async (idOrden) => {
//     const respuesta = await fetch(`http://localhost:3001/api/cliente/ordenEntregada/${idOrden}`, {
//         method: "get",
//     });
//     const estadoOrden = await respuesta.json();


// };



// const verificarUsuario = async (correo, contra) => {
//     const respuesta = await fetch("http://127.0.0.1:3001/api/cliente/iniciarSesion", {
//         method: "post",
//         headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                 },
//                     body: JSON.stringify({
//                         correo: correo,
//                         contrasenia: contra,
//                 }),
//     });
//     const login = await respuesta.json();

//     //console.log(login)
// };