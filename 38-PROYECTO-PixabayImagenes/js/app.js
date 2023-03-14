const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')
const paginacionDiv = document.querySelector('#paginacion')

const registroPorPagina = 40
let totalPaginas
let iterador
let paginaActual = 1

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario)
}

function validarFormulario(e) {
    e.preventDefault()
    const terminoBusqueda = document.querySelector('#termino').value

    if (terminoBusqueda === '') {
        mostrarAlerta('Agrega un término de Busqueda')
        return
    }

    buscarImagenes()
}

function mostrarAlerta(mensaje) {

    const existeAlerta = document.querySelector('.alerta')

    if (!existeAlerta) {
        const alerta = document.createElement('P')
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rouded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'alerta')
        alerta.innerHTML = `
        <strong class='font-bold'>Error¡¡</strong>
        <span class='block sm:inline'>${mensaje}<span>
        `
        formulario.appendChild(alerta)

        setTimeout(() => {
            alerta.remove()
        }, 2000)
    }
}

function buscarImagenes() {
    const terminoBusqueda = document.querySelector('#termino').value

    const key = '34362204-9ecfbff387fe777e628480578'
    const url = `https://pixabay.com/api/?key=${key}&q=${terminoBusqueda}&per_page=${registroPorPagina}&page=${paginaActual}`
    // console.log(url)

    fetch(url)
        .then(respuesta => {
            return respuesta.json()
        })

        .then(resultado => {
            totalPaginas = calcularPaginas(resultado.totalHits)
            mostrarImagenes(resultado.hits)
            // console.log(totalPaginas)
        })
}




function mostrarImagenes(imagenes) {
    // console.log(imagenes)

    limpiarHTML(resultado)

    //Itirar sobre el arreglo de imagenes y construir el HTML
    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen
        resultado.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3">
                <div class="bg-white ">
                    <img class="w-full" src=${previewURL} alt={tags} />
                    <div class="p-4">
                        <p class="card-text">${likes} Me Gusta</p>
                        <p class="card-text">${views} Vistas </p>
        
                        <a href=${largeImageURL} 
                        rel="noopener noreferrer" 
                        target="_blank" class="bg-blue-800 w-full p-1 block mt-5 rounded text-center font-bold uppercase hover:bg-blue-500 text-white">Ver Imagen</a>
                    </div>
                </div>
            </div>
        `
    });

    //Limpiamos el paginador previo
    limpiarHTML(paginacionDiv)
    //Generamos el nuevo HTML
    imprimirPaginador()
}

//Generador que va a registrar la cantidad de elementos de acuerdo a las paginas
function calcularPaginas(total) {
    return parseInt(Math.ceil(total / registroPorPagina))
}

function* crearPaginacion(total) {
    console.log(total);
    for (let i = 1; i <= total; i++) {
        yield i;
    }
}

function imprimirPaginador() {
    iterador = crearPaginacion(totalPaginas)

    while (true) {

        const { value, done } = iterador.next()
        if (done) return

        //caso contrario, generaun botón por cada elemento en el generador

        const boton = document.createElement('A')
        boton.href = '#'
        boton.dataset.pagina = value
        boton.textContent = value
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'uppercase', 'rounded')

        boton.onclick= ()=>{
           paginaActual = value
           buscarImagenes()
        }

        paginacionDiv.appendChild(boton)
    }


}


function limpiarHTML(selector) {
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild)
    }
}

