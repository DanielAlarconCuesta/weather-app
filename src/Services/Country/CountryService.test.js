import CountryService from "./CountryService.js";

import { america, spain} from "./mockCountries.js";


test('testing getCountryByCode', async () => {
    let countryService = new CountryService();
    let country;
    
    country = await countryService.getCountryByCode({code: "ES"});
    expect(country.hasOwnProperty("alpha2Code") || country.hasOwnProperty("alpha3Code")).toBeTruthy();

    country = await countryService.getCountryByCode("");
    expect(country).toBeInstanceOf(Error);

    country = await countryService.getCountryByCode({});
    expect(country).toBeInstanceOf(Error);
    
    country = await countryService.getCountryByCode(undefined);
    expect(country).toBeInstanceOf(Error);

    country = await countryService.getCountryByCode(null);
    expect(country).toBeInstanceOf(Error);

    country = await countryService.getCountryByCode("srgerghdrhsdafhs");
    expect(country).toBeInstanceOf(Error);

});

test('testing handleResponseGetCountry', () => {
    let countryService = new CountryService();
    let country;

    country = countryService.handleResponseGetCountry({status: true, country: america});
    expect(typeof country).toBe('object');
    expect(country.hasOwnProperty("alpha2Code") || country.hasOwnProperty("alpha3Code")).toBeTruthy();

    country = countryService.handleResponseGetCountry({status: true, country: spain});
    expect(typeof country).toBe('object');
    expect(country.hasOwnProperty("alpha2Code") || country.hasOwnProperty("alpha3Code")).toBeTruthy();

    country = countryService.handleResponseGetCountry({status: false, country: america});
    expect(country instanceof Error).toBeTruthy();

    country = countryService.handleResponseGetCountry({status: undefined, country: america});
    expect(country instanceof Error).toBeTruthy();

    country = countryService.handleResponseGetCountry({status: null, country: spain});
    expect(country instanceof Error).toBeTruthy();

    country = countryService.handleResponseGetCountry({status: true, country: undefined});
    expect(country instanceof Error).toBeTruthy();

    country = countryService.handleResponseGetCountry({status: true, country: null});
    expect(country instanceof Error).toBeTruthy();
    
});


