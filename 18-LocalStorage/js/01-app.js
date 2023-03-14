localStorage.setItem('nombre', 'Yubal')

const producto ={
    nombre : 'Monitor',
    cantidad : 39
}

const productoString= JSON.stringify(producto)
localStorage.setItem('producto', productoString)

const meses = ['Enero', 'Febrero', 'Marzo']
localStorage.setItem('meses', JSON.stringify(meses))