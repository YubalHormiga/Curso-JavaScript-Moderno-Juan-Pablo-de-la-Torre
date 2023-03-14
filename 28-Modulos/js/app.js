import nuevaFuncion, { nombreCliente, valor, mostrarInformación, Cliente } from "./cliente.js"

// import { Empresa } from "./empresa.js"
console.log(nombreCliente)
console.log(valor)
console.log(mostrarInformación('Yubal', 33))

const cliente = new Cliente( nombreCliente, valor)
console.log(cliente)
console.log(cliente.mostrarInformación())

// const empresa = new Empresa('Formiga', 13, 'Informatica')
// console.log(empresa)
nuevaFuncion()