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

  
 //variable pour pouvoir utiliser ce qu'il y a dans le panier
 let elementsOfCart = [];


 
  //fonction asynchrone pour récupérer les produits et les afficher
  async function mainCart() {
    const products = await getProduct();
    cartElements(products);
    showCart(elementsOfCart);
    //return products;
 }
 
 //fonction pour récupérer les produits
 function getProduct(){
     return fetch('http://localhost:3000/api/cart/')
     .then( function(reponse) { return reponse.json()})
     .then( function(products) { return products})
     .catch( function (error) {alert ('error product')} )
 }

 //fonction qui met dans une variable les éléments récupéré dans le localStorage
//et qui corespond à ceux de products retrouvé grace à id
function cartElements(products) {

    let productById;

    //a faire si besoin et à revoir
    if(cartToLocalStorage === null) {
        //alert("Votre panier est vide");
        console.log("Le panier est vide");
    } else {
        console.log("Le panier n'est pas vide");

        for (let i = 0; i < cartToLocalStorage.length; i++) {

            productById = products.find( (element)=> element._id === cartToLocalStorage[i].productId);

            elementsOfCart[i] = {
                id : productById._id,
                name : productById.name,
                color : cartToLocalStorage[i].productColor,
                quantity : cartToLocalStorage[i].productQuantity,
                price : productById.price,
                img : productById.imageUrl,
                alt : productById.altTxt
            }
        }
        return elementsOfCart;
    }
}


// affichage des éléments dans l'HTML
function showCart(elementsOfCart) {

    for(let j = 0; j < elementsOfCart.length; j++) {
        
        cart__items.innerHTML += `<article class="cart__item" data-id="${elementsOfCart[j].id}" data-color="${elementsOfCart[j].color}">
            <div class="cart__item__img">
                <img src="${elementsOfCart[j].img}" alt="${elementsOfCart[j].alt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${elementsOfCart[j].name}</h2>
                    <p>${elementsOfCart[j].color}</p>
                    <p>${elementsOfCart[j].price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${elementsOfCart[j].quantity}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${elementsOfCart[j].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`
    }
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

