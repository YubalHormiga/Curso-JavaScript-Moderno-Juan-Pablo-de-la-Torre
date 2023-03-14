//*Set puede almacenar cualquier tipo de valor. solo tiene valor

const carrito = new Set()

carrito.add('camisa')
carrito.add('pantalón')
carrito.add('bufanda')
console.log(carrito)
console.log(carrito.size)
console.log(carrito.has('camisa'))
console.log(carrito.delete('camisa'))
carrito.forEach(producto => {console.log(producto)})

carrito.clear() //*Elimina todos
console.log(carrito)

//*Eliminar los duplicados de manera mas sencilla

const numero = [10,20,30,50,10,20,]

const noDuplicados = new Set(numero)
console.log(noDuplicados)