//cart.js
/******************************************************************
 ***                    DECLARATION VARIABLES                   ***
 ******************************************************************/

 //récupération des éléments HTML pour l'affichage
 const cart__items = document.getElementById('cart__items');
 const totalQuantity = document.getElementById('totalQuantity');
 const totalPrice = document.getElementById('price');

 // déclaration de la variable du LocalStorage pour récupérer les données du panier
 let cartToLocalStorage = JSON.parse(localStorage.getItem("cart"));

  
 //variable pour pouvoir utiliser ce qu'il y a dans le panier
 let elementsOfCart = [];


 
  //fonction asynchrone pour récupérer les produits et les afficher
  async function mainCart() {
    const products = await getProduct();
    cartElements(products);
    showCart(elementsOfCart);
 }
 

 //fonction pour récupérer les produits
 function getProduct(){
     return fetch('http://localhost:3000/api/products/')
     .then( function(reponse) { return reponse.json()})
     .then( function(products) { return products})
     .catch( function (error) {alert ('error product')} )
 }

 //fonction qui met dans une variable les éléments récupéré dans le localStorage
//et qui correspond à ceux de products retrouvé grace à id
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

    // variables pour faire les calcules
    let totalP = 0;
    let totalQ = 0;

    for(let j = 0; j < elementsOfCart.length; j++) {

        // a voir si besoin de changement
        let newQuantity = elementsOfCart[j].quantity;
        
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
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${newQuantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`;

        totalQ +=  parseInt(elementsOfCart[j].quantity);
        totalP +=  elementsOfCart[j].price * parseInt(elementsOfCart[j].quantity);
    }

    totalQuantity.innerText = `( ${parseInt(totalQ)} )`;
    totalPrice.innerText = `( ${totalP} )`;

    //bouton pour supprimer les données
    let deleteItem = document.querySelectorAll("p.deleteItem");

    // appelle de la fonction de suppression
    deleteItemOfCart(deleteItem);
}



/* *** *** *** bouton supprimer et changement de quantité *** *** *** */

//suppression d'un article
function deleteItemOfCart(deleteItem) {
   
    for(let k = 0; k < deleteItem.length; k++) {

        deleteItem[k].addEventListener("click", (event) => {
            event.preventDefault();
    
            // fenêtre de popup pour avertir l'utilisateur de la suppression
            if ( window.confirm(`Souhaitez vous retirer ${elementsOfCart[k].name} de votre liste ? `)) {
    
                // suppression de l'élément
                cartToLocalStorage[k] = null;
                // filtrage de l'élément null
                cartToLocalStorage = cartToLocalStorage.filter( element => element !== null );
                // mise à jour du panier dans le local storage
                localStorage.setItem("cart", JSON.stringify(cartToLocalStorage));
                window.location.href = "cart.html";

            } else {
                window.location.href = "cart.html";
            }
        });
    }
}


/* ----- ----- ----- ----- ----- Envoi du formulaire ----- ----- ----- ----- ----- */

 // bouton pour envoyer les données
 const order = document.querySelector("#order");
 console.log("order");
 console.log(order);


order.addEventListener("click", (event) => {
    event.preventDefault();

    //création des variables clients
    let contact = {
        firstName : document.querySelector("#firstName").value,
        lastName : document.querySelector("#lastName").value,
        address : document.querySelector("#address").value,
        city : document.querySelector("#city").value,
        email : document.querySelector("#email").value
    }

    // vérification du formulaire
    switch ("") {

        case contact.firstName :
            window.alert("Prénom manquant !");
            break;

        case contact.lastName :
            window.alert("Nom manquant !");
            break;

        case contact.address :
            window.alert("Adresse manquante !");
            break;

        case contact.city :
            window.alert("Ville manquante !");
            break;

        case contact.email :
            window.alert("Courriel manquant !");
            break;

        default:
            
        // utilisation des regex pour vérifier les données du formulaire
        if( !(/^([A-Za-z]{1,20})?([-]{0,1)?([A-Za-z]{1,20})$/.test(contact.firstName)) ){
            window.alert("Prénom incorrect !");
            document.querySelector("#firstNameErrorMsg").textContent = "Veuillez remplir ce champ.";
        
        } else if( !(/^[A-Za-z]{1,20}$/.test(contact.lastName)) ){
            window.alert("Nom incorrect !");
            document.querySelector("#lastNameErrorMsg").textContent = "Veuillez remplir ce champ.";

        } else if( !(/^[A-Za-z]{1,20}$/.test(contact.city)) ){
            window.alert("Ville incorrecte !");
            document.querySelector("#cityErrorMsg").textContent = "Veuillez remplir ce champ.";

        } else if( !(/^[A-Za-z0-9\s]{1,30}$/.test(contact.address)) ){
            window.alert("Adresse incorrecte !");
            document.querySelector("#addressErrorMsg").textContent = "Veuillez remplir ce champ.";

        } else if( !(/^[A-Za-z0-9\s]{1,30}$/.test(contact.email))/*!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(contact.email))*/ ){
            window.alert("Courriel incorrecte !");
            document.querySelector("#emailErrorMsg").textContent = "Veuillez remplir ce champ.";

        } else {
            document.querySelector("#firstNameErrorMsg").textContent = "";
            document.querySelector("#lastNameErrorMsg").textContent = "";
            document.querySelector("#cityErrorMsg").textContent = "";
            document.querySelector("#addressErrorMsg").textContent = "";
            document.querySelector("#emailErrorMsg").textContent = "";
            localStorage.setItem("contact", JSON.stringify(contact));
        }
    }

    let product = [];
    for(let l = 0; elementsOfCart.length > l; l++ ) {

        for(let m = 0; elementsOfCart[l].quantity > m; m++ ) {

            product.push(elementsOfCart[l].id); 
        }
    }

    // faire un tableau avec les produits et les informations client à envoyer en méthode post pour la confirmation
    let commande = {
        products : product,
        contact : contact
    }

    let promise = fetch("http://localhost:3000/api/products/order/", {
        method : "POST",
        body : JSON.stringify(commande),
        headers : { "Content-type" : "application/json" }
    });

    promise.then(async(response)=> {

        try {
            let orderResponse = await response.json();

        } catch(error) {
            console.log(error);
        }
    });  
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


 
     
 
/******************************************************************
 ***                       CODE PRINCIPAL                       ***
 ******************************************************************/
 
 //fonction principale de la page cart
 mainCart();

