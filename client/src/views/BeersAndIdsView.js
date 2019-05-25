"use strict";
import View from './View';

//this function fills up the html select element which holds the beer id values with ids

export default class BeersAndIdsView extends View {
    showOutput(data, output) {
        let select = document.getElementById(output);
        let option = document.createElement("option");
        option.value = -1;
        option.innerText = "Select A beer";
        select.appendChild(option);
        for (let beer of data.beers) {
            let option = document.createElement("option");
            option.value = beer.beerId;
            option.innerText = beer.name;
            select.appendChild(option);
        }
    }
}
