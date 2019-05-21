"use strict";
import View from './View';

export default class PersonView extends View {


    fill(data,form){
        let beer= data.beer;
        let name = form.querySelector("input[name='name']");
        name.value=beer.name;

        let description = form.querySelector("input[name='description']");
        description.value=beer.description;

        let price = form.querySelector("input[name='price']");
        price.value=beer.price;

        let alcohol = form.querySelector("input[name='alcohol']");
        alcohol.value=beer.alcohol;

        let image = form.querySelector("img");
        let src = "data:".concat("image/png", ";base64,", beer.image);
        image.setAttribute("src", src);
    }
    show(data) {
        let beer= data.beer;
        let maindiv = document.createElement("div");
        let ptag = document.createElement("p");
        ptag.innerText="de bier genaamd "+beer +"is met success toegevoegd";
        maindiv.appendChild(ptag);
        super.show(maindiv);
    }
}
