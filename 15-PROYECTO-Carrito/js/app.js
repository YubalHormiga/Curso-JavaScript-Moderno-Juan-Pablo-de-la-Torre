//*Variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = []

//*EventListerner
cargarEventListeners()
function cargarEventListeners() {
    //*Para agregar Curso
    listaCursos.addEventListener('click', agregarCurso)
    //*Para eliminar curso del carrito
    carrito.addEventListener('click', eliminarCuros)
    //*Muestra los crusos de local Storage
    document.addEventListener('DOMContentLoaded',()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || []
        carritoHTML()
    })

    //**Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []
        limpiarHTML()
    })
}


//*Funciones
function agregarCurso(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {

        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }

}
//*Elimina curso
function eliminarCuros(e) {
    if (e.target.classList.contains('borrar-curso')) {

        const cursoId = e.target.getAttribute('data-id')

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

        carritoHTML()
    }
}

//*Lee el contenido al elemento que le dimos click y extrae la información

function leerDatosCurso(curso) {
    // console.log(curso)
    //*Creamos un objeto con los datos de curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //*Revisa si el elemento ya existe

    if (articulosCarrito.some(curso => curso.id === infoCurso.id)) {
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })

        articulosCarrito = [...cursos];


    } else {

        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // console.log(articulosCarrito)

    //*Muestra los articulos en el carrito
    carritoHTML()
}

//*Muestra el carrito de compra en el html

function carritoHTML() {

    //*Limpiamos e Html
    limpiarHTML()
    //*Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso
        const row = document.createElement('tr')
        row.innerHTML =
            `
            <td><img src="${imagen}" width=100></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
            
        `
        //*Agrega el Html del carrito al tbody
        contenedorCarrito.appendChild(row)

    })

    //!Agregamos a localStorage
    sincronizarStorage()
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

///*Elimina los cursos del tbody

function limpiarHTML() {
    // contenedorCarrito.innerHTML = ''
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}