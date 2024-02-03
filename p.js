quiero que al hacer click en la clase todas me muestre todos los productos:
<input id="caja" class="modo" type="button" value="cambiar modo">
<form id="star-form" action="/rat" method="post">
  <div class="rating" id="5">
    <i class="bi bi-star-fill todas">todas</i>
    <i class="bi bi-star-fill star"></i>
    <i class="bi bi-star-fill star"></i>
    <i class="bi bi-star-fill star"></i>
    <i class="bi bi-star-fill star"></i>
    <i class="bi bi-star-fill star"></i>
  </div>

  <input type="hidden" id="selected-stars" name="selectedStars" value="0">
</form>
<br>
  <div class="pc" id="pc">
    <% for (var i=0; i<productosConImagenes.length; i++) { %>
    <div class="articulo">
      <h3><%= productosConImagenes[i].name %></h3>
      <a href="/producto/<%= productosConImagenes[i].id %>">
        <img src="<%= productosConImagenes[i].url %>" alt="<%= productosConImagenes[i].name %>"></td>
      </a>
      <div class="rating">
        <div class="rating">
          <% for (var j=0; j<Math.floor(productosConImagenes[i].rating) ; j++) { %>
            <div class="checked">&#9733;</div>
          <% } %>

          <% if (productosConImagenes[i].rating % 1 >= 0.1) { %>
            <div class="star-half" style="
              color: yellow;
              display: inline-block;
              font-size: 32px;
              clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
            ">&#9733;</div>
          <% } %>
          <% for (var j=Math.ceil(productosConImagenes[i].rating); j<5; j++) { %>
            <div class="star">&#9733;</div>
          <% } %>
        </div>

    </div>
      <h1><%= productosConImagenes[i].price %> $</h1>
      <h6><%= productosConImagenes[i].code %></h6>
      <h6><%= productosConImagenes[i].description %></h6>
      <h6><%= productosConImagenes[i].brand %></h6>
      <h6><%= productosConImagenes[i].size %></h6>
      <h6><%= productosConImagenes[i].nameCategoria %></h6>
      <button class="button-add" onclick="add('product-2', 300)">Agregar</button>
    </div>
  <% } %>
</div>
const stars = document.querySelectorAll('.star');
const form = document.querySelector('#star-form');
const selectedStarsInput = document.querySelector('#selected-stars');







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




 