import React from 'react';
import './App.css';
import WeatherPanel from '../WeatherPanel/WeatherPanel';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container">
        <WeatherPanel />
    </div>
  );
}

export default App;
