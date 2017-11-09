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
      <div>
        <form
          className="col s12"
          onSubmit={this.submitBooking}
        >
          <h3> Add new booking </h3>
          <div className="row">
            <div className="input-field col s6">
              <button className="btn waves-effect waves-light" type="submit">Add
                <i className="material-icons right"> send </i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

