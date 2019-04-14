"use strict";

export default class BeerModel {
    constructor(url) {
        this.url = url;
    }

    getAllBeers() {
        return fetch(this.url, {method: "GET"})
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Something went wrong: " + response.status);
                }

                return response.json();
            });
    }

    getBeerById(id) {
        return fetch(this.url, {method: "GET"})
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Something went wrong: " + response.status);
                }

                return response.json();
            });
    }
}
