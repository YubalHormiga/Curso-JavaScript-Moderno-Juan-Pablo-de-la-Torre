function Cliente(nombre, saldo){
    this.nombre = nombre,
    this.saldo = saldo
}

Cliente.prototype.tipoDeCliente = function(){
    let tipo;

    if (this.saldo > 10000) {
        tipo = 'gold'
    } else if(this.saldo > 5000){
        tipo = 'platinium'
    }else {
        tipo = 'normal'
    }

    return tipo
}

Cliente.prototype.nombreClienteSaldo = function(){
    return `nombre: ${this.nombre} saldo: ${this.saldo} tipo cliente: ${this.tipoDeCliente()}`
}

Cliente.prototype.retira = function(retira){
    this.saldo -= re
    
}

function Persona( nombre, saldo, telefono){
    Cliente.call(this, nombre, saldo)
    this.telefono = telefono
}

Persona.prototype = Object.create(Cliente.prototype)

Persona.prototype.constructor = Cliente

const yubal = new Persona('yubal', 5000, 932564582)

console.log(yubal)
console.log(yubal.nombreClienteSaldo())