import React from 'react';
import './Searcher.css';

import { Link } from 'react-router-dom';

export default function Searcher(props) {

    const {onChange, value} = props;

    return (
        <header className="row">
                <div className="logoDiv col-sm-12 col-md-12 col-lg-3 col-xl-3">
                    <div className="header-logo">
                        <Link to={{
                                pathname: '/home'
                            }}
                            onClick = {props.resetComponent}
                        >
                            <img 
                                className="responsive" 
                                src={"/img/logo.png"} 
                                alt="logo" 
                            />
                        </Link>
                    </div>
                </div>

                <div className="navbarDiv col-sm-12 col-md-12 col-lg-9 col-xl-9">
                    
                    <div className="searcher-bar">
                        <input className="form-control" type="text" placeholder="type a city" aria-label="type a city" onChange={onChange} value={value}/>
                    </div>
                </div>
            </header>








        
    );

}