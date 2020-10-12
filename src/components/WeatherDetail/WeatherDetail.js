import React, { Component } from 'react';

import CountryService from '../../Services/Country/CountryService.js';
import OpenWeatherService from '../../Services/OpenWeather/OpenWeatherService.js';
import { getFormattedTime } from '../../Utils/utils.js';

import './WeatherDetail.css';
import '../../index.css';

let style = {
    flagImg: {
        width:  170,
        height: 100,
        objectFit: 'cover'
    },
    weatherImg: {
        width: 100, 
        height: 100,
        objectFit: 'cover'
    }


};

export default class WeatherDetail extends Component {

    constructor(...props) {
        super(...props);

        this.state = {
            location: null,
            weather: null,
            secondaryTableActive: 'time'
        }

        this.getWeatherByCoordinates = this.getWeatherByCoordinates.bind(this);
        this.getWeatherByCity = this.getWeatherByCity.bind(this);

        this.countryService = new CountryService();
        this.openWeatherService = new OpenWeatherService();
    }
    
    componentDidUpdate(prevProps, prevState) {

        if (this.props.city) {

            if (this.props.city != prevProps.city) {
                this.getWeatherByCity({city: this.props.city});
            }
            
        } else if (this.props.lat && this.props.lon) {
            
            if (this.props.lat !== prevProps.lat
                && this.props.lon !== prevProps.lon) {

                this.getWeatherByCoordinates({lat: this.props.lat, lon: this.props.lon});
            }
        }
    }
    
    componentDidMount() {
        if (this.props.city) {
            this.getWeatherByCity({city: this.props.city});
            
        } else if (this.props.lat && this.props.lon) {
            this.getWeatherByCoordinates({lat: this.props.lat, lon: this.props.lon});
        }
    }

    async getWeatherByCoordinates(args) {
        let weather = await this.openWeatherService.getWeatherByCoordinates(args);

        if (weather instanceof Error) {
            console.error(weather.errorMessage);
        
        } else {
            console.log(weather);
            this.setState({weather: weather});
            this.getCountryByCode({code: weather.sys.country});
        } 
    }

    async getWeatherByCity(args) {
        let weather = await this.openWeatherService.getWeatherByCity(args);

        if (weather instanceof Error) {
            console.error(weather.errorMessage);
        
        } else {
            console.log(weather);
            this.setState({weather: weather});
            this.getCountryByCode({code: weather.sys.country});
        } 
    }

    async getCountryByCode(code) {
        
        let location = await this.countryService.getCountryByCode(code);
         
        if (!(location instanceof Error)) {
            console.log(location);
            this.setState({location: location});

        } else {
            console.error(location.message);
        }

    
    }

    renderWeather() {
        return(
            <h1>this is the weather</h1>
        )
    }

    renderNoLocationProvided() {
        return (
            <h1>No location provided</h1>
        )
    }

    renderWeatherDetail() {

        const { location, weather, secondaryTableActive } = this.state;

        return (
            <div className="container weatherDetailContainer">
                
                <div className="row">
                    <div className="col-sm-12 col-md-3 col-lg-2">
                        <img 
                            src = {
                                location && location.flag 
                                ? location.flag 
                                : "/img/imageNotFound.png" 
                            } 
                            alt = {
                                (
                                    location && location.demonym 
                                    ? location.demonym 
                                    : "country"
                                ) + " flag"} 
                            style = {style.flagImg}
                        />
                    </div>

                    <div className="col-sm-12 col-md-9 col-lg-10 marginBottom5Rem">
                        <h2>
                            {weather.name}
                            {
                                location && location.name 
                                ? ` - ${location.name}` 
                                : ''
                            } 
                        </h2> 
                        <h4>
                            {
                                location && location.nativeName 
                                ? `(${location.nativeName})` 
                                : "" 
                            }
                        </h4>
                    </div>

                    <div className="col-lg-2">
                        <div className="textAlignRight">
                            <img 
                                src={
                                    weather.weather[0] && weather.weather[0].icon 
                                    ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                                    : '/img/imageNotFoundSquare.png'
                                } 
                                style={style.weatherImg}
                                alt={`${weather.weather[0].description} image`} 
                            />
                        </div>
                    </div>

                    <div className="col-lg-10">
                        <h3 className="paddingTop2Rem fontFamilyMonoSpace fontSize25px">
                            {
                                weather.main && weather.main.temp
                                ? `${weather.main.temp} ºC ` 
                                : ''
                            }
                            {
                                weather.weather[0] && weather.weather[0].description
                                ? weather.weather[0].description 
                                : ''
                            }
                        </h3>
                    </div>

                    <div className="col-lg-7">
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <td className="width30 ">Feels like: </td>
                                    <td>
                                        {
                                            weather.main && weather.main.feels_like
                                            ? `${weather.main.feels_like} ºC`
                                            : ''
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Atmospheric pressure: </td>
                                    <td>
                                        {
                                            weather.main && weather.main.pressure
                                            ? weather.main.pressure
                                            : ''
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Minimum temperature: </td>
                                    <td>
                                        {
                                            weather.main && weather.main.temp_min
                                            ? `${weather.main.temp_min} ºC`
                                            : ''
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Maximum temperature: </td>
                                    <td>
                                        {
                                            weather.main && weather.main.temp_max
                                            ? `${weather.main.temp_max} ºC`
                                            : ''
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Humidity: </td>
                                    <td>
                                        {
                                            weather.main && weather.main.humidity 
                                            ? `${weather.main.humidity} %`
                                            : ''
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-lg-5 marginBottom5Rem">
                        <ul className="nav nav-tabs">
                        <li className="nav-item">
                                <a 
                                    className={secondaryTableActive == 'time' ? ' nav-link active' : 'nav-link'} 
                                    onClick={() => this.setState({secondaryTableActive: 'time'})}
                                > 
                                    Time
                                </a>
                            </li>
                            <li className="nav-item">
                                <a 
                                    className={secondaryTableActive == 'wind' ? ' nav-link active' : 'nav-link'} 
                                    onClick={() => this.setState({secondaryTableActive: 'wind'})}
                                >
                                    Wind
                                </a>
                            </li>
                        </ul>

                    <div className={secondaryTableActive != 'wind' ? 'displayNone' : ''}>
                        <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <td className="width30 ">Degrees: </td>
                                        <td>
                                            {   
                                                weather.wind && weather.wind.deg
                                                ? `${weather.wind.deg} º`
                                                : ''
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="width30 ">Speed: </td>
                                        <td>
                                            {
                                                weather.wind && weather.wind.speed
                                                ? `${weather.wind.speed} m/s`
                                                : ''
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                        </table>
                    </div>

                    <div className={secondaryTableActive != 'time' ? 'displayNone' : ''}>
                        <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <td className="width30 ">Sunrise: </td>
                                        <td>
                                            {
                                                weather.timezone && weather.sys && weather.sys.sunrise
                                                ? getFormattedTime({timestamp: weather.sys.sunrise, timezone: weather.timezone})
                                                : ''
                                            }
                                            <img 
                                                src="/img/sunrise.png" 
                                                width="50" 
                                                height="50" 
                                                alt="sunrise" 
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="width30 ">Sunset: </td>
                                        <td>
                                            {
                                                weather.timezone && weather.sys && weather.sys.sunset
                                                ? getFormattedTime({timestamp: weather.sys.sunset, timezone: weather.timezone})
                                                : ''
                                            }
                                            <img 
                                                src="/img/sunset.png" 
                                                width="50" 
                                                height="50" 
                                                alt="sunset" 
                                            />    
                                        </td>
                                    </tr>
                                </tbody>
                        </table>
                    </div>

                    
                
                </div>
            </div>
            </div>
        )
    }

    render() {
        
       if (this.state.weather) {
            return this.renderWeatherDetail();
        
        } else {
            return this.renderNoLocationProvided();
        }
    }



}