//*WeakSet solo se le puede pasar objetos

const weakset = new WeakSet()
const cliente = {
    nombre: 'Yubal',
    edad: 47
}

weakset.add(cliente)
weakset.delete(cliente)
console.log(weakset)

//!La diferencia entre un set y un weakset es que weakset solo puede almacenar objetos noo tiene extencion(size) y no es iterable(forEach)