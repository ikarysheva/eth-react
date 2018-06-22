import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Header from '../../components/Navigation/Header/Header';


class Layout extends Component {

    render() {
        return (
            <Aux>
                <Header />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
};


export default Layout;