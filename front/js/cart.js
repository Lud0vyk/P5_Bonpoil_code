//cart.js
/******************************************************************
 ***                    DECLARATION VARIABLES                   ***
 ******************************************************************/

 // récupération des éléments HTML pour l'affichage
 const cart__items = document.getElementById('cart__items');
 const totalQuantity = document.getElementById('totalQuantity');
 const totalPrice = document.getElementById('totalPrice');

 // déclaration de la variable du LocalStorage pour récupérer les données du panier
 let cartToLocalStorage = JSON.parse(localStorage.getItem("cart"));

  
 // variable pour pouvoir utiliser ce qu'il y a dans le panier
 let elementsOfCart = [];


/******************************************************************
 ***                          FONCTIONS                         ***
 ******************************************************************/

 // fonction principale asynchrone qui appele toutes les autres
 async function mainCart() {
    const products = await getProduct();
    cartElements(products);
    showCart(elementsOfCart);
 }
 

 // fonction pour récupérer les produits
 function getProduct(){
     return fetch('http://localhost:3000/api/products/')
     .then( function(reponse) { return reponse.json()})
     .then( function(products) { return products})
     .catch( function (error) {alert ('error product')} )
 }

// fonction qui met dans une variable les éléments récupérés dans le localStorage
// et qui correspondent à ceux de products retrouvé grace à id, si le panier n'est pas null
function cartElements(products) {

    let productById;

    // si le panier est vide
    if(cartToLocalStorage === null) {
        cart__items.innerHTML = `<h2>Votre panier est vide.</h2>`;

    } else {
    
        for(let i = 0; i < cartToLocalStorage.length; i++) {

            // méthode qui renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition
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
    }
    return elementsOfCart;
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

    // bouton pour supprimer les données
    let deleteItem = document.querySelectorAll("p.deleteItem");
    // appel de la fonction de suppression
    deleteItemOfCart(deleteItem);

    // bouton pour changer quantité
    let itemQuantity = document.querySelectorAll(".itemQuantity");
    // appel de la fonction de changement de quantité
    ChangeQuantity(itemQuantity);
}


/* *** *** *** bouton supprimer et changement de quantité *** *** *** */
//suppression d'un article
function deleteItemOfCart(deleteItem) {
   
    for(let k = 0; k < deleteItem.length; k++) {

        deleteItem[k].addEventListener("click", (event) => {
            event.preventDefault();
    
            // fenêtre de popup pour avertir l'utilisateur de la suppression
            if( window.confirm(`Souhaitez vous retirer ${elementsOfCart[k].name} de votre liste ? `)) {
    
                // suppression de l'élément
                cartToLocalStorage[k] = null;
                // filtrage de l'élément null
                cartToLocalStorage = cartToLocalStorage.filter( element => element !== null );

               // si le panier est vide suppression du panier sinon mise à jour du panier
               if( cartToLocalStorage.length == 0 ) {

                    localStorage.clear();

                } else {

                    // mise à jour du panier dans le local storage
                    localStorage.setItem("cart", JSON.stringify(cartToLocalStorage));
                }

                window.location.href = "cart.html";
            }
        });
    }
}

// changement de quantité
function ChangeQuantity(itemQuantity) {

    for(let l = 0; l < itemQuantity.length; l++) {      

        // changement de la quantité pour chaque input
        itemQuantity[l].addEventListener("input", (event) => {
            event.preventDefault();
            
            let newQuantity = itemQuantity[l].value;

            cartToLocalStorage[l].productQuantity = newQuantity;
            localStorage.setItem("cart", JSON.stringify(cartToLocalStorage));
            location.reload();
        });
    }
}

/* ----- ----- ----- ----- ----- Envoi du formulaire ----- ----- ----- ----- ----- */

 // bouton pour envoyer les données
 const order = document.querySelector("#order");

 // fonction pour éviter les répétitions
 function errorMessage (errorMessage) {
 
    
    return document.querySelector(errorMessage).textContent = "Veuillez remplir ce champ.";
 }

// envoi du formulaire lors du clic sur commander si les conditions sont réunies
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

    // vérification si le panier est vide
    if( localStorage.length == 0 ) {

        window.alert("Votre panier est vide !");

    } else {

        let succes = false;

        // utilisation des regex pour vérifier les données du formulaire
        // si le champ est vide ou pas
        if(contact.firstName == ""){
            emptyField("#firstNameErrorMsg"); 
        }else if( !(/^([A-Za-z]{1,20})?([-]{0,1)?([A-Za-z]{1,20})$/.test(contact.firstName)) ){
            errorField("#firstNameErrorMsg");
        }else{
            succes = true;
        }

        if(contact.lastName == ""){
            emptyField("#lastNameErrorMsg");
        }else if( !(/^[A-Za-z]{1,20}$/.test(contact.lastName)) ){
            errorField("#lastNameErrorMsg");
        }else{
            succes = true;
        }

        if(contact.city == ""){
            emptyField("#cityErrorMsg");
        }else if( !(/^[A-Za-z]{1,20}$/.test(contact.city)) ){
            errorField("#cityErrorMsg");
        }else{
            succes = true;
        }

        if(contact.address == ""){
            emptyField("#addressErrorMsg");
        }else if( !(/^[A-Za-z0-9'\.\-\s\,]{1,30}$/.test(contact.address)) ){
            errorField("#addressErrorMsg");
        }else{
            succes = true;
        }

        if(contact.email == ""){
            emptyField("#emailErrorMsg");
        }else if( !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(contact.email)) ){
            errorField("#emailErrorMsg");
        }else{
            succes = true;
        }


        if(succes) {

            /* J'ai voulu effacer les messages d'erreurs sauf que cela demanderait un rechargement de la page.
            Or, si cela devait se produire alors les champs de formulaire déjà remplis seraient effacés également. */
            localStorage.setItem("contact", JSON.stringify(contact));

            let product = [];
            for(let l = 0; elementsOfCart.length > l; l++ ) {

                for(let m = 0; elementsOfCart[l].quantity > m; m++ ) {

                    product.push(elementsOfCart[l].id);
                }
            }

            // Objet avec les produits et les informations client 
            let commande = {
                products : product,
                contact : contact
            }

            // Objet envoyé en méthode post pour la confirmation
            let promise = fetch("http://localhost:3000/api/products/order/", {
                method : "POST",
                body : JSON.stringify(commande),
                headers : { "Content-type" : "application/json" }
            });

            /* Lors d'une exécution d'un code asynchrone, celui ci va nous retourner une promesse.
            Une promesse peut être résolue avec un résultat ou rejetée avec une erreur.
            Pour récupérer une promesse on peut utiliser la méthode "then" dès qu'elle est résolue 
            et "catch" sera utilisé dès qu'une erreur sera détectée. */
            promise.then((res) => res.json())
            
            .then((data) => {
            const orderId = data.orderId;
            // redirection vers la page confirmation
            window.location.href = "../html/confirmation.html" + "?orderId=" + orderId;
            return console.log(data);
            })
            // On catch si il y a une erreur. On prévient l'utilisateur avec une alert et on affiche le statut dans la console.
            .catch((err) => {
                alert ("Erreur d'envoi du formulaire. Veuillez réessayer plus tard.");
                console.log(data.status);
            });

        }
    }
});
     
 
/******************************************************************
 ***                       CODE PRINCIPAL                       ***
 ******************************************************************/
 
 //fonction principale de la page cart
 mainCart();

