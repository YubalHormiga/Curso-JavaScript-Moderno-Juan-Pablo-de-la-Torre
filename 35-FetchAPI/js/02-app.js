const cargarJSONBtn = document.querySelector('#cargarJSON')
cargarJSONBtn.addEventListener('click', obtenerDatos)


function obtenerDatos() {
    const url = 'data/empleado.json'
    console.log(url)
    fetch(url)
        .then(respuesta => {
            return respuesta.json()
        })
        .then(datos => {
            mostrarHTML(datos)
        })
        .catch(error => {
            console.log(error)
        })
}

function mostrarHTML({ empresa, id, nombre, trabajo }) {

    const contenido = document.querySelector('.contenido')
    contenido.innerHTML = ` //*innerHTML borra todo lo que haya y pinta los datos
        <p>Empleado: ${nombre}<p>
        <p>ID: ${id}<p>
        <p>Empresa: ${empresa}<p>
        <p>Trabajo: ${trabajo}<p>
    `
}