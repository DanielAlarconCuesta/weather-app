import React, { Component } from 'react';
import './WeatherPanel.css';

import Searcher from '../Searcher/Searcher.js';
import WeatherDetail from '../WeatherDetail/WeatherDetail.js';

import history from '../../history.js';

const API_KEY = "5f974566cd22a48de212a98c614a8bdd";

export default class WeatherPanel extends Component {

    constructor(...props) {
        super(...props);

        this.state = {
            search: '',
            coordinates: null,
            city: null,
            units: "metric",
            unitsSymbol: "ºC"
        };

        this.handdleSearcherOnChange = this.handdleSearcherOnChange.bind(this);
        this.handleClickMetric = this.handleClickMetric.bind(this);
        this.handleClickImperial = this.handleClickImperial.bind(this);

        this.renderSearcher = this.renderSearcher.bind(this);
        this.renderDetailedWeather = this.renderDetailedWeather.bind(this);
        this.resetComponent= this.resetComponent.bind(this);
    }

    componentDidMount() {
        const { cityName } = this.props.match && this.props.match.params ? this.props.match.params : {};
       
        if (typeof(cityName) == "string") {
            history.push(`/city/${cityName}`);
            this.state.city = cityName;

        } else {
            history.push(`/home`);
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
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.city != this.state.city) {
            if (this.state.city == null) {
                history.push(`/home/`);
            
            } else {
                history.push(`/city/${this.state.city}`);
            }
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

    handleClickMetric() {
        if (this.state.units !== "metric") {
            this.setState({units: "metric", unitsSymbol: 'ºC'});
        }
    }

    handleClickImperial() {
        if (this.state.units !== "imperial") {
            this.setState({units: "imperial", unitsSymbol: 'ºF'});
        }
    }

    resetComponent() {
        this.setState({
            search: '',
            city: null,
        });
    }

    renderSearcher() {

        let { search } = this.state;
        let handdleSearcherOnChange = this.handdleSearcherOnChange;
        let resetComponent = this.resetComponent;
        
        return (
            <Searcher
                resetComponent={this.resetComponent}
                onChange={handdleSearcherOnChange} 
                value={search}
            />
        )
    }

    renderDetailedWeather() {
        let { city, coordinates, unitsSymbol, units } = this.state;

        if (city) {

            return (
                <WeatherDetail 
                    key = "city"
                    city = {city}
                    handleClickMetric = {this.handleClickMetric}
                    handleClickImperial = {this.handleClickImperial}
                    unitsSymbol = {unitsSymbol}
                    units = {units}
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
                    handleClickMetric = {this.handleClickMetric}
                    handleClickImperial = {this.handleClickImperial}
                    unitsSymbol = {unitsSymbol}
                    units = {units}
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