import {NavLink} from "react-router-dom";
import React from 'react';

function Navbar(props) {
    return (
        <nav>
            <div className="nav-wrapper">
                <NavLink to='/' className="brand-logo">Logo</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/">Главная</NavLink></li>
                    <li><NavLink to="/editor">Редактор</NavLink></li>
                    <li><NavLink to="/calculator">О нас</NavLink></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;