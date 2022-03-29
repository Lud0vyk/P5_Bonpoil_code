//script.js
/******************************************************************
 ***                    DECLARATION VARIABLES                   ***
 ******************************************************************/

 const showKanap = document.getElementById('items');


/******************************************************************
 ***                          FONCTIONS                         ***
 ******************************************************************/
 /*fonction 1 get
 retourne un tableau de tout les éléments */  /* ok */

 /*fonction 2 get /id
 revoie l'élément correspondant à l'id du produit */

 /* fonction 3 post /order
 requête json contenant un objet de contact et un tableu produit et order id */


 //fonction asynchrone pour récupérer les produits
 async function main (){
    const products = await getProduct();
    for(product of products) {
        showProduct(product);
    }
 }

 //fonction pour récupérer les produits
 function getProduct(){
    return fetch('http://localhost:3000/api/products/')
    .then( function(reponse) { return reponse.json()})
    .then( function(products) { return products})
    .catch(function (error) {alert ('error product')} )
 }

 //création des balises HTML pour l'affichage
 function showProduct (product) {
    
    showKanap.innerHTML += `<a href="./product.html?id=${product._id}" >
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}" >
            <h3 class=productName> ${product.name} </h3>
            <p class=productDescription> ${product.description} </p>
        </article>
    </a>`;
 }
 //console.log(product);
     
 
/******************************************************************
 ***                       CODE PRINCIPAL                       ***
 ******************************************************************/
 
 //fonction principale de l'index qui appelle toutes les autres
 main();

