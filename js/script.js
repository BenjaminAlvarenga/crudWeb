//Direccion del Endpoint
const API_URL = "https://retoolapi.dev/rb0mjc/integrantes"

//Funcion que llama a la API y hace una solicitud GET
async function ObtenerRegistros(){
    //Hacemos GET y obtendremos su respuesta (response)
    const respuesta = await fetch(API_URL);

    //Obtenemos los datos en formato JSON a partir de la respuesta
    const data = await respuesta.json();

    MostrarRegistros(data);
}

document.addEventListener("DOMContentLoaded", () => {
    ObtenerRegistros();
})

//Funcion para generar las filas de la tabla
//Datos representa al JSON
function MostrarRegistros(datos){
    //Se llama al elemento tbody en la tabla
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar HTML usamos innerHTML
    tabla.innerHTML  = ""; //Vacimamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellidos}</td>
                <td>${persona.correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `
    });
}


const modal = document.getElementById("mdAgregar");

const btnadd = document.getElementById("btnAdd");

const btnclose = document.getElementById("btnCloseModal");s