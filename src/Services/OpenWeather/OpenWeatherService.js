import { isNull, handleError } from '../../utils/utils.js';
//import { dublin } from './mockWeather.js';

export default class OpenWeatherService {
    constructor() {
        const API_KEY = "5f974566cd22a48de212a98c614a8bdd";

        this.host = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
        this.latPath = '&lat=';
        this.lonPath = '&lon=';
        this.unitsPath = "&units=";
        this.cityPath = "&q=";

        this.defaultUnits = "metric";
    }

    async getWeatherByCoordinates(args) {
        //return dublin;

        let error = Error("No weather coordinates specified");
        let {lat, lon, units} = args || {};


        if (isNull(lat) || isNull(lon)) {
            return error;
        }

        if (typeof(lat) != "number" || typeof(lat) != "number") {

            try {
                lat = parseInt(lat);
                lon = parseInt(lon);
                
            } catch (exception) {
                return Error("Coordinates are not well formed");
            }

        }

        if (isNull(units)) units = this.defaultUnits;

        let url = this.host + this.latPath + lat + this.lonPath + lon + this.unitsPath + units;
        let weather, status;

        await fetch(url)
        .then(response => {
            status = response.ok;
            return response.json()
            
        }).then(response => weather = response)
        .catch(error => status = error.ok);

        return this.handleGetWeather({status, weather});
        

    }

    async getWeatherByCity(args) {
        //return dublin;

        let error = Error("No city specified");
        let {city, units} = args || {};


        if (isNull(city)) {
            return error;
        }

        if (isNull(units)) units = this.defaultUnits;

        let url = this.host + this.cityPath + city + this.unitsPath + units;
        let weather, status;

        await fetch(url)
        .then(response => {
            status = response.ok;
            return response.json()
            
        }).then(response => weather = response)
        .catch(error => status = error.ok);

        return this.handleGetWeather({status, weather});
        
    }
    
    handleGetWeather(args) {
        let error = Error("Weather is not available at the moment");
        let {status, weather} = args || {};

        if (isNull(status) || isNull(weather)) {
            return error;
        }

        switch(status) {
            case true: {
                let isWeatherFound = weather.main ? weather.main.temp : false; 

                if (!isWeatherFound) {
                    return error;
                }

                return weather;
            }
            default: {
                return error;
            }
        }
    }
}
