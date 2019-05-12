"use strict";
import View from './View';

export default class BeersView extends View {
    show(data) {
        let numberOfPersons = data.beers.length;
        let output = document.createElement("maindiv");

        for (let beer of data.beers) {
           // output = output + `${person.id} ${person.name}\n`;
            let div = document.createElement("div");
            let titleBar = document.createElement("h2");
            titleBar.innerHTML = beer.title;
            div.appendChild(titleBar);

            let img = document.createElement("img");
            let src = "data:".concat("image/png", ";base64,", beer.image);
            img.setAttribute("src", src);
            div.appendChild(img);

            output.appendChild(div);
        }
        super.show(output);
    }
}
