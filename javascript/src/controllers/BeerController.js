"use strict";

export default class beerController {
    constructor(beerModel, beerView, beersView, errorView) {
        this.beerModel = beerModel;
        this.beerView = beerView;
        this.beersView = beersView;
        this.errorView = errorView;
    }
}
