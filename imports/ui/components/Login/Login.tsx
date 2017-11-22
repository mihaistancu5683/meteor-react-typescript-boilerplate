import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import * as React from 'react';
import { browserHistory, Link } from 'react-router';
import { Alert, FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import StringInputRow from '../StringInputRow';

interface IStringInputRowProps {
  tooltipValue: string;
  inputId: string;
  inputName: string;
  inputPlaceholder: string;
  inputType: string;
  onChange(fieldId: string, fieldValue: string);
}

interface ILoginProps {
}

interface ILoginState {
  email: string,
  fields: IStringInputRowProps[],
  hasError: boolean,
  isEmailRequired: boolean,
  isInvalid: boolean,
  isSent: boolean,
  password: string
}

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);
    const loginFields: IStringInputRowProps[] = [
      {
        inputId: 'email',
        inputName: 'email',
        inputPlaceholder: 'E-mail address',
        inputType: 'email',
        onChange: (event: any) => { this.onChange.bind(this); },
        tooltipValue: 'Email',
      },
      {
        inputId: 'password',
        inputName: 'password',
        inputPlaceholder: 'Password',
        inputType: 'password',
        onChange: (event: any) => { this.onChange.bind(this); },
        tooltipValue: 'Password',
      },
    ];

    this.state = {
      email: '',
      fields: loginFields,
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
      <div className="container z-depth-1 grey lighten-4 row" style={{ display: 'inline-block', padding: '32px 48px 0px 48px', border: '1px solid #EEE' }}>
        <div className="row">
          <div className="center-align">
            <h2 className="center-align">Login</h2>
            <form
              className="col s12"
              onSubmit={this.onSubmit.bind(this)}
            >
              {this.state.isSent ? <Alert bsStyle="info">Please check your email</Alert> : ''}
              {this.state.isInvalid ? <Alert bsStyle="danger">Please enter email and password</Alert> : ''}
              {this.state.isEmailRequired ? <Alert bsStyle="danger">Please enter your email address first.</Alert> : ''}
              {this.state.hasError ? <Alert bsStyle="danger">Login unsuccessful. Please try again.</Alert> : ''}

              {this.state.fields.map((item, index) => (<StringInputRow 
                key = {index} //{...item}
                inputId = {item.inputId}
                inputName = {item.inputName}
                inputPlaceholder = {item.inputPlaceholder}
                inputType = {item.inputType}
                onChange = {this.onChange.bind(this)}
                tooltipValue = {item.tooltipValue}
              />))}

              <div className="row">
                <div className="col s12">
                  <p>
                    <input type="checkbox" id="remember" />
                  </p>
                </div>
              </div>
              <div className="divider" />
              <div className="row">
                <div className="col m12">
                  <p className="right-align">
                    <input
                      type="submit"
                      className="btn btn-large waves-effect waves-light"
                      value="Login"
                    />
                  </p>
                </div>
              </div>
              <p className="text_links" id="text_tip">
                Don't have an account yet? Signup <Link to="/register" className="links">here</Link>
              </p>
            </form>
          </div>
        </div>
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
        browserHistory.push('/parking');
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
