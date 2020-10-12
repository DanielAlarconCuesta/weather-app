import React, { Component } from 'react';
import './WeatherPanel.css';
import logo from './logo.png';

import Searcher from '../Searcher/Searcher';
import WeatherDetail from '../WeatherDetail/WeatherDetail';

//password: TestingOpenweathermap
const API_KEY = "5f974566cd22a48de212a98c614a8bdd";

export default class WeatherPanel extends Component {

    constructor(...props) {
        super(...props);

        this.state = {
            search: '',
            coordinates: null,
            city: null
        };

        this.handdleSearcherOnChange = this.handdleSearcherOnChange.bind(this);

        this.renderSearcher = this.renderSearcher.bind(this);
        this.renderDetailedWeather = this.renderDetailedWeather.bind(this);
    }

    componentDidMount() {
        if (navigator.geolocation) {

            let successFunction = (position) => {
                this.setState({
                    coordinates: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    }
                });
            }

            navigator.geolocation.getCurrentPosition(successFunction);
        }
    }

    handdleSearcherOnChange(event) {

        this.setState({
            search: event.currentTarget.value
        });

        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.setState({city: this.state.search});
            clearTimeout(this.timeout);
        }, 500);
    }

    renderSearcher() {

        let { search } = this.state;
        let handdleSearcherOnChange = this.handdleSearcherOnChange;
        
        return (
            <header className="row">
                <div className="col-sm-2 col-md-2 col-lg-4 col-xl-4">
                    <div className="header-logo">
                        <img 
                            className="responsive" 
                            src={logo} 
                            alt="logo" 
                        />
                    </div>
                </div>

                <div className="col-sm-10 col-md-10 col-lg-8 col-xl-8">
                    <Searcher 
                        onChange={handdleSearcherOnChange} 
                        value={search}
                    />
                </div>
            </header>
        )
    }

    renderDetailedWeather() {
        
        let { city, coordinates } = this.state;

        if (city) {
            return (
                
                <WeatherDetail 
                    key = "city"
                    city = {city}
                />
            )
        } else if (coordinates 
            && coordinates.lat 
            && coordinates.lon) {
        
            return (
                <WeatherDetail 
                    key = "coordinates"
                    lat = {coordinates.lat}
                    lon = {coordinates.lon}
                />
            )
        } else {
            return (
                <WeatherDetail 
                    key = "empty" 
                />
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderSearcher()}
                {this.renderDetailedWeather()}
            </div>
        )
    }
}