import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => (
    <p>
    Show: 
        <NavLink exact to='/'>ALL</NavLink>{' '}
        <NavLink to='/active'>ACTIVE</NavLink>{' '}
        <NavLink to='/completed'>COMPLETED</NavLink>{' '}
    </p>
)

export default Footer;