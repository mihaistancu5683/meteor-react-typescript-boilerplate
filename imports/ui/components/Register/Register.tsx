import * as React from 'react';
import { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationName: '',
      registrationEmail: '',
      registrationPassword: '',
      registrationPlateNo: '',
      error: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const name = this.registrationName;
    const mail = this.registrationEmail.value;
    const pass = this.registrationPassword.value;
    const plate = this.plateNo.value;
    const prof = {
      plateno: plate,
    };
    // this.setState({ error: 'test' });
    // similar to login page, only instead of calling loginWithPassword(), 
    // we’ll be creating a user with the createUser() function
    // This will insert a new user account document into our app’s database.
    Accounts.createUser({
      email: mail,
      username: name,
      password: pass,
      profile: prof,
    }, (err) => {
      if (err) {
        this.setState({
          error: err.reason,
        });
      } else {
        browserHistory.push('/');
      }
    });
  }

  render() {
    const error = this.state.error;
    return (
      <div id="user_credentials" className="usr" >
        <h4 id="new_account">Sign up</h4>
        { error.length > 0 ?
          <div className="alert alert-danger fade in">{error}</div>
          : ''
        }
        <form
          className="col s12"
          onSubmit={this.handleSubmit}
        >
          <div className="row">
            <p id="tooltip_username" className="tooltip">Username</p>
            <input
              type="text"
              ref={(x) => { this.registrationName = x; }}
              placeholder="Username"
              name="username"
              id="username"
              onFocus={this.myFocusName}
              className="input_field"
            />
          </div>
          <div className="row">
            <p id="tooltip_email" className="tooltip">Email</p>
            <input
              type="email"
              ref={(x) => { this.registrationEmail = x; }}
              placeholder="E-mail address"
              name="email"
              id="input_email"
              className="input_field"
              onFocus={this.myFocusMail}
            />
          </div>
          <div className="row">
            <p id="tooltip_psw" className="tooltip">Password</p>
            <input
              type="password"
              ref={(x) => { this.registrationPassword = x; }}
              placeholder="Password"
              name="password"
              id="input_psw"
              className="input_field"
              onFocus={this.myFocusPsw}
            />
          </div>
          <div className="row">
            <p id="tooltip_plate" className="tooltip">License Plate</p>
            <input
              type="text"
              ref={(x) => { this.plateNo = x; }}
              placeholder="Plate number"
              name="plate"
              id="input_plate"
              className="input_field"
              onFocus={this.myFocusPlate}
            />
          </div>
          <div className="row">
            <input
              type="submit"
              className="button"
              value="Sign Up"
              id="create_account_btn"
            />
          </div>
          <p className="text_links">
                  Already have an account? <Link className="links" to="/login">Login</Link>
          </p>
        </form>
      </div>
    );
  }
}
