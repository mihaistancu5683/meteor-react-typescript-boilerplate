import * as React from 'react';
import { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

interface IRegisterProps {

}
interface IRegisterState {
  error: string;
  registrationEmail: string;
  registrationName: string;
  registrationPassword: string;
  registrationPlateNo: string;
}
export default class Register extends Component<IRegisterProps, IRegisterState> {
  constructor(props: IRegisterProps) {
    super(props);
    this.state = {
      error: '',
      registrationEmail: '',
      registrationName: '',
      registrationPassword: '',
      registrationPlateNo: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private handleChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  public handleSubmit(e) {
    e.preventDefault();
    Accounts.createUser({
      email: this.state.registrationEmail,
      password: this.state.registrationPassword,
      //profile: prof,
      username: this.state.registrationName,
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
    const { error, registrationEmail, registrationName, registrationPassword, registrationPlateNo } = this.state;
    return (
      <div id="user_credentials" className="usr" >
        <h4 id="new_account">Sign up</h4>
        { error.length > 0 ? <div className="alert alert-danger fade in">{error}</div> : ''}
        <form
          className="col s12"
          onSubmit={this.handleSubmit}
        >
          <div className="row">
            <p id="tooltip_username" className="tooltip">Username</p>
            <input
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              onFocus={this.state.myFocusName}
              className="input_field"
              value={registrationName}
              onChange={this.handleChange.bind(this, 'registrationName')}
            />
          </div>
          <div className="row">
            <p id="tooltip_email" className="tooltip">Email</p>
            <input
              type="email"
              placeholder="E-mail address"
              name="email"
              id="input_email"
              className="input_field"
              onFocus={this.myFocusMail}
              value={registrationEmail}
              onChange={this.handleChange.bind(this, 'registrationEmail')}
            />
          </div>
          <div className="row">
            <p id="tooltip_psw" className="tooltip">Password</p>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="input_psw"
              className="input_field"
              onFocus={this.myFocusPsw}
              value={registrationPassword}
              onChange={this.handleChange.bind(this, 'registrationPassword')}
            />
          </div>
          <div className="row">
            <p id="tooltip_plate" className="tooltip">License Plate</p>
            <input
              type="text"
              placeholder="Plate number"
              name="plate"
              id="input_plate"
              className="input_field"
              onFocus={this.myFocusPlate}
              value={registrationPlateNo}
              onChange={this.handleChange.bind(this, 'registrationPlateNo')}
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
