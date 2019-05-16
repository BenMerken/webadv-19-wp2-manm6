"use strict";

import BeerController from './controllers/BeerController';
import BeerModel from './models/BeerModel';
import ErrorView from './views/ErrorView';
import BeerView from './views/BeerView';
import BeersView from './views/BeersView';

let url = 'localhost:60/api/beers/';

let beerView;
let beersView;
let errorView;
let beerModel;
let beerController;

window.addEventListener("load", handleWindowLoad);

function handleWindowLoad() {
    beerView = new BeerView();
    beersView = new BeersView();
    errorView = new ErrorView();
    beerModel = new BeerModel(url);
    beerController = new BeerController(beerModel, beerView, beersView, errorView);


    //voeg hier de event handlers toe aan knoppen etc en definieer hieronder de functies

    let GETAllBeersButton = document.getElementById("getAllBeersButton");
    GETAllBeersButton.addEventListener("click", handleClickGetAllBeers);
    let GETBeerByIdButton = document.getElementById("getBeerByIdButton");
    GETBeerByIdButton.addEventListener("click", handleClickGetBeerById);
    let PUTBeerButton = document.getElementById("putBeerButton");
    PUTBeerButton.addEventListener("click", handleClickPutBeer);
    let POSTBeerButton = document.getElementById("postBeerButton");
    POSTBeerButton.addEventListener("click", handleClickPostBeer);

}

//deze functies kunnen gebruikt worden
function handleClickGetAllBeers() {
    beerController.listBeers();
}

function handleClickGetBeerById() {
    let id = document.getElementById("getBeerId").value;
    beerController.listBeer(id);
}

function handleClickPostBeer() {
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let alcohol = document.getElementById("alcohol").value;
    let image = document.getElementById("imageFile").files[0];
    beerController.addNewBeer(name, description, price, alcohol, image);
}

function handleClickPutBeer() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let alcohol = document.getElementById("alcohol").value;
    let image = document.getElementById("imageFile").files[0];
    beerController.putBeer(id, name, description, price, alcohol, image);
}
