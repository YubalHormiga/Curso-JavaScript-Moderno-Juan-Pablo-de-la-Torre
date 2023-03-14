function Cliente(nombre, saldo){
    this.nombre = nombre,
    this.saldo = saldo
}

const juan= new Cliente('Juan', 15)


function formatearCliente(cliente){
    const {nombre, saldo} = cliente
    return `el cliente ${nombre} tiene un saldo de ${saldo}`
}
console.log(formatearCliente(juan))

