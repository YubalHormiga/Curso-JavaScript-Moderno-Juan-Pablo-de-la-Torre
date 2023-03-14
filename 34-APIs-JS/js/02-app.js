document.addEventListener('DOMContentLoaded', ()=>{

    const observer = new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting){

            console.log('Ahora está visible')
        }
    })

    observer.observe(document.querySelector('.premium'))
})