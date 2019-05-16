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
    let PUTBeerButton = document.getElementById("postBeerButton");
    PUTBeerButton.addEventListener("click", handleClickPostBeer);
    let POSTBeerButton = document.getElementById("postBeerButton");
    POSTBeerButton.addEventListener("click", handleClickPostBeer);

}

//deze functies kunnen gebruikt worden
function handleClickGetAllPersons() {
    beerController.listBeers();
}

function handleClickAddBeer() {
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let alcohol = document.getElementById("alcohol").value;
    let image = document.getElementById("imageFile").files[0];
    beerController.addNewBeer(name, description, price, alcohol, image);
}

function handleClickPUTBeer() {
    let id = document.getElementById("txtid").value;
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let alcohol = document.getElementById("alcohol").value;
    let image = document.getElementById("imageFile").files[0];
    beerController.putBeer(id, name, description, price, alcohol, image);
}
