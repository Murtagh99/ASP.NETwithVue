import axios from 'axios';
import SearchDataSource from "./searchDataSource";

export default class CityDataSource extends SearchDataSource {
    constructor() {
        super();
    }
    search(searchString) {
        let re = /^\d+/
        let postCode;

        if (postCode = searchString.match(re)) {
            let city = searchString.substring(postCode[0].length).trim();

            let cities = axios.get("https://adressdaten.azurewebsites.net/api/adressdaten/City?PostCode=" + postCode[0],

                {
                    method: 'GET'
                }
            ).then(j => j.data.map(i => {

                return { PostCode: i.postCode, City: i.name, Name: i.postCode + ' ' + i.name }
            }))


            return cities;

        }

        else {

            let cities = axios.get("https://adressdaten.azurewebsites.net/api/adressdaten/City?Name=" + searchString,

                {
                    method: 'GET'
                }
            ).then(j => j.data.map(i => {

                return { PostCode: i.postCode, City: i.name, Name: i.postCode + ' ' + i.name }
            }))

            return cities;

        }

    }
}








