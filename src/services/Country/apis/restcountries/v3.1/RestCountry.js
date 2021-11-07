import { BaseModel } from 'sjs-base-model';

class RestCountry extends BaseModel {
    
    name = {
        common: "",
        official: "",
        nativeName: {}
    };
    tld = [];
    cca2 = "";
    ccn3 = "";
    cca3 = "";
    cioc = "";
    independent = null;
    status = null;
    unMember = null;
    currencies = {};
    idd = {
        root: "",
        suffixes: []
    };
    capital = [];
    altSpellings = [];
    region = "";
    subregion = "";
    languages = {}; //enum
    translations = {}; //enum,
    latlng = [];
    landlocked = null;
    borders = []; //enum
    area = null;
    demonyms = {} //enum,
    flag = "";
    maps = {
        googleMaps:"",
        openStreetMaps: ""
    };
    population = null;
    gini = {};
    fifa = "";
    car = {
        signs: [],
        side: ""
    };
    timezones = [];
    continents = []; //enum
    flags = {
        "png":"",
        "svg":""
    };
    coatOfArms = {
        "png":"",
        "svg":""
    };
    startOfWeek = "";
    capitalInfo = {
        latlng: []
    };
    postalCode = {
        format: "",
        regex: ""
    };

    constructor(data) {
        super();
        this.update(data);
    }
}

export default RestCountry;
