//script.js
/******************************************************************
 ***                    DECLARATION VARIABLES                   ***
 ******************************************************************/

 const showKanap = document.getElementById('items');


/******************************************************************
 ***                          FONCTIONS                         ***
 ******************************************************************/

 // fonction principale asynchrone pour récupérer les produits et les afficher
 async function main (){
    const products = await getProduct();
    for(product of products) {
        showProduct(product);
    }
 }

 // fonction pour récupérer les produits à l'aide de promesses 
 function getProduct(){
    return fetch('http://localhost:3000/api/products/')
    .then( function(reponse) { return reponse.json()})
    .then( function(products) { return products})
    .catch(function (error) {alert ('error product')} )
 }

 // création des balises HTML pour l'affichage
 function showProduct (product) {
    
    showKanap.innerHTML += `<a href="./product.html?id=${product._id}" >
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}" >
            <h3 class=productName> ${product.name} </h3>
            <p class=productDescription> ${product.description} </p>
        </article>
    </a>`;
 }
     
 
/******************************************************************
 ***                       CODE PRINCIPAL                       ***
 ******************************************************************/
 
 //fonction principale de l'index qui appelle toutes les autres
 main();

