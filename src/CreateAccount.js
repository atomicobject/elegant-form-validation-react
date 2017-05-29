import React, { Component } from 'react';
import TextView from './Util/TextView.js';
import update from 'immutability-helper';
import { run, ruleRunner } from './Validation/ruleRunner.js'
import { required, mustMatch, minLength } from './Validation/rules.js';
import $ from 'jquery';

const fieldValidations = [
  ruleRunner("firstName", "First Name", required),
  ruleRunner("emailAddress", "Email Address", required),
  ruleRunner("password1", "Password", required, minLength(6)),
  ruleRunner("password2", "Password Confirmation", mustMatch("password1", "Password"))
];

class App extends Component {

  constructor(props) {
    super(props);
    this.handleFieldChanged = this.handleFieldChanged.bind(this);
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
    this.errorFor = this.errorFor.bind(this);
    this.state = {
      showErrors: false,
      validationErrors: { },
    }
  }

  componentWillMount() {
    // Run validations on initial state
    this.setState({validationErrors: run(this.state, fieldValidations)});
  }

  errorFor(field) {
    return this.state.validationErrors[field] || "";
  }

  handleFieldChanged(field) {
    return (e) => {
      // update() is provided by React Immutability Helpers
      // https://facebook.github.io/react/docs/update.html
      let newState = update(this.state, {
        [field]: {$set: e.target.value}
      });
      newState.validationErrors = run(newState, fieldValidations);
      this.setState(newState);
    };
  }

  handleSubmitClicked() {
    this.setState({showErrors: true});
    if($.isEmptyObject(this.state.validationErrors) === false) return null;
    return this.props.onCreateAccount(this.state);
  }

  render() {
    return (
      <div className="CreateAccount">
        <h2>Create a New Account</h2>

        <TextView placeholder="First Name" showError={this.state.showErrors}
                text={this.props.firstName} onFieldChanged={this.handleFieldChanged("firstName")}
                errorText={this.errorFor("firstName")} /> 

        <TextView placeholder="Email Address" showError={this.state.showErrors}
                text={this.props.emailAddress} onFieldChanged={this.handleFieldChanged("emailAddress")}
                errorText={this.errorFor("emailAddress")} /> 

        <TextView placeholder="Password" showError={this.state.showErrors} type="password"
                  text={this.props.password1} onFieldChanged={this.handleFieldChanged("password1")}
                  errorText={this.errorFor("password1")} />

        <TextView placeholder="Confirm Password" showError={this.state.showErrors} type="password"
                  text={this.props.password2} onFieldChanged={this.handleFieldChanged("password2")}
                  errorText={this.errorFor("password2")} />
        <input id="CreateAccountButton" type='submit' value="Create Account" onClick={this.handleSubmitClicked} ></input>
      </div>
    );
  }
}

export default App;
