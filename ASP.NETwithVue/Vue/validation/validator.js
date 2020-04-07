export default class Validator {

    constructor() {

    }

    validate(searchString, rules) {

        let re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        switch (true) {
            case rules.minlength && searchString.length < rules.minlength:
                return "Das Feld muss mindestens " + rules.minlength + " Stellen besitzen.";
                break;
            case rules.required && searchString.length === 0:
                return "Dies ist ein Pflichtfeld.";
                break;
            case rules.regex && !rules.regex.test(searchString):
                return rules.regexMeldung;
                break;
            case rules.email && !re.test(searchString):
                return "Bitte gib eine gültige Mail ein.";
                break;
            case !eval(rules.when):
                return rules.whenMeldung;

        }
    }
}
