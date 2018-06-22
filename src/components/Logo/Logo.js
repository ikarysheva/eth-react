import React from 'react';

import reactLogo from '../../assets/logo.svg';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={reactLogo} alt="React Logo" />
    </div>
);

export default logo;