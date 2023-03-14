//* Maps 
const cliente = new Map()

cliente.set('nombre', 'Yubal')
cliente.set('edad', 45)

console.log(cliente)
console.log(cliente.size)
console.log(cliente.has('edad'))
console.log(cliente.get('nombre'))

cliente.delete('edad')
cliente.forEach(persona =>{
    console.log(persona)
})
cliente.clear()
console.log(cliente)
//! a diferencia de los set el map tiene llave valor 