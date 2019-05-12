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
    addNewBeer(name, description,price, alcohol, imageFile){
        validate(name, description,price, alcohol);

        let beer = {name:name, description:description , price :price, alcohol:alcohol, image:readFile(imageFile)}
        return fetch(this.url,
            {method: "post",
                body : JSON.stringify(beer) } )
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Something went wrong: " + response.status);
                }
                return response.json();
            })
            .catch(error => console.error('Error:', error));

    }


    /*
    //zo kunnen we rechtstreeks een afbeelding verzenden en dan in de server omzetten naar base64
    addNewBeer(name, description,price, alcohol, imageFile){
        let beer = {name:name, description:description , price :price, alcohol:alcohol, image:imageFile}
        let formData = new FormData();
        let fileField = document.querySelector('input[type="file"]');

        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('alcohol', alcohol);
        formData.append('image', fileField.files[0])
        return fetch(this.url,
            {method: "post",
                body :formData } )
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Something went wrong: " + response.status);
                }

                return response.json();
            }).
            then(response => console.log('Success:'))
            .catch(error => console.error('Error:', error));
    }*/
    putBeer(beerId,name, description,price, alcohol, imageFile){
        validate(name, description,price, alcohol);
        let beer = {id:beerId,name:name, description:description , price :price, alcohol:alcohol, image:readFile(imageFile)}
        return fetch(this.url,
            {method: "post",
                body : JSON.stringify(beer) } )
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Something went wrong: " + response.status);
                }

                return response.json();
            })
            .catch(error => console.error('Error:', error));
    }
}
//dit zou de image moeten omzetten naar base64
function readFile(imageFile) {
        let FR= new FileReader();
        return  FR.readAsDataURL( this.files[0] );

}
function validate(name, description, price,alcohol ){
    if (!(typeof name == 'string' && name.length >= 5)) {
        return Promise.reject(new Error("name moet een string met minstens 5 karakters zijn"));
    }if (!(typeof description == 'string' && description.length >= 5)) {
        return Promise.reject(new Error("description moet een string met minstens 5 karakters zijn"));
    }

}