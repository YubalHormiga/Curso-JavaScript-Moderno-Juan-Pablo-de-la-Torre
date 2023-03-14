class Cliente {
    constructor( nombre, apellido){
        this.nombre = nombre,
        this.apellido = apellido
    }

    mostrarInformacion(){
        return `mi nonbre es ${this.nombre} ${this.apellido}`
    }
}

const yubal = new Cliente('Yubal', 'Hormiga')

console.log(yubal)

console.log(yubal.mostrarInformacion())

