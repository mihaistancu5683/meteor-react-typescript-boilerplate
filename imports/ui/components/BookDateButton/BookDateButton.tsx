import * as React from 'react';
import { Component } from 'react';
import { browserHistory } from 'react-router';
import { ParkingSpots } from '../../../api/ParkingSpots.js';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

interface IBookDateButtonProps {
    date: String,
    userId: String,
}

interface IBookDateButtonState {
    isAlreadyBookedByCurrentUser: boolean,
    isParkingFullyBooked: boolean
}

export default class BookDateButton extends Component<IBookDateButtonProps, IBookDateButtonState> {
  constructor(props: IBookDateButtonProps) {
    super(props);
    this.submitBooking = this.submitBooking.bind(this);
  }

  submitBooking(e, date, userId) {
    e.preventDefault();
    const temp_date:string = date;
    const obj:object = {
          date: temp_date,
          Id: userId,
          cancelled: false
    }
    ParkingSpots.insert(obj);
    this.setState({isAlreadyBookedByCurrentUser: true});
  }

  public componentWillMount() {
    Meteor.subscribe('ParkingSpots');
    const availablePSpots = 5;
    const today = new Date();
    const pSpotsListToday: IBookDateButtonProps[] = ParkingSpots.find({date : this.props.date}).fetch();
    const pSpotsListTodayThisUser: IBookDateButtonProps[] = ParkingSpots.find({date : this.props.date, userId: this.props.userId}).fetch();
    if (pSpotsListTodayThisUser.length == 1)
    {
      this.setState({isAlreadyBookedByCurrentUser: true, isParkingFullyBooked: false});
    }
    else if(pSpotsListToday.length >= availablePSpots)
    {
      this.setState({isAlreadyBookedByCurrentUser: false, isParkingFullyBooked: true});
    }
    else
    {
      this.setState({isAlreadyBookedByCurrentUser: false, isParkingFullyBooked: false});
    }
  }

  public render() {
    const { isAlreadyBookedByCurrentUser, isParkingFullyBooked } = this.state;

    const style = {
      margin: 12,
    };

    return (
      <MuiThemeProvider>
        <div>
          <RaisedButton 
              style={style}
              backgroundColor={isAlreadyBookedByCurrentUser ? "gray" : "blue"}
              type="submit"
              className="button"
              label={this.props.date.toString()}
              onClick={e=>this.submitBooking(e,this.props.date, this.props.userId)}
              disabled = {this.state.isAlreadyBookedByCurrentUser || this.state.isParkingFullyBooked}
          />
          <p> </p>
        </div>
      </MuiThemeProvider>
    );
  }
}
