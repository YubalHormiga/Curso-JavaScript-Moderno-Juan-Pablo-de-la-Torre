//* Symbol - Todos son diferentes.

const sym = Symbol('1')
const sym1 = Symbol('1')

if( sym === sym1 ){
    console.log('son iguales')
}else{
    console.log('son diferentes')
}