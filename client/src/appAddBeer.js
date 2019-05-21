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
    beerController = new BeerController(beerModel, beerView, beersView, errorView,beersAndIdsView);

    let PostBeerByButton = document.getElementById("PostBeerButton");
    PostBeerByButton.addEventListener("click", handleClickPostBeer);

    alert(url);
    function handleClickPostBeer() {
        let form =document.getElementById("BeerInformationForm");
        let name = form.querySelector("input[name='name']").value;

        let description = form.querySelector("input[name='description']").value;

        let price =  form.querySelector("input[name='price']").value;
        price=price.replace(",", ".");

        let alcohol = form.querySelector("input[name='alcohol']").value.replace(",", ".");

        let image = form.querySelector("input[name='imageFile']").files[0];


        beerController.addBeer(name,description,price,alcohol,image);
    }
}



