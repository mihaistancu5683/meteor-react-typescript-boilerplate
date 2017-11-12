import * as React from 'react';
import { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import StringInputRow from '../StringInputRow';

interface IRegisterProps {
  inputId: string;
  inputName: string;
  inputPlaceholder: string;
  inputType: string;
  tooltipValue: string;
  onChange: (value: any, id: any) => void;
}

interface IRegisterState {
  error: string;
  email: string;
  fields: IRegisterProps[];
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
    const regFields: IRegisterProps[] = [
      {
        inputId: 'username',
        inputName: 'username',
        inputPlaceholder: 'Username',
        inputType: 'text',
        onChange: (event: any) => { this.onChange.bind(this); },
        tooltipValue: 'Username',
      },
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
      {
        inputId: 'plate',
        inputName: 'plate',
        inputPlaceholder: 'Plate number',
        inputType: 'text',
        onChange: (event: any) => { this.onChange.bind(this); },
        tooltipValue: 'License Plate',
      },
    ];
    this.state = {
      email: '',
      error: '',
      fields: regFields,
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
      <div className="container z-depth-1 grey lighten-4 row" style={{ display: 'inline-block', padding: '32px 48px 0px 48px', border: '1px solid #EEE' }}>
        <div className="row">
          <div className="center-align">
            <h2 className="center-align">Register</h2>
              { error.length > 0 ? <div className="alert alert-danger fade in">{error}</div> : ''}
              <form
                className="col s12"
                onSubmit={this.handleSubmit}
              >
                {this.state.fields.map((item, index) => (<StringInputRow 
                  key = {index} //{...item}
                  inputId = {item.inputId}
                  inputName = {item.inputName}
                  inputPlaceholder = {item.inputPlaceholder}
                  inputType = {item.inputType}
                  onChange = {this.onChange.bind(this)}
                  tooltipValue = {item.tooltipValue}
                />))}
                <div className="divider" />
                <div className="row">
                  <div className="col m12">
                    <p className="left-align">
                      <input
                        type="submit"
                        className="btn btn-large waves-effect waves-light"
                        value="Sign Up"
                      />
                    </p>
                  </div>
                </div>
                <p className="text-center">
                  Already have an account? <Link className="links" to="/login">Login</Link>
                </p>
              </form>
          </div>
        </div>
      </div>
    );
  }
}
