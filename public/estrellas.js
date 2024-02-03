const stars = document.querySelectorAll('.star');
const form = document.querySelector('#star-form');
const selectedStarsInput = document.querySelector('#selected-stars');



const btn = document.getElementById('todas');
btn.addEventListener('click', function() {
  location.reload()
});



stars.forEach(function(star, index){
 
  star.addEventListener('click', function() {
    for (let i=0; i<=index; i++){
        stars[i].classList.add('checked')
    }
    for (let i=index+1; i< stars.length; i++){
        stars[i].classList.remove('checked')
    }
    
    selectedStarsInput.value = index + 1;
    let p = selectedStarsInput.value
    let o = parseInt(p)
    const btn = document.getElementById('5')
 console.log(btn);

 btn.addEventListener('click',function() {
  const producto = document.querySelectorAll('.articulo')

  producto.forEach(producto =>{
    const estrellas = producto.querySelectorAll('.checked').length
    
    if (estrellas == o) {
    producto.style.display = 'block'

    }else{
      producto.style.display = 'none'
    }
  })

  
 } )
   
    
  })
});




 