import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/Navbar.css";

const Navbar = props => {
    return (
        <div className='navbar'>
            <h1>Tracker</h1>
            <div className='navbar__directions'>
                <NavLink className={(navData) => (navData.isActive ? 'active' : '')} to = '/'>Home</NavLink>
                <NavLink className={(navData) => (navData.isActive ? 'active' : '')} to = '/connection'>Find Connection</NavLink>
            </div>
        </div>
    );
};

export default Navbar;