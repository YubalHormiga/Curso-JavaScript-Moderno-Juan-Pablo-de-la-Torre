const aplicarDescuento = new Promise((resolve, reject) => {

    const descuento = true

    if (descuento) {
        resolve('Descuento aplicado')
    } else {
        reject('No se pudo aplicar descuento')
    }
})

aplicarDescuento
    .then(resultado => descuento(resultado))

    .catch(reject =>  console.log(reject))

function descuento(mensaje){
    console.log(mensaje)
}

//! Hay tres valores posibles
//fulfilled - El promise se cumplió
//rejected - El promise no se cumplió
//pendind - No se ha cumplido y tampoco rechazado