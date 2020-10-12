import { isNull } from '../../Utils/utils.js';
import { america } from './mockCountries.js';
export default class CountryService {

    constructor() {
        this.host = 'https://restcountries.eu/rest/v2';
        this.countryCodePath = '/alpha/';
    }


    async getCountryByCode(args) {
        //return america;
        
        let error = Error("No country code specified");
        let { code } = args || {};
        
        if (isNull(code)) {
            return error;
        }

        let url = this.host + this.countryCodePath + code;
        let country, status; 
        
        await fetch(url)
             .then(response => {
                 status = response.ok;
                 return response.json()
                 
            }).then(response => country = response)
            .catch(error => status = error.ok);

        return this.handleResponseGetCountry({status, country});
        
    }

    handleResponseGetCountry(args) {
        let error = Error("Country info can not be reached at the moment");
        let { status, country } = args || {};

        if (isNull(status) || isNull(country)) {
            return error;
        }

        switch (status) {
            case true:
                
                if (!country.hasOwnProperty("alpha2Code")) {
                    return error;
                }

                return country;
                break;

            default:
                return error;
                break;
        }
    }
}