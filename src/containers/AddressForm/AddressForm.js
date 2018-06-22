import React, { Component } from 'react';
import { connect } from 'react-redux';



import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './AddressForm.css';

import { updateObject, checkValidity } from '../../shared/utility';

import * as actions from '../../store/actions/address';



export class AddressForm extends Component {
    state = {
        controls: {
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter wallet address'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 40,
                    maxLength: 42
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    inputChangedHandler = (event, controlName) => {

        const updatedControl = updateObject(this.state.controls[controlName], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true
        });
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updatedControl
        });

        let formIsValid = true;
        for (let controlName in updatedControls) {
            formIsValid = updatedControls[controlName].valid && formIsValid;
        }
        this.setState({ controls: updatedControls, formIsValid: formIsValid });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onCheckAddress(this.state.controls.address.value);
    }

    successConfirmedHandler = () => {
        this.props.onCheckAddressComplete();
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));
        // const spinner = this.props.loading ? <Spinner /> : null;

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p className={styles.error} id="error" >{this.props.error}</p>
            );
        }


        return (
            <Aux>

                <div className={styles.AddressForm}>
                    {errorMessage}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button disabled={!this.state.formIsValid} btnType="Success">NEXT</Button>
                    </form>
                </div>
                <Modal
                    show={this.props.isValid}
                    modalClosed={this.successConfirmedHandler}>
                    Address is Valid
            </Modal>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.addr.error,
        isValid: state.addr.isValid
    }
};


const mapDispatchToProps = dispatch => {
    return {
        onCheckAddress: (address) => dispatch(actions.checkAddress(address)),
        onCheckAddressComplete: () => dispatch(actions.checkAddressComplete()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddressForm)
