import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CreateAccount from './CreateAccount.js'

class App extends Component {

  onCreateAccount() {
    alert('Account Created');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <CreateAccount onCreateAccount={this.onCreateAccount}/>
      </div>
    );
  }
}

export default App;
