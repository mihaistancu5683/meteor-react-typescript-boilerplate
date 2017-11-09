import { Component } from 'react';
import * as React from 'react';
import { ParkingSpots } from '../../../api/ParkingSpots.js';
import { browserHistory } from 'react-router';

  interface IBookParkingProps {
    submitBooking(fieldId: string, fieldValue: string);
  }

  interface IBookParkingState {
  }

export default class BookParking extends Component<IBookParkingProps, IBookParkingState> {
  constructor() {
    super();
    this.submitBooking = this.submitBooking.bind(this);
  }

  submitBooking(event) {
    event.preventDefault(); // prevent refresh and submit
    ParkingSpots.insert({
      date: new Date(),
      userId: 'MockId',
      isActive: true,
    });
    browserHistory.push('/'); // after inserting go back home
  }
  render() {
    return (
      <div id="user_credentials" className="usr" >
        <h4 id="new_account">Book parking date</h4>
        <form
          className="col s12"
          onSubmit={this.submitBooking}
        >
          <div className="row">
          <div className="input-field col s6">
            <input
              type="submit"
              className="button"
              value="Today"
            />
          </div>
        </div>
        </form>
      </div>
    );
  }
}
