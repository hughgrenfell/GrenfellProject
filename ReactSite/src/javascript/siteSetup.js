import React from 'react';
import logo from '../images/caribou_negative.png';
import { Link } from 'react-router-dom';
import '../css/styles.css';

export function Header() {
    return (
      <header className="site-header" id="site-header">
        <div className="site-name"> 
            <div className="screen-reader-text"><span>The Grenfell Project</span></div> 
        </div>
        <div className="logo"><img src={logo} alt="Caribou Logo"/></div>  
        <div className="header-site-menu"> 
            <nav className="main-nav" id="main-nav">
                <Link to="/">Home</Link>
                <Link to="projects">Projects</Link>
                <a href="https://github.com/hughgrenfell" target="_blank" rel="noreferrer">GitHub</a>
            </nav>
        </div>
      </header>
    );
}