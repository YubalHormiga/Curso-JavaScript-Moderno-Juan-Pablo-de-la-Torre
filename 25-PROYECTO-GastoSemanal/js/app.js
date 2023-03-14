//*VARIABLES
const formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')

//*EVENTOS
eventListerners()
function eventListerners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto)
    document.addEventListener('submit', agregarGasto)

}


//*CLASES
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto)
        this.restante = Number(presupuesto)
        this.gastos = []
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto]
        this.calcularRestante()
    }
    calcularRestante() {
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0)
        this.restante = this.presupuesto - gastado

    }
    eliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id)
        this.calcularRestante()
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        const { presupuesto, restante } = cantidad
        document.querySelector('#total').textContent = presupuesto
        document.querySelector('#restante').textContent = restante
    }

    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center', 'alert')

        if (tipo == 'error') {
            divMensaje.classList.add('alert-danger')
        } else {
            divMensaje.classList.add('alert-sucess')
        }

        divMensaje.textContent = mensaje

        document.querySelector('.primario').insertBefore(divMensaje, formulario)

        setTimeout(() => {
            divMensaje.remove()
        }, 2000)

    }

    agregarGastoListado(gastos) {

        this.limpiarHTML()
        gastos.forEach(gasto => {

            const { cantidad, nombre, id } = gasto

            const nuevoGasto = document.createElement('li')
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id

            nuevoGasto.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
        `
            const btnBorrar = document.createElement('button')
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-registro')
            btnBorrar.textContent = 'Eliminar'
            btnBorrar.onclick = () => {
                eliminarGasto(id)
            }
            nuevoGasto.appendChild(btnBorrar)

            gastoListado.appendChild(nuevoGasto)


        });
    }

    limpiarHTML() {
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild)
        }
    }
    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante

    }
    comprobarPresupuesto(presupuestoObj) {
        const { presupuesto, restante } = presupuestoObj


        const restanteDiv = document.querySelector('.restante')

        if ((presupuesto / 4) > restante) {
            restanteDiv.classList.remove('alert-success', 'alert-warning')
            restanteDiv.classList.add('alert-danger')
        } else if ((presupuesto / 2 > restante)) {
            restanteDiv.classList.remove('alert-success')
            restanteDiv.classList.add('alert-warning')
        } else {
            restanteDiv.classList.remove('alert-danger', 'alert-warning')
            restanteDiv.classList.add('alert-success')
        }

        if (restante <= 0) {
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error')
            formulario.querySelector('button[type=submit]').disabled = true
        }
    }
}

//*INSTANCIAR 
const ui = new UI()
let presupuesto; 'alert-warning'

//*FUNCIONES 

function preguntarPresupuesto() {

    const presupuestoUsuario = prompt('Cual es el presupuesto?')

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload()

    }

    presupuesto = new Presupuesto(presupuestoUsuario)
    ui.insertarPresupuesto(presupuesto)
}

function agregarGasto(e) {
    e.preventDefault()

    const nombre = document.querySelector('#gasto').value
    const cantidad = Number(document.querySelector('#cantidad').value)

    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error')
        return
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('La cantidad no es válida', 'error')
        return
    }

    const gasto = { nombre, cantidad, id: Date.now().toString(36).substring(2) }

    presupuesto.nuevoGasto(gasto)


    ui.imprimirAlerta('Gasto agregado correctamente')

    const { gastos, restante } = presupuesto
    ui.agregarGastoListado(gastos)
    ui.actualizarRestante(restante)
    ui.comprobarPresupuesto(presupuesto)

    formulario.reset()
}

function eliminarGasto(id) {
    presupuesto.eliminarGasto(id)
    const { gastos, restante } = presupuesto
    ui.agregarGastoListado(gastos)
    ui.actualizarRestante(restante)
    ui.comprobarPresupuesto(presupuesto)
}