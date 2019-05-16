"use strict";
import View from './View';

export default class PersonView extends View {

    show(data) {
        let beer = data.beer;
        let output = beer.id + " " + beer.name + "\n";
        super.show(output);
    }
}
