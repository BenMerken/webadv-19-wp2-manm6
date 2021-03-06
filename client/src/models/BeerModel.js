"use strict";

export default class BeerModel {
    constructor(url) {
        this.url = url;
    }

    getAllBeers() {
        let response = fetch(this.url, {method: "GET"})
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Something went wrong: " + response.status);
                }

                return response.json();
            });
        return response;
    }

    getAllBeersPagination(index) {
        let response = fetch(this.url, {method: "GET"})
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Something went wrong: " + response.status);
                }

                return response.json();
            });
        return response.slice(index, index + 3);
    }


    getBeerById(id) {
        return fetch(this.url + "/" + id, {method: "GET"})
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Something went wrong: " + response.status);
                }

                return response.json();
            });
    }


    addNewBeer(name, description, price, alcohol, imageFile) {
        validate(name, description, price, alcohol);
        let beer = {};
        beer.name = name;
        beer.description = description;
        beer.price = price;
        beer.alcohol = alcohol;
        beer.image = imageFile;

        return fetch(this.url,
            {
                method: "POST",
                body: JSON.stringify(beer)
            })
            .then((response) => {
                if (response.status !== 201) {
                    throw new Error("Something went wrong: " + response.status);
                }

                return response.json();
            })
            .catch(error => console.error('Error:', error));
    }


    putBeer(beerId, name, description, price, alcohol, imageFile) {
        validate(name, description, price, alcohol);
        let beer = {};
        beer.id = beerId;
        beer.name = name;
        beer.description = description;
        beer.price = price;
        beer.alcohol = alcohol;
        beer.image = imageFile;
        return fetch(this.url + "/" + beerId,
            {
                method: "PUT",
                body: JSON.stringify(beer)
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Something went wrong: " + response.status);
                }

                return response.json();
            })
            .then(response => alert('Successvol gewijzigd '))
            .catch(error => console.error('Error:', error));
    }
}

function validate(name, description, price, alcohol) {
    if (!(typeof name == 'string' && name.length >= 4)) {
        return Promise.reject(new Error("name moet een string met minstens 5 karakters zijn"));
    }
    if (!(typeof description == 'string' && description.length >= 4)) {
        return Promise.reject(new Error("description moet een string met minstens 5 karakters zijn"));
    }

}
