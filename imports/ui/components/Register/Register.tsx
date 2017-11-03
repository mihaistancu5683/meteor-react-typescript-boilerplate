import * as React from 'react';
import { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import StringInputRow from '../StringInputRow';

interface IRegisterProps {

}

interface IRegisterState {
  error: string;
  email: string;
  username: string;
  password: string;
  plate: string;
  visibleNameTooltip: string;
  visibleEmailTooltip: string;
  visiblePassTooltip: string;
  visiblePlateNoTooltip: string;
}

export default class Register extends Component<IRegisterProps, IRegisterState> {
  constructor(props: IRegisterProps) {
    super(props);
    this.state = {
      email: '',
      error: '',
      password: '',
      plate: '',
      username: '',
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
      email: this.state.email,
      password: this.state.password,
      profile: {
        plateNo: this.state.plate,
      },
      username: this.state.username,
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

  public onChange(value: any, id: any) {
    const objNewProp: any = {};
    objNewProp[id] = value;
    this.setState(objNewProp);
  }

  public render() {
    const { error, email, username, password, plate } = this.state;
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
            onChange = {this.onChange.bind(this)}
          />
          <StringInputRow
            tooltipId = "tooltip_email"
            tooltipValue = "Email"
            inputId = "email"
            inputName = "email"
            inputPlaceholder = "E-mail address"
            inputType = "email"
            onChange = {this.onChange.bind(this)}
          />
          <StringInputRow
            tooltipId = "tooltip_psw"
            tooltipValue = "Password"
            inputId = "password"
            inputName = "password"
            inputPlaceholder = "Password"
            inputType = "password"
            onChange = {this.onChange.bind(this)}
          />
          <StringInputRow
            tooltipId = "tooltip_plate"
            tooltipValue = "License Plate"
            inputId = "plate"
            inputName = "plate"
            inputPlaceholder = "Plate number"
            inputType = "text"
            onChange = {this.onChange.bind(this)}
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
