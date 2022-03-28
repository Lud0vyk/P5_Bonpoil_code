/******************************************************************
 ***                    DECLARATION VARIABLES                   ***
 ******************************************************************/

const showKanap = document.getElementById('items');

//http://localhost:3000/api/products
/*
async function main (){
    const products = await getProduct();
    for(let product of products) {
        showProduct(product);
    }
}
function getProduct(){
    return fetch('http://localhost:3000/api/products/')
    .then( function(reponse) { return reponse.json()})
    .then( function(products) { return products})
    .catch(function (error) {alert ('error product')})
}

function showProduct (product) {
    affichage.innerHTML += `<a href="./product.html?id=${product._id}" >
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}" >
            <h3 class=productName> ${product.name} </h3>
            <p class=productDescription> ${product.description} </p>
        </article>
    </a>`;
    console.log(product);
}*/

 /******************************************************************
 ***                          FONCTIONS                         ***
 ******************************************************************/
 /*fonction 1 get
 retourne un tableau de tout les éléments */  /* ok */
 
/*fonction 2 get /id
revoie l'élément correspondant à l'id du produit */

/* fonction 3 post /order
requête json contenant un objet de contact et un tableu produit et order id */

//let product;
main();

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
console.log(product);
     

 
 /******************************************************************
 ***                       CODE PRINCIPAL                       ***
 ******************************************************************/
 
//fonction asynchrone pour le choix des couleurs
async function productChoice (){
    const products = await getProduct();
    for(product of products) {
        showProduct(product);
    }
}


