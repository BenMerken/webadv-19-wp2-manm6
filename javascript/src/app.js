"use strict";

import BeerController from './controller/BeerController';
import BeerModel from './model/BeerModel';
import ErrorView from './view/ErrorView';
import BeerView from './view/BeerView';
import BeersView from './view/BeersView';

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


    //voeg hier de event handlers toe aan knoppen etc en defineer hieronder de functies

}

//deze functies kunnen gebruikt worden
function handleClickGetAllPersons() {
    beerController.listPersons();
}

function handleClickAddBeer() {
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let alcohol = document.getElementById("alcohol").value;
    let image = document.getElementById("imageFile").files[0];
    beerController.addNewBeer(name,description,price,alcohol,image);
}

function handleClickPUTBeer() {
    let id = document.getElementById("txtid").value;
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let alcohol = document.getElementById("alcohol").value;
    let image = document.getElementById("imageFile").files[0];
    beerController.putBeer(id,name,description,price,alcohol, image);
}
