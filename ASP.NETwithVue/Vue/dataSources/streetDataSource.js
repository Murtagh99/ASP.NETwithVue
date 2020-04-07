import SearchDataSource from "./searchDataSource";
import axios from 'axios'

export default class StreetDataSource extends SearchDataSource {

    constructor(city) {
        super();
        this.city = city ;
    }

    search(searchString) {
        
        let streets = axios.get("https://adressdaten.azurewebsites.net/api/adressdaten/Street?Name=" + searchString + "&PostCodeFK=" + this.city.PostCode,
            {
                method: 'GET'
            }

        

        ).then(j => j.data.map(i => {

            return { Street: i.name, Name: i.name }

            
        }))

        return streets;
    }

}

