import React from 'react';
import './Searcher.css';

export default function Searcher({ onChange, value }) {

    return (
        <div className="searcher-bar">
            <input className="form-control" type="text" placeholder="type a city" aria-label="type a city" onChange={onChange} value={value}/>
        </div>
    );

}