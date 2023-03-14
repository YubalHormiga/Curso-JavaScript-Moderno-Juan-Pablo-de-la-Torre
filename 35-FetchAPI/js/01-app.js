const cargarTxt = document.querySelector('#cargarTxt')
cargarTxt.addEventListener('click', obtenerDatos)

function obtenerDatos() {
    const url = 'data/datos.txt'
    fetch(url)
        .then(respuesta => {
            console.log(respuesta)
            return respuesta.text()
        })
        .then(datos=>{
            console.log(datos)
        })
        .catch(error =>{
            console.log(error)
        })

}
