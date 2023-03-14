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
    this.saldo -= retira
}
const pedro = new Cliente('Pedro',7000)

console.log(pedro.tipoDeCliente())
console.log(pedro.nombreClienteSaldo())
console.log(pedro)