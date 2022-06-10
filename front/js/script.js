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
    
    let liens = document.createElement('a');
    liens.href = `./product.html?id=${product._id}`;
    showKanap.appendChild(liens);

    let article = document.createElement('article');
    showKanap.appendChild(liens).appendChild(article);
    
    let images = document.createElement("img");
    images.src = product.imageUrl;
    images.alt = product.altTxt;
    showKanap.appendChild(liens).appendChild(article).appendChild(images);
    
    let kanapTitre = document.createElement("h3");
    kanapTitre.classList.add("productName");
    kanapTitre.innerText = product.name;
    showKanap.appendChild(liens).appendChild(article).appendChild(kanapTitre);

    let kanapDescription = document.createElement("p");
    kanapDescription.classList.add("productDescription");
    kanapDescription.innerText = product.description;
    showKanap.appendChild(liens).appendChild(article).appendChild(kanapDescription);
 }
     
 
/******************************************************************
 ***                       CODE PRINCIPAL                       ***
 ******************************************************************/
 
 //fonction principale de l'index qui appelle toutes les autres
 main();

