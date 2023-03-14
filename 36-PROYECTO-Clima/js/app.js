const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e) {
    e.preventDefault()

    //!Validar 
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    if (ciudad === '' || pais === '') {
        //Hubo error
        mostrarEror('Ambos campos son obligatorios')
        return
    }

    //!Consultar la API
    consultarAPI(ciudad, pais)


}

function mostrarEror(mensaje) {
    console.log(mensaje)
    const alerta = document.querySelector('.alerta')

    if (!alerta) {
        //Creamos alerta
        const alerta = document.createElement('div')
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rouded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alerta')

        alerta.innerHTML = `
        <strong class='font-bold'>Error¡¡</strong>
        <span class='block'>${mensaje}<span>
        `
        container.appendChild(alerta)

        //Eliminar alerta después de 3 sg
        setTimeout(() => {
            alerta.remove()
        }, 3000)

    }

}

function consultarAPI(ciudad, pais) {

    const appID = 'ea7ae3ed7dcab946dccaa74091c40258'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`

    Spinner()  //Muesta el spinner de carga mientras se carga el 
    // console.log(url)
    fetch(url)
        .then(respuesta => {
            return respuesta.json()
        })
        .then(datos => {
            limpiarHTML()//Limpiamos HTML previo
            if (datos.cod === '404') {
                mostrarEror(datos.message)
                return
            }

            //Imprime la respuesta en HTML
            mostrarClima(datos)
        })



}

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos
    const centigrados = kelvinCentigrados(temp)
    const max = kelvinCentigrados(temp_max)
    const min = kelvinCentigrados(temp_min)

    const nombreCiudad = document.createElement('p')
    nombreCiudad.textContent = `Clima en ${name}`
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const actual = document.createElement('p')
    actual.innerHTML = `${centigrados} &#8451;`
    actual.classList.add('font-bold', 'text-6xl')

    const maxima = document.createElement('p')
    maxima.innerHTML = `Temperatura Máxima: ${max} &#8451;`
    maxima.classList.add('text-xl')

    const minima = document.createElement('p')
    minima.innerHTML = `Temperatura Mínima: ${min} &#8451;`
    minima.classList.add('text-xl')

    const resultadoDiv = document.createElement('div')
    resultado.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(maxima)
    resultadoDiv.appendChild(minima)

    resultado.appendChild(resultadoDiv)
}

function kelvinCentigrados(grados) {
    return parseInt(grados - 273.15)
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function Spinner() {
    limpiarHTML()
    const divSpinner = document.createElement('div')
    divSpinner.classList.add('sk-fading-circle')

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `
    resultado.appendChild(divSpinner)
}