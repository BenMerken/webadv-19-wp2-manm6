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


    //voeg hier de event handlers toe aan knoppen etc en definieer hieronder de functies

    beerController.listBeersAndIds("selectIds");

    let GETBeerByIdButton = document.getElementById("getBeerByIdButton");
    GETBeerByIdButton.addEventListener("click", handleClickGetBeerById);

    let PUTBeerButton = document.getElementById("putBeerButton");
    PUTBeerButton.addEventListener("click", handleClickPutBeer);

    const urlParams = new URLSearchParams(window.location.search);

    let id = urlParams.get('id');
    let select = document.getElementById("selectIds");
    let form = document.getElementById("BeerInformationForm");
    if (id !== null) {
        for (let i = 0; i < select.length; i++) {
            if (select[i] == id) {
                select.selectedIndex = i;
                break;
            }
        }
        beerController.listBeer(id, form)
    }

    function handleClickGetBeerById() {
        let id = select.value;
        let form = document.getElementById("BeerInformationForm");
        beerController.listBeer(id, form);
    }

    function handleClickPutBeer() {
        let form = document.getElementById("BeerInformationForm");
        let id = document.getElementById("selectIds").value;
        let name = document.getElementById("nameText").value;
        let description = document.getElementById("descriptionText").value;
        let price = document.getElementById("priceNumber").value;
        let alcohol = document.getElementById("alcoholNumber").value;
        let image = document.getElementById("imageFile").files[0];
        beerController.putBeer(id, name, description, price, alcohol, image, form);
    }
}



