export const nombreCliente = 'Juan'
export const valor = 45
export function mostrarInformación(nombre, year) {
    return ` ${nombre} tiene ${year} años`
}

export class Cliente {
    constructor(nombre, valor) {
        this.nombre = nombre;
        this.valor = valor
    }
    mostrarInformación() {
        return ` ${this.nombre} tiene ${this.valor} años`
    }
}
export default function nuevaFuncion() { //*Solo se puede tener un export default por pagina y no hace falta ponerle nombre ya que lo importamos con el nombre que queramos
    console.log('Nueva funcion')
}