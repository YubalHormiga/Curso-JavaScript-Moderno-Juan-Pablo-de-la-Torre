document.addEventListener('DOMContentLoaded', function () {

    const email = {
        email: ' ',
        asunto: ' ',
        mensaje: ' '
    }
    console.log(email)
    //*Seleccionar los elementos del interfaz
    const inputEmail = document.querySelector('#email')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner')

    //*AddEventListener
    addEventListener()
    function addEventListener() {
        inputEmail.addEventListener('input', validar)
        inputMensaje.addEventListener('input', validar)
        inputAsunto.addEventListener('input', validar)

        formulario.addEventListener('submit', enviarEmail)
        btnReset.addEventListener('click', e => {
            e.preventDefault()
            //*Reiniciar el Objeto
            resetearFormulario()
        })
    }

    function enviarEmail(e) {
        e.preventDefault()

        spinner.classList.add('flex')
        spinner.classList.remove('hidden')

        setTimeout(() => {
            spinner.classList.remove('flex')
            spinner.classList.add('hidden')

            resetearFormulario()

            //*Crear alerta
            const alertaExito = document.createElement('P')
            alertaExito.classList.add('bg-green-500', 'tex-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase')
            alertaExito.textContent = 'Mensaje enviado correctamente'
            formulario.appendChild(alertaExito)
            setTimeout(() => {
                alertaExito.remove()
            }, 3000);

        }, 3000);
        
    }

    function validar(e) {
        // console.log(e.target.parentElement)
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)
            email[e.target.name] = ''
            comprobarEmail()
            return
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement)
            email[e.target.name] = ''
            comprobarEmail()
            return
        }



        limpiarAlerta(e.target.parentElement)

        email[e.target.name] = e.target.value.trim().toLowerCase()

        comprobarEmail()
    }

    function mostrarAlerta(mensaje, referencia) {
        //*Comprueba si hay alerta
        const alerta = referencia.querySelector('.bg-red-600')
        if (alerta) {
            alerta.remove()
        }
        //*Generamos una alerta 
        const error = document.createElement('P')
        error.textContent = mensaje
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600')
        if (alerta) {
            alerta.remove()
        }
        // console.log('limpiar')
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email)
        return resultado
    }

    function comprobarEmail() {

        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;


    }

    function resetearFormulario (){
        email.email = ''
        email.asunto = ''
        email.mensaje = ''
        formulario.reset()
        comprobarEmail()
    }
})

