"use strict";

export default class beerController {
    constructor(beerModel, beerView, beersView, errorView, beersAndIdsView) {
        this.beerModel = beerModel;
        this.beerView = beerView;
        this.beersView = beersView;
        this.errorView = errorView;
        this.beersAndIdsView = beersAndIdsView;
    }

    listBeers() {
        let promise = this.beerModel.getAllBeers();
        promise.then((beer) => {
            this.beersView.show({beers: beer});
        }).catch(error => {
            this.errorView.show({error: error.message});
        });
    };

    listBeersAndIds(output) {
        let promise = this.beerModel.getAllBeers();
        promise.then((beer) => {
            this.beersAndIdsView.showOutput({beers: beer}, output);
        }).catch(error => {
            this.errorView.show({error: error.message});
        });
    };

    listBeer(id, form) {
        let promise = this.beerModel.getBeerById(id);
        promise.then((beer) => {
            this.beerView.fill({beer: beer}, form);
        }).catch(error => {
            this.errorView.show({error: error.message});
        });
    };

    addBeer(name, description, price, alcohol, imageFile) {
        let promise = this.beerModel.addNewBeer(name, description, price, alcohol, imageFile);
        promise.then((beer) => {
           this.beerView.show({beer: beer.name});
        }).catch(error => {
            this.errorView.show({error: error.message});
        });
    };

    putBeer(id, name, description, price, alcohol, imageFile, form) {
        let promise = this.beerModel.putBeer(id, name, description, price, alcohol, imageFile);
        promise.then((beer) => {
            this.beerView.fill({beer: beer}, form);
        }).catch(error => {
            this.errorView.show({error: error.message});
        });
    };
}


