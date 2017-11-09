import * as React from 'react';
import { Component } from 'react';
import { browserHistory } from 'react-router';
import { ParkingSpots } from '../../../api/ParkingSpots.js';

interface IBookDateButtonProps {
    date: String,
    userId: String,
}

interface IBookDateButtonState {
    isDisabled: Boolean,
    isBookedBySomeoneElse: Boolean
}

export default class BookDateButton extends Component<IBookDateButtonProps, IBookDateButtonState> {
  constructor(props: IBookDateButtonProps) {
    super(props);
    this.state = { isDisabled: false, isBookedBySomeoneElse: false }
    this.submitBooking = this.submitBooking.bind(this);
  }

  submitBooking(date, userId) {
    event.preventDefault(); // prevent refresh and submit
    ParkingSpots.insert({
      date:[userId]
    });
  }

  public componentWillMount() {
    const today = new Date();
    this.setState({isDisabled:false, isBookedBySomeoneElse:false});
  }

  public render() {
    const { isDisabled, isBookedBySomeoneElse } = this.state;
    return (
      <div>
        <input
            type="submit"
            className="button"
            value={this.props.date.toString()}
            onSubmit={e=>this.submitBooking(this.props.date, this.props.userId)}
            isDisabled = {(this.state.isDisabled)? "disabled" : ""}
        />
        <p> </p>
      </div>
    );
  }
}
