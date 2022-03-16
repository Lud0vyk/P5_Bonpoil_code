/******************************************************************
 ***                    DECLARATION VARIABLES                   ***
 ******************************************************************/

const affichage = document.getElementById('items');
main();
//http://localhost:3000/api/products

async function main (){
    const products = await getProduct();
    for(product of products) {
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
}

 /******************************************************************
 ***                          FONCTIONS                         ***
 ******************************************************************/
 /*fonction 1 get
 retourne un tableau de tout les éléments */
 
/*fonction 2 get /id
revoie l'élément correspondant à l'id du produit */

/* fonction 3 post /order
requête json contenant un objet de contact et un tableu produit et order id */

async function main (){
    const products = await getProduct();
    for(product of products) {
        showProduct(product);
    }
}
function getProduct(){
    return fetch('http://localhost:3000/api/products/')
    .then( function(reponse) { return reponse.json()})
    .then( function(products) { return products})
    .catch(function (error) {alert ('error product')} )
}

function showProduct (product) {
    console.log(product);
    affichage.innerHTML += `<a href="./product.html?id=${product._id}" >
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
 



