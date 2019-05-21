"use strict";
import View from './View';

export default class BeersView extends View {
    show(data) {
        let numberOfBeers = data.beers.length;
        let output = document.createElement("maindiv");

        for (let beer of data.beers) {
            let div = document.createElement("div");

            let titleBar = document.createElement("h2");
            titleBar.innerText = beer.name;
            div.appendChild(titleBar);

            let figure = document.createElement("figure");
            let img = document.createElement("img");
            let src = "data:".concat("image/png", ";base64,", beer.image);
            img.setAttribute("src", src);

            let aTag=document.createElement("a");
            aTag.setAttribute("href","BeerDetail.html?id="+beer.id);
            aTag.innerText="detail";

            figure.appendChild(img);
            figure.appendChild(aTag);

            div.appendChild(figure);

            output.appendChild(div);
        }
        super.show(output);
    }
}
