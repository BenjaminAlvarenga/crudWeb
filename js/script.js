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
                    <button onclick="AbrirModalEditar('${persona.id}','${persona.nombre}','${persona.apellidos}','${persona.correo}')">Editar</button>
                    <button onclick="EliminarRegistro(${persona.id})">Eliminar</button>
                </td>
            </tr>
        `
    });
}


const modal = document.getElementById("mdAgregar");

const btnadd = document.getElementById("btnAdd");

const btnclose = document.getElementById("btnCloseModal");

btnadd.addEventListener("click", ()=>{
    modal.showModal(); //Se abre el modal al hacer clic
})

btnclose.addEventListener("click", ()=> {
    modal.close(); //Se cierra el modal
})

//Agregar un nuevo integrante desde el formulario
document.getElementById("frmAdd").addEventListener("submit", async e => {
    e.preventDefault(); //Evita que los datos se envien por defectos

    //Capturar los valores del formulario
    const nombre = document.getElementById("txtName").value.trim();
    const apellidos = document.getElementById("txtLastName").value.trim();
    const correo = document.getElementById("txtEmail").value.trim();

    if(!nombre || !apellidos || !correo){
        alert("Complete los campos");
        return; //Evita que se siga ejecutando el codigo
    }

    //Llamar a la Api para los datos
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({nombre,apellidos,correo})
    });

    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario
        document.getElementById("frmAdd").reset();

        await ObtenerRegistros();

        //Cerrar el modal
        modal.close();

    }else{
        alert("Hubo un error al guardar");
    }
});

//Funcion para borrar registros

async function EliminarRegistro(id){
    const confirmacion = confirm("¿Desea eliminar este registro?");

    //Validamos si el usuario eligió aceptar
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        }); //Llamada al endpoint

        //Recargar la tabla para actualizar la vista
        ObtenerRegistros();
    }
}

/*Funcion para editar registros*/
const modalEdit = document.getElementById("mdActualizar");
const btnCloseModalUpdate = document.getElementById("btnCloseModalUpdate");

btnCloseModalUpdate.addEventListener("click", ()=>{
    modalEdit.close();
})

function AbrirModalEditar(id,nombre, apellidos, correo){
    //Agregamos los valores a los inputs antes de abrir el modal
    document. getElementById("txtUpdateID").value = id;
    document.getElementById("txtUpdateName").value = nombre;
    document.getElementById("txtUpdateLastName").value = apellidos;
    document.getElementById("txtUpdateEmail").value = correo;

    //Modal se abre despues de agregar los valores a los input
    modalEdit.showModal();
}

document.getElementById("frmUpdate").addEventListener("submit", async e => {
    e.preventDefault(); //Evita que el formulario se envie

    //Capturamos valores nuevos
    const id = document.getElementById("txtUpdateID").value;
    const nombre = document.getElementById("txtUpdateName").value.trim();
    const apellidos = document.getElementById("txtUpdateLastName").value.trim();
    const correo = document.getElementById("txtUpdateEmail").value.trim();

    if(!id || !nombre || !apellidos || !correo){
        alert("Complete todos los campos");
        return;
    }

    //Llamada a la API
    const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({correo,nombre,apellidos})
        });

        if(respuesta.ok){
            alert("Resgitro actualizado con exito");
            modalEdit.close();
            ObtenerRegistros();
        }else{
            alert("Hubo un error al actualizar. ");
        }
});