//!OBJECT LITEREL
const cliente ={
    nombre: 'Juan',
    edad: 15
}

//!OBJECT CONSTRUCTROR

function Cliente(nombre, edad){
    this.nombre = nombre,
    this.edad = edad
}

const nuevoCliente = new Cliente('Juan', 15)
console.log(nuevoCliente)
