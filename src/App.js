import React, { Component } from 'react';
import styles from './App.css';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import AddressForm from './containers/AddressForm/AddressForm';

import * as actions from './store/actions/contract';

import SimpleStorageContract from '../build/contracts/SimpleStorage.json';


class App extends Component {

  componentWillMount() {
    this.props.onGetWeb3Contract(SimpleStorageContract);
  }

  render() {
    return (
      <div className={styles.App}>
        <Layout>
          <AddressForm />
        </Layout>
      </div>
    );
  }


}

const mapDispatchToProps = dispatch => {
  return {
    onGetWeb3Contract: (contract) => dispatch(actions.getWeb3Contract(contract))
  };
};


export default connect(null, mapDispatchToProps)(App);
