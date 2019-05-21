"use strict";

export default class View {

    constructor() {
        this._outputElement = document.getElementById('output');

    }

    show(data) {

        while (this._outputElement.hasChildNodes()) {
            this._outputElement.removeChild(this._outputElement.firstChild);
        }
        //let textNode = document.createTextNode(data);
        //this.outputElement.appendChild(textnode);
        this._outputElement.appendChild(data);
    }

    get outputElement() {
        return this._outputElement;
    }

    set outputElement(value) {
        this._outputElement = value;
    }
}



