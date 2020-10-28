import React, { Component } from 'react';

import CountryService from '../../Services/Country/CountryService.js';
import OpenWeatherService from '../../Services/OpenWeather/OpenWeatherService.js';
import { getFormattedTime } from '../../Utils/utils.js';


import './WeatherDetail.css';
import '../../index.css';

let styles = {
    weatherImg: {
        width: 100, 
        height: 100,
        objectFit: 'cover'
    },
    units: {
        active: {
            color: 'orange'
        },
        inactive: {
            color: '#3b3b3b'
        },
        switcherDiv: {
            fontWeight: 'bold'
        }
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

            if (this.props.city != prevProps.city
                || (this.props.units && this.props.units != prevProps.units)) {
            
                this.getWeatherByCity({city: this.props.city, units: this.props.units});
            }

        } else if (this.props.lat && this.props.lon) {
            
            if (this.props.lat !== prevProps.lat
                || this.props.lon !== prevProps.lon
                || (this.props.units && this.props.units != prevProps.units)) {

                this.getWeatherByCoordinates({lat: this.props.lat, lon: this.props.lon, units: this.props.units});
            }
        }
    }
    
    componentDidMount() {
        if (this.props.city) {
            this.getWeatherByCity({city: this.props.city, units: this.props.units});
            
        } else if (this.props.lat && this.props.lon) {
            this.getWeatherByCoordinates({lat: this.props.lat, lon: this.props.lon, units: this.props.units});
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
         
        if (location instanceof Error) {
            console.error(location.message);

        } else {
            console.log(location);
            this.setState({location: location});
        }

    
    }

    renderNoLocationProvided() {
        return (
            <div className="noLocationProvided alert alert-danger" role="alert">
                No city matched
            </div>
        )
    }

    renderWeatherDetail() {

        const { location, weather, secondaryTableActive } = this.state;
        const { handleClickMetric, handleClickImperial, unitsSymbol, units } = this.props;

        return (
            <div id="locationProvided" className="weatherDetailContainer">
                
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-5 col-xl-5 headerFlag">
                        <img
                            className="headerFlagImg" 
                            src = {
                                location && location.flag 
                                ? location.flag 
                                : "/img/imageNotFound.png" 
                            } 
                            alt = {
                                (location && location.demonym 
                                    ? location.demonym 
                                    : "country"
                                ) + " flag"
                            }
                        />
                    </div>

                    <div className="col-sm-12 col-md-8 col-lg-7 col-xl-7 countryInfo">
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

                    <div className="col-sm-12 col-md-10 degreesDiv">
                        <div className="IconAndSwitcherDiv" style={styles.units.switcher}>
                            <div style={styles.units.switcherDiv}className="switcherDiv">
                                <a 
                                    className="cursorPointer"
                                    style={{...(units === "metric" ? styles.units.active : styles.units.inactive), marginRight: "5px"}}
                                    onClick={handleClickMetric}
                                >
                                    ºC
                                </a>
                                | 
                                <a 
                                    className="cursorPointer"
                                    style={{...(units === "imperial" ? styles.units.active : styles.units.inactive), marginLeft: "5px"}}
                                    onClick={handleClickImperial}
                                >
                                    ºF
                                </a>
                            </div>
                            <div className="weatherIconDiv">
                                <img 
                                    src={
                                        weather.weather[0] && weather.weather[0].icon 
                                        ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                                        : '/img/imageNotFoundSquare.png'
                                    }
                                    className="weatherIconImg" 
                                    alt={`${weather.weather[0].description} image`} 
                                />
                            </div>
                        </div>
                        <div className="temperatureAndDescriptionDiv">
                            <div className="weatherDescriptionDiv">
                                {
                                    weather.weather[0] && weather.weather[0].description
                                    ? weather.weather[0].description 
                                    : ''
                                }
                            </div>
                            <div className="weatherTemperature">
                                {
                                    weather.main && weather.main.temp
                                    ? `${weather.main.temp}${unitsSymbol} ` 
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                    <div className="weatherTableDiv col-sm-12 col-md-12 col-lg-7">
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <td className="width30 ">Feels like: </td>
                                    <td className="weatherDetailsValues">
                                        {
                                            weather.main && weather.main.feels_like
                                            ? `${weather.main.feels_like} º`
                                            : ''
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Atmospheric pressure: </td>
                                    <td className="weatherDetailsValues">
                                        {
                                            weather.main && weather.main.pressure
                                            ? weather.main.pressure
                                            : ''
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Minimum temperature: </td>
                                    <td className="weatherDetailsValues">
                                        {
                                            weather.main && weather.main.temp_min
                                            ? `${weather.main.temp_min} ${unitsSymbol}`
                                            : ''
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Maximum temperature: </td>
                                    <td className="weatherDetailsValues">
                                        {
                                            weather.main && weather.main.temp_max
                                            ? `${weather.main.temp_max} ${unitsSymbol}`
                                            : ''
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Humidity: </td>
                                    <td className="weatherDetailsValues">
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

                    <div className="col-sm-12 col-md-12 col-lg-5 marginBottom5Rem weatherSecondaryTable">
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
                                            <td className="weatherDetailsValues">
                                                {   
                                                    weather.wind && weather.wind.deg
                                                    ? `${weather.wind.deg} º`
                                                    : ''
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="width30 ">Speed: </td>
                                            <td className="weatherDetailsValues">
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
                                            <td className="weatherDetailsValues">
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
                                            <td className="weatherDetailsValues">
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