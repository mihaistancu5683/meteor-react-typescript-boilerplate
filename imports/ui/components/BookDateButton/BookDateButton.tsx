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
    this.submitOrCancelBooking = this.submitOrCancelBooking.bind(this);
    this.state = {isAlreadyBookedByCurrentUser: false, isParkingFullyBooked: true};
  }

  public submitOrCancelBooking(e, date, userId) {
    e.preventDefault();
    const temp_date:string = date;
    const obj:object = {
          date: temp_date,
          Id: userId,
          cancelled: false
    }
    if(this.state.isAlreadyBookedByCurrentUser)
    {
      const ceva = ParkingSpots.findOne({date : this.props.date});
      ParkingSpots.remove(ceva._id);
    }
    else
    {
      ParkingSpots.insert(obj);
    }
    this.updateComponentState();
  }

  public updateComponentState()
  {
    // When the data is received asynchronously, set the state
    const sub = Meteor.subscribe('ParkingSpots',() => {
      const availablePSpots = 5;
      const today = new Date();
      const pSpotsListToday: IBookDateButtonProps[] = ParkingSpots.find({date : this.props.date}).fetch();
      const pSpotsListTodayThisUser: IBookDateButtonProps[] = ParkingSpots.find({date : this.props.date, Id: this.props.userId}).fetch();
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
    });
  }

  public componentDidMount() {
    this.updateComponentState();
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
              backgroundColor={isAlreadyBookedByCurrentUser ? "green" :
                                isParkingFullyBooked ? "gray" : "blue"}
              type="submit"
              className="button"
              label={this.props.date.toString()}
              onClick={e=>this.submitOrCancelBooking(e,this.props.date, this.props.userId)}
              disabled = {this.state.isParkingFullyBooked}
          />
          <p> </p>
        </div>
      </MuiThemeProvider>
    );
  }
}
