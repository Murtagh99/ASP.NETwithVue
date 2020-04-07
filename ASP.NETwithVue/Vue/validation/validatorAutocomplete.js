export default class ValidatorAutocomplete {

    constructor() {

    }

    validate(searchString, selectedObject, rules) {
        switch (true) {
            case rules["data-val-requiredif"] && (!searchString || searchString !== selectedObject.Name):
                return rules["data-val-requiredif"];
            case searchString && (searchString.length > rules["data-val-length-max"]):
                return rules["data-val-length"];
        }
    }
}