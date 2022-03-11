/******************************************************************
 ***                    DECLARATION VARIABLES                   ***
 ******************************************************************/
/*v.1
new class kanap {
    Constructor (id,productName,altTxt,productDescription,colors,price){
        this.id = id;
        this.image = image;
        this.altTxt = altTxt;
        this.productName = productName;
        this.productDescription = productDescription;
        this.colors = colors;
        this.price = price;
    }

    Description() {
        this.altTxt = "Photographie d'un canapé, " + this.color + ".";
    }
}*/
//v.2
new class kanap {
    Constructor (id,name,description,colors,price){
        this.id = id;
        this.name = name;
        this.description = description;
        this.colors = colors;
        this.price = price;
        this.image = ".../" + this.name + ".jpg";
        this.altTxt = "Photographie d'un canapé, " + this.color + ".";
    }
}

new class customer {
    contructor (orderId,firstName,lastName,address,city,email) {
        this.orderId = orderId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

/*v.1
let kanap01 = new kanap(01,'kanap01','Photographie d\'un canapé','Dis enim malesuada risus sapien gravida nulla nisl arcu.','bleu',42);
let kanap02 = new kanap(02,'kanap02','Photographie d\'un canapé','Dis enim malesuada risus sapien gravida nulla nisl arcu.','jaune',142);
let kanap03 = new kanap(03,'kanap03','Photographie d\'un canapé','Dis enim malesuada risus sapien gravida nulla nisl arcu.','vert',72);
let kanap04 = new kanap(04,'kanap04','Photographie d\'un canapé','Dis enim malesuada risus sapien gravida nulla nisl arcu.','mauve',32);
let kanap05 = new kanap(05,'kanap05','Photographie d\'un canapé','Dis enim malesuada risus sapien gravida nulla nisl arcu.','gris',150);
let kanap06 = new kanap(06,'kanap06','Photographie d\'un canapé','Dis enim malesuada risus sapien gravida nulla nisl arcu.','noir',100);
let kanap07 = new kanap(07,'kanap07','Photographie d\'un canapé','Dis enim malesuada risus sapien gravida nulla nisl arcu.','rouge',62);
let kanap08 = new kanap(08,'kanap08','Photographie d\'un canapé','Dis enim malesuada risus sapien gravida nulla nisl arcu.','rose',88);*/
//v.2
let kanap01 = new kanap(01,'kanap01','Dis enim malesuada risus sapien gravida nulla nisl arcu.','bleu',42);
let kanap02 = new kanap(02,'kanap02','Dis enim malesuada risus sapien gravida nulla nisl arcu.','jaune',142);
let kanap03 = new kanap(03,'kanap03','Dis enim malesuada risus sapien gravida nulla nisl arcu.','vert',72);
let kanap04 = new kanap(04,'kanap04','Dis enim malesuada risus sapien gravida nulla nisl arcu.','mauve',32);
let kanap05 = new kanap(05,'kanap05','Dis enim malesuada risus sapien gravida nulla nisl arcu.','gris',150);
let kanap06 = new kanap(06,'kanap06','Dis enim malesuada risus sapien gravida nulla nisl arcu.','noir',100);
let kanap07 = new kanap(07,'kanap07','Dis enim malesuada risus sapien gravida nulla nisl arcu.','rouge',62);
let kanap08 = new kanap(08,'kanap08','Dis enim malesuada risus sapien gravida nulla nisl arcu.','rose',88);

let stockKanap = 8;

 /******************************************************************
 ***                          FONCTIONS                         ***
 ******************************************************************/
 /*fonction 1 get
 retourne un tableau de tout les éléments */
 
/*fonction 2 get /id
revoie l'élément correspondant à l'id du produit */

/* fonction 3 post /order
requête json contenant un objet de contact et un tableu produit et order id */

/**/



/*fonction d'affichage des kanap */
function AfficherKanap () {

    //for (let i = 1;i <= id ; i++)

    /* création de la variable permetant de placer les éléments */
    let affichage = document.getElementById(items);

    /* création des éléments à afficher */
    let lien = document.createElement('a');
    let article = document.createElement('article');
    let image = document.createElement('img');
    let titre = document.createElement('h3');
    let description = document.createElement('p');

    /*création des élément à afficher */
    lien.textContent = kanap01.id;/* surement pas bon à voir comment faire un lien*/



    affichage.prepend(lien) {

        /*création de l'article*/
        affichage.prepend(article) {


        }
    }
    console.log(affichage);
    console.log(lien);

    

    /* append - dernier enfant ou prepend - premier enfant ? */

     
}

 
 /******************************************************************
 ***                       CODE PRINCIPAL                       ***
 ******************************************************************/
 