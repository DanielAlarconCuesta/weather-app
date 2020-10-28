import React from 'react';

import WeatherPanel from "./WeatherPanel.js";
import WeatherDetail from "../WeatherDetail/WeatherDetail.js";
import Searcher from "../Searcher/Searcher.js";

import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render, configure } from 'enzyme';

configure({adapter: new Adapter()});
let weatherPanel;


beforeEach(() => {
    weatherPanel = mount(<WeatherPanel />);
});


test('should render one <Searcher>', () => {
    expect(weatherPanel.find(Searcher)).toHaveLength(1);
});

test('should render one <WeatherDetail>', () => {
    expect(weatherPanel.find(WeatherDetail)).toHaveLength(1);
});