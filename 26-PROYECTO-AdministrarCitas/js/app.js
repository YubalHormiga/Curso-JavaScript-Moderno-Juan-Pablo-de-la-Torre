//*VARIABLES
const mascotaInput = document.querySelector('#mascota')
const propietarioInput = document.querySelector('#propietario')
const telefonoInput = document.querySelector('#telefono')
const fechaInput = document.querySelector('#fecha')
const horaInput = document.querySelector('#hora')
const sintomasInput = document.querySelector('#sintomas')

const formulario = document.querySelector('#nueva-cita')

const contenedorCitas = document.querySelector('#citas')

let editando;

//*CLASES

class Citas {
    constructor() {
        this.citas = []
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita]
        console.log(this.citas)
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id)
    }

    editarCita(citaActualizada) {
        this.citas = this.citas.map(cita => cita.id == citaActualizada.id ? citaActualizada : cita)
    }
}

class UI {
    imprimirAlerta(mensaje, tipo) {
        //*Creamos el div
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12')
        //*Agregamos clase segú tipo de error
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger')
        } else {
            divMensaje.classList.add('alert-success')
        }

        //*Mensaje de error
        divMensaje.textContent = mensaje

        //*Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'))
        //*Quitar alerta
        setTimeout(() => {
            divMensaje.remove()
        }, 3000)
    }
    imprimirCitas({ citas }) {

        this.limpiarHTML()

        citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita
            const divCita = document.createElement('div')
            divCita.classList.add('cita', 'p-3')
            divCita.dataset.id = id

            const mascotaParrafo = document.createElement('h2')
            mascotaParrafo.classList.add('carda-title', 'font-weigth-bolder')
            mascotaParrafo.textContent = mascota

            const propietarioParrafo = document.createElement('p')
            propietarioParrafo.innerHTML = `<span 'font-weigth-bolder'>Propietario: </span> ${propietario} `

            const telefonoParrafo = document.createElement('p')
            telefonoParrafo.innerHTML = `<span 'font-weigth-bolder'>Telefono: </span> ${telefono} `

            const fechaParrafo = document.createElement('p')
            fechaParrafo.innerHTML = `<span 'font-weigth-bolder'>Fecha: </span> ${fecha} `

            const horaParrafo = document.createElement('p')
            horaParrafo.innerHTML = `<span 'font-weigth-bolder'>Hora: </span> ${hora} `

            const sintomasParrafo = document.createElement('p')
            sintomasParrafo.innerHTML = `<span 'font-weigth-bolder'>Síntomas: </span> ${sintomas} `

            //*Botón para eliminar cita
            const btnEliminar = document.createElement('button')
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2')
            btnEliminar.innerHTML = 'Eliminar'
            btnEliminar.onclick = () => eliminarCita(id)

            //* Botón editar cita
            const btnEditar = document.createElement('button')
            btnEditar.classList.add('btn', 'btn-info')
            btnEditar.innerHTML = 'Editar'
            btnEditar.onclick = () => cargarEdicion(cita)



            divCita.appendChild(mascotaParrafo)
            divCita.appendChild(propietarioParrafo)
            divCita.appendChild(telefonoParrafo)
            divCita.appendChild(fechaParrafo)
            divCita.appendChild(horaParrafo)
            divCita.appendChild(sintomasParrafo)
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar)

            contenedorCitas.appendChild(divCita)

        });
    }

    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

//*INSTANCIAS
const ui = new UI()
const administrarCitas = new Citas()

//*EVENT LISTENER


eventListerners()
function eventListerners() {
    mascotaInput.addEventListener('input', datosCita)
    propietarioInput.addEventListener('input', datosCita)
    telefonoInput.addEventListener('input', datosCita)
    fechaInput.addEventListener('input', datosCita)
    horaInput.addEventListener('input', datosCita)
    sintomasInput.addEventListener('input', datosCita)

    formulario.addEventListener('submit', nuevaCita)

}
//*OBJETO
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''

}

//!AGREGA DATOS
function datosCita(e) {

    citaObj[e.target.name] = e.target.value

}

//*VALIDA Y AGREGA UNA NUEVA CITA

function nuevaCita(e) {
    e.preventDefault()

    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj

    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campor son obligatorios', 'error')
        return
    }

    if (editando) {
        ui.imprimirAlerta('Editado correctamente')

        //*pasar el objeto de la cita
        administrarCitas.editarCita({ ...citaObj })

        //*Regresar el texto a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita'

        //*Quitar modo edición
        editando = false

    } else {
        //*Generamos un id
        const random = Math.random().toString(36).substring(2)
        const date = Date.now().toString(36)
        const id = random + date
        citaObj.id = id
        console.log(citaObj)

        //*Creando nueva Cita
        administrarCitas.agregarCita({ ...citaObj })
        //*Mensaje de agregado
        ui.imprimirAlerta('Se agrego correctamente')
    }


    //*Reinicimos el objeto
    reiniciarObjeto()

    //*Reinicimos formulario
    formulario.reset()

    //*Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas)

}

function reiniciarObjeto() {
    citaObj.mascota = '',
        citaObj.propietario = '',
        citaObj.telefono = '',
        citaObj.fecha = '',
        citaObj.hora = '',
        citaObj.sintomas = ''

}
function eliminarCita(id) {

    administrarCitas.eliminarCita(id)

    ui.imprimirAlerta('La cita se eliminó correctamente')

    ui.imprimirCitas(administrarCitas)

}

function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas
    sintomasInput.id = id


    //*Llenamos el objeto

    citaObj.mascota = mascota
    citaObj.propietario = propietario
    citaObj.telefono = telefono
    citaObj.fecha = fecha
    citaObj.hora = hora
    citaObj.sintomas = sintomas

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios'
    editando = true
}