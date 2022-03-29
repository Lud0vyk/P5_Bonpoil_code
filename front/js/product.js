//product.js
/******************************************************************
 ***                    DECLARATION VARIABLES                   ***
 ******************************************************************/

 const kanapImage = document.getElementsByClassName('item__img');
 const kanapTitre = document.getElementById('title');
 const kanapPrice = document.getElementById('price');
 const kanapDescription = document.getElementById('description');

 //récupération de l'id du produit
 let queryString_url_id = window.location.search;
 console.log(queryString_url_id);
 let urlSearchParams = new URLSearchParams(queryString_url_id);
 console.log(urlSearchParams);

 let id = urlSearchParams.get("id");
 console.log(id);

/******************************************************************
 ***                          FONCTIONS                         ***
 ******************************************************************/
 /*fonction 1 get
 retourne un tableau de tout les éléments */  /* ok */

 /*fonction 2 get /id
 revoie l'élément correspondant à l'id du produit */
 
 /* fonction 3 post /order
 requête json contenant un objet de contact et un tableu produit et order id */
 

 
 // affichage des l'éléments dans product.html
 function showProductById (product) {
     
    kanapImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}" >`;
    kanapTitre.innerText = `(${product.name})`;
    kanapPrice.innerText = `(${product.price})`;
    kanapDescription.innerText = `(${product.description})`;
 }

 //fonction asynchrone pour récupérer les produits
 async function mainProduct (){
    const products = await getProduct();

    let productById = products.find( (element)=> element._id === id);
    console.log(productById);

    showProductById(productById);
 }

  //fonction pour récupérer les produits
  function getProduct(){
    return fetch('http://localhost:3000/api/products/')
    .then( function(reponse) { return reponse.json()})
    .then( function(products) { return products})
    .catch( function (error) {alert ('error product')} )
 }


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
  
 //fonction principale de la page product
 mainProduct();



 
 