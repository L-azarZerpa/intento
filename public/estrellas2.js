const caja2 = document.querySelector("#caja2");
const u2 = document.querySelector("#e2")
const p2 = document.querySelector(".pc2")




caja2.addEventListener("click", cambiarColor2);

function cambiarColor2(){
        
      
      if (u.classList.contains('filtro')) {
        
        u.classList.remove('filtro');
        u.classList.add('u');

        u2.classList.remove('u');
        u2.classList.add('filtro');
      }
}


/**if (p2.classList.contains('filtro')) {


        p.classList.remove('pc');
        p.classList.add('filtro');
        

        p2.classList.remove('filtro');
        p2.classList.add('pc2');
        
      } else {

        p.classList.remove('filtro');
        p.classList.add('pc');
       

        
        p2.classList.remove('pc2');
        p2.classList.add('filtro');
       
      } */