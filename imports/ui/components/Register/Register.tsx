import * as React from 'react';
import { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import StringInputRow from '../StringInputRow';

interface IRegisterProps {

}

interface IRegisterState {
  error: string;
  registrationEmail: string;
  registrationName: string;
  registrationPassword: string;
  registrationPlateNo: string;
  visibleNameTooltip: string;
  visibleEmailTooltip: string;
  visiblePassTooltip: string;
  visiblePlateNoTooltip: string;
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
      visibleEmailTooltip: 'visible',
      visibleNameTooltip: 'visible',
      visiblePassTooltip: 'visible',
      visiblePlateNoTooltip: 'visible',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleSubmit(e) {
    e.preventDefault();
    Accounts.createUser({
      email: this.state.registrationEmail,
      password: this.state.registrationPassword,
      profile: {
        plateNo: this.state.registrationPlateNo,
      },
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

  public render() {
    const { error, registrationEmail, registrationName, registrationPassword, registrationPlateNo } = this.state;
    return (
      <div id="user_credentials" className="usr" >
        <h4 id="new_account">Sign up</h4>
        { error.length > 0 ? <div className="alert alert-danger fade in">{error}</div> : ''}
        <form
          className="col s12"
          onSubmit={this.handleSubmit}
        >
          <StringInputRow
            tooltipId = "tooltip_username"
            tooltipValue = "Username"
            inputId = "username"
            inputName = "username"
            inputPlaceholder = "Username"
            inputType = "username"
          />
          <StringInputRow
            tooltipId = "tooltip_email"
            tooltipValue = "Email"
            inputId = "input_email"
            inputName = "email"
            inputPlaceholder = "E-mail address"
            inputType = "email"
          />
          <StringInputRow
            tooltipId = "tooltip_psw"
            tooltipValue = "Password"
            inputId = "input_psw"
            inputName = "password"
            inputPlaceholder = "Password"
            inputType = "password"
          />
          <StringInputRow
            tooltipId = "tooltip_plate"
            tooltipValue = "License Plate"
            inputId = "input_plate"
            inputName = "plate"
            inputPlaceholder = "Plate number"
            inputType = "text"
          />
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
