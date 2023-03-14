const criptomonedasSelect = document.querySelector('#criptomonedas')
const monedaSelect = document.querySelector('#moneda')
const formulario = document.querySelector('#formulario')
const resultado = document.querySelector('#resultado')

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

//Creamos Promise
const obtenerCriptomonedas = criptomonedas => new Promise(resolve => {
    resolve(criptomonedas);
});



window.addEventListener('DOMContentLoaded', () => {
    consultarCriptomonedas()
    formulario.addEventListener('submit', submitFormulario)
    criptomonedasSelect.addEventListener('change', leerValor)
    monedaSelect.addEventListener('change', leerValor)
})

function consultarCriptomonedas() {

    // Ir  AtoPLISTS Y Despues market capp 
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then(respuesta => respuesta.json()) // Consulta exitosa...
        .then(resultado => obtenerCriptomonedas(resultado.Data)) // 
        .then(criptomonedas => selectCriptomonedas(criptomonedas))
}

function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach(cripto => {
        const { FullName, Name } = cripto.CoinInfo

        const option = document.createElement('OPTION')
        option.value = Name
        option.textContent = FullName

        criptomonedasSelect.appendChild(option)

    });
}
function leerValor(e) {
    e.preventDefault()
    objBusqueda[e.target.name] = e.target.value //En HTML obligatorio añadir name en select

}

function submitFormulario(e) {
    e.preventDefault()
    //validar
    const { moneda, criptomoneda } = objBusqueda
    if (moneda === '' || criptomoneda === '') {
        mostrarAlerta('Todos los campos son obligatorios')
        return
    }

    //Consultar API con resultados

    consultarAPI()
}


function mostrarAlerta(mensaje) {

    const error = document.querySelector('.error')

    if (!error) {
        //Creamos alerta
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('error')

        divMensaje.textContent = mensaje

        formulario.appendChild(divMensaje)
        //Eliminar alerta después de 3 sg
        setTimeout(() => {
            divMensaje.remove()
        }, 3000)

    }
}
function consultarAPI() {
    const { moneda, criptomoneda } = objBusqueda;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    mostrarSpiner()

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(cotizacion => {
            mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda])
        })
}

function mostrarCotizacionHTML(cotizacion) {

    limpiarHTML(resultado)

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion

    const precio = document.createElement('P')
    precio.classList.add('precio')
    precio.innerHTML = `
    El precio es: <span>${PRICE}</span>
    `
    const precioAlto = document.createElement('P')
    precioAlto.innerHTML = `
    El precio más alto del día es: <span>${HIGHDAY}</span>
    `
    const precioBajo = document.createElement('P')
    precioBajo.innerHTML = `
    El precio más bajo del día es: <span>${LOWDAY}</span>
    `
    const variacion = document.createElement('P')
    variacion.innerHTML = `
    El variación últimas 24 horas: <span>${CHANGEPCT24HOUR} %</span>
    `
    const ultimaActualizacion = document.createElement('P')
    ultimaActualizacion.innerHTML = `
    Última actualización: <span>${LASTUPDATE}</span>
    `
    resultado.append(precio, precioAlto, precioBajo, variacion, ultimaActualizacion)
}

function limpiarHTML(selector) {
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild)
    }
}

function mostrarSpiner() {
    limpiarHTML(resultado)
    const spinner = document.createElement('div')
    spinner.classList.add('spinner')
    spinner.innerHTML = `
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
    `
    resultado.appendChild(spinner)
}