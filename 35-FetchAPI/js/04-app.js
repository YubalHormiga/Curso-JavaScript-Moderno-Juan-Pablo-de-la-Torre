
const cargarAPIBtn = document.querySelector('#cargarAPI')
cargarAPIBtn.addEventListener('click', obtenerDatos)

function obtenerDatos() {
    const url = 'https://picsum.photos/list'
    fetch(url)
        .then(respuesta => {
            console.log(respuesta)
            return respuesta.json()
        })
        .then(resultado => {
            mostrarHTML(resultado)
        })
}
function mostrarHTML(fotos) {
    const contenido = document.querySelector('.contenido')
    let html = ''

    fotos.forEach(foto => {
        console.log(foto)
        const {author, post_url } = foto
        html += `
        <p>Nombre Autor ${author}<p>
        <a href ='${post_url}' target='blank'>Ver Imagen<a>
        `
    });

    contenido.innerHTML = html
}