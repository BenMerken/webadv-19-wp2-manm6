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

    //voeg hier de event handlers toe aan knoppen etc en definieer hieronder de functies

    beerController.listBeers();
}






