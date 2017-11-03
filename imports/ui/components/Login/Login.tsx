import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import * as React from 'react';
import { browserHistory, Link } from 'react-router';
import { Alert, FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import StringInputRow from '../StringInputRow';

class Login extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      hasError: false,
      isEmailRequired: false,
      isInvalid: false,
      isSent: false,
      password: '',
    };
  }

public onChange(value: any, id: any) {
  const objNewProp: any = {};
  objNewProp[id] = value;
  this.setState(objNewProp);
}

public render() {
    const { email, password } = this.state;
    return (
    <div className="usr" id="user_credentials">
        <h4 id="sign_in">Login</h4>
        <form
          className="col s12"
          onSubmit={this.onSubmit.bind(this)}
        >
          {this.state.isSent ? <Alert bsStyle="info">Please check your email</Alert> : ''}
          {this.state.isInvalid ? <Alert bsStyle="danger">Please enter email and password</Alert> : ''}
          {this.state.isEmailRequired ? <Alert bsStyle="danger">Please enter your email address first.</Alert> : ''}
          {this.state.hasError ? <Alert bsStyle="danger">Login unsuccessful. Please try again.</Alert> : ''}
          <StringInputRow
            tooltipId = "tooltip_email"
            tooltipValue = "Email"
            inputId = "email"
            inputName = "email"
            inputPlaceholder = "Email"
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
          <div className="row">
            <p>
              <input type="checkbox" id="remember" />Remember me
            </p>
          </div>
          <div className="row">
            <input
              type="submit"
              className="button"
              value="Login"
              id="signin_btn"
            />
          </div>
          <p className="text_links" id="text_tip">
                      New here? <Link to="/register" className="links">Create account</Link>
          </p>
        </form>
      </div>
    );
  }

  private onSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    if (!this.state.email || !this.state.password) {
      this.setState({ isInvalid: true, isEmailRequired: false, hasError: false, isSent: false });
      return;
    }

    this.setState({ isInvalid: false, isEmailRequired: false, hasError: false, isSent: false });

    Meteor.loginWithPassword(this.state.email, this.state.password, (err) => {
      if (err) {
        this.setState({ isInvalid: false, isEmailRequired: false, hasError: true, isSent: false });
      } else {
        browserHistory.push('/admin');
      }
    });
  }

  private forgotPassword(e) {
    if (e) {
      e.preventDefault();
    }

    if (!this.state.email) {
      this.setState({ isInvalid: false, isEmailRequired: true, hasError: false, isSent: false });
      return;
    }

    Accounts.forgotPassword({ email: this.state.email }, (err) => {
      if (err) {
        this.setState({ isInvalid: false, isEmailRequired: false, hasError: true, isSent: false });
      }

      this.setState({ isInvalid: false, isEmailRequired: false, hasError: false, isSent: true });
    });
  }

  private handleChange(field, event) {
    this.setState({ [field]: event.target.value });
  }
}

export default Login;
