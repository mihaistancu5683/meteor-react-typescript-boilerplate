import { Meteor } from 'meteor/meteor';
import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from './components/MainPage';
import BookParking from './components/BookParking';
import Admin from './components/Admin';
import TasksContainer from './containers/TasksContainer';

/** Redirect to Login page when user is not logged in */
function forceLogin(location: any, replaceWith: (route: string) => void) {
    if (Meteor.user() === null) {
        replaceWith('/login');
    }
}

export default (
    <Route component={App}>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/parking" component={BookParking} />
        <Route path="*" component={Login} />
    </Route>
);
