import * as React from 'react';
import { Component } from 'react';
import { browserHistory } from 'react-router';
import { ParkingSpots } from '../../../api/ParkingSpots.js';

interface IBookDateButtonProps {
    date: String,
    userId: String,
}

interface IBookDateButtonState {
    state: Number, //1 - available, 2 - booked by this user, 3 - unavailable
}

export default class BookDateButton extends Component<IBookDateButtonProps, IBookDateButtonState> {
  constructor(props: IBookDateButtonProps) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.submitBooking = this.submitBooking.bind(this);
  }

  submitBooking(event) {
    event.preventDefault(); // prevent refresh and submit
    ParkingSpots.insert({
      date: new Date(),
      userId: 'MockId',
    });
  }

  public componentWillMount() {
    const today = new Date();
    this.setState({visibility: 'hidden'});
  }

  public handleClick(user, date){
    this.props.onChange(user, date);
  }

  public render() {
    const { visibility } = this.state;
    return (
      <div>
        <input
            type="submit"
            className="button"
            value={this.props.date.toString()}
            onChange = {e=>this.handleClick(e.target.value, this.props.date.toString())}
            onSubmit={this.submitBooking}
        />
        <p> </p>
      </div>
    );
  }

  public toggleVisibility() {
      if (this.state.visibility === 'visible') {
          this.setState({visibility: 'hidden'});
      }else{
          this.setState({visibility: 'visible'});
      }
  }
}
