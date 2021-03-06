import { Component } from 'react';
import * as React from 'react';
import { browserHistory } from 'react-router';
import BookDateButton from '../BookDateButton';
import LoginContainer from '../../containers/LoginContainer';

  interface IBookParkingProps {
  }

  interface IBookParkingState {
    userId: string;
    isAuthenticated: boolean;
  }

export default class BookParking extends Component<IBookParkingProps, IBookParkingState> {
  // is user logged in?
  static getMeteorData() {
    return { isAuthenticated: Meteor.userId() !== null, userId: Meteor.userId() };
 }

 constructor(props: IBookParkingProps) {
   super(props);
   // put userId in state
   this.state = BookParking.getMeteorData();
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
    const today = new Date(new Date().getTime() + 0 * 24 * 60 * 60 * 1000);
    const today_dd = today.getDate();
    const today_mm = today.getMonth() + 1;
    const today_yy = today.getFullYear();
    const today_str = today_dd + '/' + today_mm + '/' + today_yy;

    const day2 = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000);
    const day2_dd = day2.getDate();
    const day2_mm = day2.getMonth() + 1;
    const day2_yy = day2.getFullYear();
    const day2_str = day2_dd + '/' + day2_mm + '/' + day2_yy;

    const day3 = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
    const day3_dd = day3.getDate();
    const day3_mm = day3.getMonth() + 1;
    const day3_yy = day3.getFullYear();
    const day3_str = day3_dd + '/' + day3_mm + '/' + day3_yy;

    const day4 = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);
    const day4_dd = day4.getDate();
    const day4_mm = day4.getMonth() + 1;
    const day4_yy = day4.getFullYear();
    const day4_str = day4_dd + '/' + day4_mm + '/' + day4_yy;

    const day5 = new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000);
    const day5_dd = day5.getDate();
    const day5_mm = day5.getMonth() + 1;
    const day5_yy = day5.getFullYear();
    const day5_str = day5_dd + '/' + day5_mm + '/' + day5_yy;

    const day6 = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);
    const day6_dd = day6.getDate();
    const day6_mm = day6.getMonth() + 1;
    const day6_yy = day6.getFullYear();
    const day6_str = day6_dd + '/' + day6_mm + '/' + day6_yy;

    const day7 = new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000);
    const day7_dd = day7.getDate();
    const day7_mm = day7.getMonth() + 1;
    const day7_yy = day7.getFullYear();
    const day7_str = day7_dd + '/' + day7_mm + '/' + day7_yy;


    return (
      <div className="container z-depth-1 grey lighten-4 row" style={{ display: 'inline-block', padding: '32px 48px 0px 48px', border: '1px solid #EEE' }}>
        <div className="row">
          <LoginContainer /><a href="" onClick={this.logout}>Logout</a>
          <div className="center-align">
            <h2 className="center-align">Book Parking</h2>
            <form
              className="col s12"
            >
              <div className="row">
                <div className="input-field col s6">
                  <BookDateButton
                    date={today_str}
                    userId={this.state.userId}
                  />
                  <BookDateButton
                    date={day2_str}
                    userId={this.state.userId}
                  />
                  <BookDateButton
                    date={day3_str}
                    userId={this.state.userId}
                  />
                  <BookDateButton
                    date={day4_str}
                    userId={this.state.userId}
                  />
                  <BookDateButton
                    date={day5_str}
                    userId={this.state.userId}
                  />
                  <BookDateButton
                    date={day6_str}
                    userId={this.state.userId}
                  />
                  <BookDateButton
                    date={day7_str}
                    userId={this.state.userId}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
