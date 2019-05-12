"use strict";

export default class beerController {
    constructor(beerModel, beerView, beersView, errorView) {
        this.beerModel = beerModel;
        this.beerView = beerView;
        this.beersView = beersView;
        this.errorView = errorView;
    }
    listBeers() {
        let promise = this.beerModel.getAllBeers();
        promise.then( (beer) => {
            this.beersView.show({beers: beer});
        }).catch(error => {
            this.errorView.show({error: error.message});
        });
    }
    addBeer( name,description,price, alcohol, imageFile) {
        let promise = this.beerModel.addBeer(name, description,price,alcohol,imageFile);
        promise.then( (beer) => {
            this.beerView.show({beer: beer});
        }).catch(error => {
            this.errorView.show({error: error.message});
        });
    }
    putBeer( id,name,description,price, alcohol, imageFile) {
        let promise = this.beerModel.addBeer(id,name, description,price,alcohol,imageFile);
        promise.then( (beer) => {
            this.beerView.show({beer: beer});
        }).catch(error => {
            this.errorView.show({error: error.message});
        });
    }



}
