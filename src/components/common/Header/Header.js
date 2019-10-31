import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header className="header">
            <div className="container">
                <NavLink className="title" to="/">Шагометр на тестовое задание</NavLink>
            </div>
        </header>
    )
}

export default Header;
