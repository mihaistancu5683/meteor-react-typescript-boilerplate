import * as React from 'react';
import { Component } from 'react';

interface IWelcomeUserProps {
  currentUser: string;
}

interface IWelcomeUserState {
  username: string;
}

export default class WelcomeUser extends Component<IWelcomeUserProps, IWelcomeUserState> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  render() {
    const currentUser = this.props.currentUser;
    const userDataAvailable = (currentUser !== undefined);
    const loggedIn = (currentUser && userDataAvailable);

    return (
      <div id="welcome_user">
        { loggedIn ? `Hi, ${currentUser}` : '' }
      </div>
    );
  }
}
