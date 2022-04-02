//cart.js
/******************************************************************
 ***                    DECLARATION VARIABLES                   ***
 ******************************************************************/

 //récupération des éléments HTML pour l'affichage
 const showCart = document.getElementById('cart__items');

 const totalQuantity = document.getElementById('totalQuantity');
 const totalPrice = document.getElementById('price');

 //création des variables clients
 let firstName;
 let lastName;
 let address;
 let city;
 let email;

  // déclaration de la variable du LocalStorage pour récupérer les données du panier
  let cartToLocalStorage = JSON.parse(localStorage.getItem("cart"));
  console.log(cartToLocalStorage);
  console.log(localStorage);
  
   //variable pour pouvoir utiliser ce qu'il y a dans le panier
   let elementOfCart = [];

 //fonction asynchrone pour récupérer les produits et les afficher
 async function mainCart (){
    const products = await getProduct();
    /*for(let pieceOfCart of cart) {
        showCart(pieceOfCart);
    }*/
 }
 
 //fonction pour récupérer les produits
 function getProduct(){
     return fetch('http://localhost:3000/api/cart/')
     .then( function(reponse) { return reponse.json()})
     .then( function(products) { return products})
     .catch( function (error) {alert ('error product')} )
 }

 //création des balises HTML pour l'affichage
 function showProduct (product) {
    
    showKanap.innerHTML += `<article class="cart__item" data-id="${productID}" data-color="${productcolor}">
        <div class="cart__item__img">
            <img src="${productID}" alt="${productID}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${productID}</h2>
                <p>${productID}</p>
                <p>${productID}</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : ${productID}</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`
    //console.log(product);
 }



/******************************************************************
 ***                          FONCTIONS                         ***
 ******************************************************************/
 /*fonction 1 get
 retourne un tableau de tout les éléments */  /* ok */

 /*fonction 2 get /id
 revoie l'élément correspondant à l'id du produit */

 /* fonction 3 post /order
 requête json contenant un objet de contact et un tableu produit et order id */


 
     
 
/******************************************************************
 ***                       CODE PRINCIPAL                       ***
 ******************************************************************/
 
 //fonction principale de la page cart
 mainCart();

