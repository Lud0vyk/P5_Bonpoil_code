//confirmation.js
/******************************************************************
 ***                    DECLARATION VARIABLES                   ***
 ******************************************************************/
 console.log("confirmation.js");
 //récupération des éléments HTML pour l'affichage
 const orderId = document.getElementById('orderId');

  //récupération de l'id 
  let queryString_url_id = window.location.search;
  let urlSearchParams = new URLSearchParams(queryString_url_id);
  let id = urlSearchParams.get("orderId");


 orderId.innerHTML = `${id}`;

 localStorage.clear();


/******************************************************************
 ***                          FONCTIONS                         ***
 ******************************************************************/
 
     
 
/******************************************************************
 ***                       CODE PRINCIPAL                       ***
 ******************************************************************/
 
 //fonction principale de l'index qui appelle toutes les autres
 //mainConfirmation();

