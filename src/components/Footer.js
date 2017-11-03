import React from 'react';
import FilterLink from './FilterLink';

const Footer = () => (
    <p>
    Show: 
        <FilterLink filter='all'>ALL</FilterLink>{' '} 
        <FilterLink filter='complete'>COMPLETED</FilterLink>{' '}
        <FilterLink filter='active'>ACTIVE</FilterLink>
    </p>
)

export default Footer;