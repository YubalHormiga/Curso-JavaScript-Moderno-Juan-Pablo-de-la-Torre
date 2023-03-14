class Cliente {
    constructor(nombre, saldo) {
        this.nombre = nombre;
        this.saldo = saldo
    }
    mostrarInformacion() {
        return ` ${this.nombre} tiene un saldo de ${this.saldo}`
    }
}


class Empresa extends Cliente {
    constructor(nombre, saldo, telefono, categoria) {
        super(nombre, saldo)
        this.telefono = telefono
        this.categoria = categoria

    }

}
const yubal = new Cliente('Yubal', 300)
console.log(yubal)
console.log(yubal.mostrarInformacion())
const empresa = new Empresa('Formiga', 10100, 934586215, 'premira')
console.log(empresa)
console.log(empresa.mostrarInformacion())
