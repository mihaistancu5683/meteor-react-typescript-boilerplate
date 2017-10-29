import * as React from 'react';
import { Component } from 'react';

export default class WelcomeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  render() {
    const currentUser = this.refs.currentUser;
    const userDataAvailable = (currentUser !== undefined);
    const loggedIn = (currentUser && userDataAvailable);

    return (
      <div id="welcome_user">
        { loggedIn ? `Hi, ${currentUser}` : '' }
      </div>
    );
  }
}
