import { isNull } from '../../utils/utils.js';

import RestCountry from './apis/restcountries/v3.1/RestCountry';
import * as RestCountriesParser from './apis/restcountries/v3.1/Parser';
import * as RestCountriesEnvironment from './apis/restcountries/v3.1/Environment';
//import { america } from './apis/restcountries/v3.1/mockRestCountries';

export default class CountryService {

    constructor() {
        this.host = RestCountriesEnvironment.HOST;
        this.countryCodePath = RestCountriesEnvironment.COUNTRY_CODE_PATH;
    }

    async getCountryByCode(data = {}) {
        //return america;
        let error = Error("No country code specified"),
            { code } = data;
        
        if (isNull(code)) {
            return error;
        }

        let ok = false,
            url = `${this.host}${this.countryCodePath}${code}`,
            response = await fetch(url)
                .then(response => {
                    if (response.ok) {
                        ok = response.ok; 
                        return response.json();
                    }

                    return response;
                
                }).catch(error => error)

        
        if (!ok || !response) {
            return this.handleErrorGetCountry(response);
        }
        
        return this.handleResponseGetCountry(response);
        
    }
    
    handleResponseGetCountry(data) {

        try {

            if (isNull(data) || data.length == 0) {
                return this.handleErrorGetCountry();
            }
            
            return RestCountriesParser.restCountryToCountry(new RestCountry(data[0]));

        } catch(exception) {
            return this.handleErrorGetCountry();
        }

    }

    handleErrorGetCountry(error) {
        return Error("Country info can not be reached at the moment");
    }
    
}
