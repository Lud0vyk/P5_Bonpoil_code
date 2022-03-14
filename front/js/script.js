/******************************************************************
 ***                    DECLARATION VARIABLES                   ***
 ******************************************************************/

 //v.6
class Kanap {
    constructor (id,name,description,color,price){
        this.id = id;
        this.name = name;
        this.description = description;
        this.color = color;
        this.price = price;
    }

    getImage() {
        let image = "../../back/images/" + this.name + ".jpeg";
        return image;
    }
    get image() {
        return this.getImage;
    }
    getAltTxt() {
        let altTxt = "Photographie d'un canapé, " + this.color + ".";
        return altTxt;
    }
    get altTxt() {
        return this.getAltTxt;
    }

}
//v.2
let kanap01 = new Kanap(1,'kanap01','Dis enim malesuada risus sapien gravida nulla nisl arcu.','bleu',42);
let kanap02 = new Kanap(2,'kanap02','Dis enim malesuada risus sapien gravida nulla nisl arcu.','jaune',142);
let kanap03 = new Kanap(3,'kanap03','Dis enim malesuada risus sapien gravida nulla nisl arcu.','vert',72);
let kanap04 = new Kanap(4,'kanap04','Dis enim malesuada risus sapien gravida nulla nisl arcu.','mauve',32);
let kanap05 = new Kanap(5,'kanap05','Dis enim malesuada risus sapien gravida nulla nisl arcu.','gris',150);
let kanap06 = new Kanap(6,'kanap06','Dis enim malesuada risus sapien gravida nulla nisl arcu.','noir',100);
let kanap07 = new Kanap(7,'kanap07','Dis enim malesuada risus sapien gravida nulla nisl arcu.','rouge',62);
let kanap08 = new Kanap(8,'kanap08','Dis enim malesuada risus sapien gravida nulla nisl arcu.','rose',88);

let kanaps = [kanap01,kanap02,kanap03,kanap04,kanap05,kanap06,kanap07,kanap08];

console.log(kanap01);
const affichage = document.getElementById('items');
console.log(kanap01.id);
console.log(kanap01.image());
console.log(kanap01.altTxt());


 /******************************************************************
 ***                          FONCTIONS                         ***
 ******************************************************************/
 /*fonction 1 get
 retourne un tableau de tout les éléments */
 
/*fonction 2 get /id
revoie l'élément correspondant à l'id du produit */

/* fonction 3 post /order
requête json contenant un objet de contact et un tableu produit et order id */



     

 
 /******************************************************************
 ***                       CODE PRINCIPAL                       ***
 ******************************************************************/
 

 //v.3
affichage.innerHTML = `<a href="http://127.0.0.1:5500/front/html?id=" ${kanap01.id} ">
<article>
    <img src=" ${kanap01.image()} " alt=" ${kanap01.altTxt()} + >
    <h3 class = productName>" ${kanap01.name} </h3>
    <p class = productDescription> ${kanap01.description} </p>
</article>
</a>`;