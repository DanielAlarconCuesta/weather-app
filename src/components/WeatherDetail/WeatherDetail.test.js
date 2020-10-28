import React from 'react';

import WeatherDetail from "./WeatherDetail.js";

import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import { dublin } from '../../Services/OpenWeather/mockWeather.js';

configure({adapter: new Adapter()});
let weatherDetail;

test('testing WeatherDetails with no properties', () => {
    weatherDetail = mount(<WeatherDetail key="empty" />);
    let noLocationProvided = weatherDetail.find('#noLocationProvided');
    expect(noLocationProvided.length).toBe(1);
});

test('testing WeatherDetails with city property and successful weather request', async () => {
    weatherDetail = mount(<WeatherDetail key="city" city="dublin" />);
    await weatherDetail.setState({weather: dublin});
    let locationProvided = weatherDetail.find('#locationProvided');
    expect(locationProvided.length).toBe(1);
});

test('testing WeatherDetails with city property and unsuccessful weather request', () => {
    weatherDetail = mount(<WeatherDetail key="city" city="dublin" />);
    let noLocationProvided = weatherDetail.find('#noLocationProvided');
    expect(noLocationProvided.length).toBe(1);
});