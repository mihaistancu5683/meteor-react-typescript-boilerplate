import * as React from 'react';
import { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import LoginContainer from '../../containers/LoginContainer';
import { browserHistory } from 'react-router';

interface IMainPageProps {
}

interface IMainPageState {
  isAuthenticated: boolean;
}

export default class MainPage extends Component<IMainPageProps, IMainPageState> {

  // is user logged in?
  static getMeteorData() {
     return { isAuthenticated: Meteor.userId() !== null };
  }

  constructor(props: IMainPageProps) {
    super(props);
    // put userId in state
    this.state = MainPage.getMeteorData();
    this.logout = this.logout.bind(this);
  }
    
  // before rendered check if logged in
  // if not, redirect to /login
  componentWillMount() {
    if (!this.state.isAuthenticated) {
      browserHistory.push('/login');
    }
  }

  // anytime component updates check if logged in
  componentDidUpdate() {
    if (!this.state.isAuthenticated) {
        browserHistory.push('/login');
    }
  }

  // when called use Meteor.logout to logout
  // throw errors if any and print to console
  // otherwise redirect to /login
  logout(e) {
    e.preventDefault();
    Meteor.logout((err) => {
      if (err) {
        console.log(err.reason);
      } else {
        browserHistory.push('/login');
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <ul className="navigation" id="nav">
            <li id="closebtn"><img src="images/close.png" alt="close" /></li>
            <li className="nav-item"><a href="NewMobileSite.html">Home</a></li>
            <li className="nav-item"><a href="#test2">Library</a></li>
            <li className="nav-item"><a href="/">Parking</a></li>
            <li className="nav-item"><a href="#test3">Training</a></li>
            <li className="nav-item"><a href="">Contact</a></li>
          </ul>
        </div>
        <div className="site-wrap">
          <div id="header">
            <div id="divmenu">
              <img src="images/menu.png" alt="menu_picture" className="icons" />
            </div>
            <div id="txt_title">
              <h3><LoginContainer /></h3>
            </div>
          </div>
          <div id="icon_links">
            <table id="link_table">
              <tbody>
                <tr>
                  <td>
                    <a id="library_page" href="">
                      <img
                        className="round_icons"
                        src="images/Library-01.png"
                        alt="library_picture"
                      />
                    </a>
                  </td>
                  <td>
                    <a id="parking_page" href="/parking">
                      <img
                        className="round_icons"
                        src="images/Parking-01.png"
                        alt="parking_picture"
                      />
                    </a>
                  </td>
                  <td>
                    <a id="training_page" href="">
                      <img
                        className="round_icons"
                        src="images/Trainings-01.png"
                        alt="training_picture"
                      />
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>Library</th>
                  <th>Parking</th>
                  <th>Training</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="title_search">
            <div id="center_txt">
              <img id="logo" src="images/logoadsk.png" alt="logo_adsk" width="32px" />
              <h1>AUTODESK<sub className="registeredmark">®</sub>BUCHAREST OFFICE SERVICES</h1>
            </div>
          </div>
          <div id="content_page">
            <h2>Welcome to Autodesk Bucharest Office Services</h2>
            <p>Here you can find relative information about Bucharest Office events and
              matters of interest for the office employees. Stay tuned for related events
              on this main page. Feel free to contact the site team for any related
              information about how to upload events or to give feedback about how to
              improve the design of the page.
            </p>
          </div>
          <br />
          <footer>
            <p><small>© Copyright 2017 Autodesk, Inc. All rights reserved.</small></p>
          </footer>
        </div>
      </div>
    );
  }
}

