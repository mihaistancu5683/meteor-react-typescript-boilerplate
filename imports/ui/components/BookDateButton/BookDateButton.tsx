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
    isDisabled: boolean,
    isBookedBySomeoneElse: boolean
}

export default class BookDateButton extends Component<IBookDateButtonProps, IBookDateButtonState> {
  constructor(props: IBookDateButtonProps) {
    super(props);
    this.state = { isDisabled: false, isBookedBySomeoneElse: false }
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
  }

  public componentWillMount() {
    const today = new Date();
    this.setState({isDisabled:false, isBookedBySomeoneElse:false});
  }

  public render() {
    const { isDisabled, isBookedBySomeoneElse } = this.state;

    const style = {
      margin: 12,
    };

    return (
      <MuiThemeProvider>
        <div>
          <RaisedButton 
              style={style}
              //backgroundColor="blue"
              type="submit"
              className="button"
              label={this.props.date.toString()}
              onClick={e=>this.submitBooking(e,this.props.date, this.props.userId)}
              disabled = {this.state.isDisabled}
          />
          <p> </p>
        </div>
      </MuiThemeProvider>
    );
  }
}
