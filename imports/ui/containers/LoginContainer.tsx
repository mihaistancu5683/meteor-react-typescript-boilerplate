import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import WelcomeUserContainer from './WelcomeUserContainer';

const LoginContainer = createContainer(() => {
  const currentUser = Meteor.user();
  return {
    currentUser,
  };
}, WelcomeUserContainer);

export default LoginContainer;