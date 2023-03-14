const producto = {
    idProducto : 10
}

const weakmap = new WeakMap()

weakmap.set(producto, 'Monitor') //* siempre lleva llave valor

console.log(weakmap.has(producto))
console.log(weakmap.get(producto))
console.log(weakmap.delete(producto))
console.log(weakmap)