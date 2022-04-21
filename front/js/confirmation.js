//confirmation.js
/******************************************************************
 ***                     CODE PRINCIPAL                         ***
 ******************************************************************/

 //récupération des éléments HTML pour l'affichage
 const orderId = document.getElementById('orderId');

 //récupération de l'id 
 let queryString_url_id = window.location.search;
 let urlSearchParams = new URLSearchParams(queryString_url_id);
 let id = urlSearchParams.get("orderId");

 orderId.innerHTML = `${id}`;

 // suppression du panier existant
 localStorage.clear();