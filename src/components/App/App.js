import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import WeatherPanel from '../WeatherPanel/WeatherPanel';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Redirect
          from="/"
          to="/home" 
        />
        <Switch>
          <Route
            path="/home"
            render={() => <WeatherPanel city={null} />}
          />
          <Route
            path="/city/:cityName"
            component={WeatherPanel} 
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
