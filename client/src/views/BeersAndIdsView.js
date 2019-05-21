"use strict";
import View from './View';
//this is for the select which has id value
export default class BeersAndIdsView extends View {
    showOutput(data,output) {
        let numberOfBeers = data.beers.length;
        let select = document.getElementById(output);

        let option = document.createElement("option");
        option.value=-1;
        option.innerText = "Select A beer";
        select.appendChild(option);
        for (let beer of data.beers) {
            let option = document.createElement("option");
            option.value=beer.id;
            option.innerText = beer.name;
            select.appendChild(option);
        }
    }
}
