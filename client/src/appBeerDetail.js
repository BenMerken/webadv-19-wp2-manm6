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
    let beerId = -1;

    //voeg hier de event handlers toe aan knoppen etc en definieer hieronder de functies

    let imageSource = document.getElementById("imageSource");
    imageSource.addEventListener("load", handleInitialImageChange);

    beerController.listBeersAndIds("selectIds");

    let beerIdSelect = document.getElementById("selectIds");
    beerIdSelect.addEventListener("change", handleChangeSelectIds);

    let PUTBeerButton = document.getElementById("putBeerButton");
    PUTBeerButton.addEventListener("click", handleClickPutBeer);

    let filePicker = document.getElementById("filePicker");
    filePicker.addEventListener("change", handleFilePickerChange);

    const urlParams = new URLSearchParams(window.location.search);

    let id = urlParams.get('id');
    let form = document.getElementById("BeerInformationForm");
    if (id !== null) {
        for (let i = 0; i < beerIdSelect.length; i++) {
            if (beerIdSelect[i] == id) {
                beerIdSelect.selectedIndex = i;
                break;
            }
        }
        beerId = parseInt(id);
        beerController.listBeer(id, form)
    }

    function handleClickPutBeer() {
        let form = document.getElementById("BeerInformationForm");
        let name = document.getElementById("nameText").value;
        let description = document.getElementById("descriptionText").value;
        let price = document.getElementById("priceNumber").value;
        let alcohol = document.getElementById("alcoholNumber").value;
        image = image.replace(/^data:.*\/.*;base64,/, "");

        beerController.putBeer(beerId, name, description, price, alcohol, image, form);
    }

    function handleChangeSelectIds() {
        beerId = beerIdSelect.value;
        let form = document.getElementById("BeerInformationForm");
        beerController.listBeer(beerId, form);
    }

    function handleInitialImageChange() {
        image = document.getElementById("imageSource").src;
    }

    function handleFilePickerChange() {
        let preview = document.querySelector('img');
        let file = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
}



