//product.js
/******************************************************************
 ***                    DECLARATION VARIABLES                   ***
 ******************************************************************/

 // constante qui serviront à placer les élément dans le html
 const kanapImage = document.getElementsByClassName('item__img');
 const kanapTitre = document.getElementById('title');
 const kanapPrice = document.getElementById('price');
 const kanapDescription = document.getElementById('description');
 const kanapColors = document.getElementById('colors');

 // récupération de l'id du produit
 let queryString_url_id = window.location.search;
 let urlSearchParams = new URLSearchParams(queryString_url_id);
 let id = urlSearchParams.get("id");

 // variable de récupération du produit
 let productChoice;


 // sélection des données du panier
 const quantityKanap = document.querySelector("#quantity");
 const colorKanap = document.querySelector("#colors");

 // données à envoyer
 const addToCart = document.querySelector("#addToCart");


/******************************************************************
 ***                          FONCTIONS                         ***
 ******************************************************************/

 // affichage des l'éléments dans product.html
 function showProductById (product) {
     
    kanapImage[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}" >`;
    kanapTitre.innerText = `(${product.name})`;
    kanapPrice.innerText = `(${product.price})`;
    kanapDescription.innerText = `(${product.description})`;
    for(let color of product.colors) {
        kanapColors.innerHTML +=`<option value="${color}">${color}</option>`;
    }
 }

 //fonction pour récupérer les produits
 function getProduct() {
    return fetch('http://localhost:3000/api/products/'+id)
    .then( function(reponse) { return reponse.json()})
    .then( function(products) { return products})
    .catch( function (error) {alert ('error product')} )
 }

 //fonction principale asynchrone pour récupérer le produit et l'afficher
 async function mainProduct() {

    const productById = await getProduct();
    showProductById(productById);

    return productChoice = productById;
 }


// envoi du produit dans le panier
addToCart.addEventListener("click", (event) => {
    event.preventDefault();

    // récupération de la couleur
    const selectedColor = colorKanap.value;
    // récupération de la quantité
    const selectedQuantity = quantityKanap.value;

    // récupartion des valeurs du formulaire
    let cart = {
        productId : productChoice._id,
        productColor : selectedColor,
        productQuantity : selectedQuantity
    }
   
    /* *** stockage des données *** */

    // fenêtre popup qui s'ouvre lors de l'ajout d'un article
    function popup() {

        if(window.confirm(`${productChoice.name}
            Option : ${selectedColor} x ${selectedQuantity} a bien été ajouté au panier
            Aller au panier OK ou revenir à l'accueil ANNULER `)) {
            window.location.href = "cart.html";
       
        } else {
            window.location.href = "index.html";
        }
    }

    // déclaration ou récupération de la variable du localStorage si elle n'esiste pas elle sera vide
    let cartToLocalStorage = JSON.parse(localStorage.getItem("cart"));

    // si les conditions ne sont pas réunies
    if(selectedColor == "" || selectedQuantity == 0) {
        window.alert(`Veuillez choisir une couleur et une quantité`);
        window.location.href = `product.html?id=${productChoice._id}`;
      
    // si il y a déjà un produit dans le localStorage
    } else if(cartToLocalStorage) {

        let bool = true;

        // si le produit existe déjà dans la même couleur
        for ( let i = 0; i < cartToLocalStorage.length; i++) {

            if( cartToLocalStorage[i].productId === productChoice._id && cartToLocalStorage[i].productColor === selectedColor ){
                
                cartToLocalStorage[i].productQuantity = parseInt(cartToLocalStorage[i].productQuantity) + parseInt(selectedQuantity);
                bool = false;
            } 
        }
        if(bool) {
            cartToLocalStorage.push(cart);
        }
        localStorage.setItem("cart", JSON.stringify(cartToLocalStorage));
        popup();

    // si il n'y a rien dans le localStorage
    } else {
        cartToLocalStorage = [];
        cartToLocalStorage.push(cart);
        localStorage.setItem("cart", JSON.stringify(cartToLocalStorage));
        popup();
    }
});


/******************************************************************
 ***                       CODE PRINCIPAL                       ***
 ******************************************************************/

 //fonction principale de la page product
 mainProduct();
