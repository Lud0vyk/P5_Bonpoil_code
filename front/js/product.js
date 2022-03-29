//product.js
/******************************************************************
 ***                    DECLARATION VARIABLES                   ***
 ******************************************************************/


 const kanapImage = document.getElementsByClassName('.item__img');
 const kanapTitre = document.getElementById('title');
 const kanapPrice = document.getElementById('price');
 const kanapDescription = document.getElementById('description');
 const kanapColors = document.getElementById('colors');

 //récupération de l'id du produit
 let queryString_url_id = window.location.search;
 let urlSearchParams = new URLSearchParams(queryString_url_id);
 let id = urlSearchParams.get("id");
 console.log(id);
 //variable de récupération du produit
 let productChoice;

// affichage des l'éléments dans product.html
function showProductById (product) {
     
    kanapImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}" >`;
    kanapTitre.innerText = `(${product.name})`;
    kanapPrice.innerText = `(${product.price})`;
    kanapDescription.innerText = `(${product.description})`;
    for(let color of product.colors) {
        kanapColors.innerHTML +=`<option value="${color}">${color}</option>`;
    }
}

 //fonction asynchrone pour récupérer les produits
 async function mainProduct (){

    const products = await getProduct();
    let productById = products.find( (element)=> element._id === id);
    showProductById(productById);
    console.log(productById)
    return productChoice = productById;
 }

  //fonction pour récupérer les produits
  function getProduct(){
    return fetch('http://localhost:3000/api/products/')
    .then( function(reponse) { return reponse.json()})
    .then( function(products) { return products})
    .catch( function (error) {alert ('error product')} )
 }


 //sélection des données du panier
 const quantityKanap = document.querySelector("#quantity");
 const colorKanap = document.querySelector("#colors");

 //données à envoyer
 const addToCart = document.querySelector("#addToCart");


 //envoi du panier
 addToCart.addEventListener("click", (event) => {
     event.preventDefault();

 //récupération de la couleur
 const selectedColor = colorKanap.value;
 //récupération de la quantité
 const selectedQuantity = quantityKanap.value;

  //récupartion du panier
  let cart = {
    productId : productChoice._id,
    productColor : selectedColor,
    productQuantity : selectedQuantity,
    productPrice : productChoice.price,
    totalPrice : selectedQuantity * productChoice.price
    //voir si besoin d'autre chose
    }

    console.log(cart);
 });



/******************************************************************
 ***                          FONCTIONS                         ***
 ******************************************************************/
 /*fonction 1 get
 retourne un tableau de tout les éléments */  /* ok */

 /*fonction 2 get /id
 revoie l'élément correspondant à l'id du produit */
 
 /* fonction 3 post /order
 requête json contenant un objet de contact et un tableu produit et order id */
 

 //fonction asynchrone pour le choix des couleurs
 /*async function productChoice (){
    const products = await getProduct();
    for(product of products) {
        showProduct(product);
    }
 }*/

/******************************************************************
 ***                       CODE PRINCIPAL                       ***
 ******************************************************************/


 //fonction principale de la page product v3
 mainProduct();
