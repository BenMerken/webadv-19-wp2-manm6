"use strict";

import BeerController from './controllers/BeerController';
import BeerModel from './models/BeerModel';
import ErrorView from './views/ErrorView';
import BeerView from './views/BeerView';
import BeersView from './views/BeersView';
import BeersAndIdsView from "./views/BeersAndIdsView";

let url = require('./serverUrl').url;

let beerView;
let beersView;
let errorView;
let beerModel;
let beerController;
let beersAndIdsView;

window.addEventListener("load", handleWindowLoad);

function handleWindowLoad() {
    beerView = new BeerView();
    beersView = new BeersView();
    errorView = new ErrorView();
    beerModel = new BeerModel(url);
    beersAndIdsView = new BeersAndIdsView();
    beerController = new BeerController(beerModel, beerView, beersView, errorView, beersAndIdsView);

    let image = "";

    let PostBeerByButton = document.getElementById("PostBeerButton");
    PostBeerByButton.addEventListener("click", handleClickPostBeer);

    let fileInput = document.getElementById("fileInput");
    fileInput.addEventListener("change", previewFile);

    let apiInfoAlert = document.getElementById("apiInfo");
    apiInfoAlert.innerHTML += "Current API is " + url;

    function handleClickPostBeer() {

        let name = document.getElementById("nameText").value;
        let description = document.getElementById("descriptionText").value;
        let price = document.getElementById("priceNumber").value.replace(",", ".");
        let alcohol = document.getElementById("alcoholNumber").value.replace(",", ".");
        image = image.replace(/^data:.*\/.*;base64,/, "");

        beerController.addBeer(name, description, price, alcohol, image);
    }

    function previewFile() {
        let preview = document.querySelector('img');
        let file = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
            image = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
}



