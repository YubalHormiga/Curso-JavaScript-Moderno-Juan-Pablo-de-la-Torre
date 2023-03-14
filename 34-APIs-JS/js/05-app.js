document.addEventListener('visibilitychange', ()=>{
   if(document.visibilityState === 'visible'){
    console.log('Ejecutar función para ver video')
   }else{
    console.log('Pausar video')
   }
})
