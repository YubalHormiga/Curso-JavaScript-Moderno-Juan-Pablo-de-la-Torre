class Cliente {

    #nombre//*Para hacerlo privado

    constructor(nombre, saldo){
        this.#nombre = nombre
        this.saldo = saldo
    }

    mostrarInformacion(){
        return `${this.#nombre} tiene un saldo de ${this.saldo}`
    }
}

const yubal = new Cliente('Yubal', 9000)

console.log(yubal)
console.log(yubal.mostrarInformacion())
