//product.js
/******************************************************************
 ***                    DECLARATION VARIABLES                   ***
 ******************************************************************/

 //constante qui serviront à placer les élément dans le html
 const kanapImage = document.getElementsByClassName('item__img');
 const kanapTitre = document.getElementById('title');
 const kanapPrice = document.getElementById('price');
 const kanapDescription = document.getElementById('description');
 const kanapColors = document.getElementById('colors');

 //récupération de l'id du produit
 let queryString_url_id = window.location.search;
 let urlSearchParams = new URLSearchParams(queryString_url_id);
 let id = urlSearchParams.get("id");

 //variable de récupération du produit
 let productChoice;


 //sélection des données du panier
 const quantityKanap = document.querySelector("#quantity");
 const colorKanap = document.querySelector("#colors");

 //données à envoyer
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
 function getProduct(){
    return fetch('http://localhost:3000/api/products/')
    .then( function(reponse) { return reponse.json()})
    .then( function(products) { return products})
    .catch( function (error) {alert ('error product')} )
 }

 //fonction asynchrone pour récupérer le produit
 async function mainProduct (){

    const products = await getProduct();
    let productById = products.find( (element)=> element._id === id);
    showProductById(productById);

    return productChoice = productById;
 }


 //envoi du panier
 addToCart.addEventListener("click", (event) => {
    event.preventDefault();

 //récupération de la couleur
 const selectedColor = colorKanap.value;
 //récupération de la quantité
 const selectedQuantity = quantityKanap.value;

 //récupartion du panier
 let cart = {
   productId : productChoice._id,
   productColor : selectedColor,
   productQuantity : selectedQuantity
   //voir si besoin d'autre chose
   }
   
   /* *** stockage des données *** */

    //fenêtre popup
    function popup() {

        if(window.confirm(`${productChoice.name}
            Option : ${selectedColor} x ${selectedQuantity} a bien été ajouté au panier
            Aller au panier OK ou revenir à l'accueil ANNULER `)) {
            window.location.href = "cart.html";
       
        } else {
            window.location.href = "index.html";
        }
    }

    /* déclaration de la variable à envoyer dans le LocalStorage */
    let sendCartToLocalStorage = JSON.parse(localStorage.getItem("cart"))

    //si les condition ne sont pas réuni
    if(selectedColor == "" || selectedQuantity == 0) {
        window.alert(`Veuillez choisir une couleur et une quantité`);
        window.location.href = `product.html?id=${productChoice._id}`;

    //si il y a déjà un produit dans le localStorage
    } else if(sendCartToLocalStorage) {
        sendCartToLocalStorage.push(cart);
        localStorage.setItem("cart", JSON.stringify(sendCartToLocalStorage));
        console.log(sendCartToLocalStorage);
        popup();

    //si il n'y a rien dans le localStorage
    } else {
        sendCartToLocalStorage = [];
        sendCartToLocalStorage.push(cart);
        localStorage.setItem("cart", JSON.stringify(sendCartToLocalStorage));
        console.log(sendCartToLocalStorage);
        popup();
    }

 });



/******************************************************************
 ***                       CODE PRINCIPAL                       ***
 ******************************************************************/

 //fonction principale de la page product
 mainProduct();
