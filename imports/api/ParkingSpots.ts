import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const ParkingSpots:any = new Mongo.Collection('ParkingSpots');

const ParkingSpotSchema = new SimpleSchema(
  {
      date: String,
      Id: String,
      cancelled: Boolean
  }
);
ParkingSpots.attachSchema(ParkingSpotSchema);

if (Meteor.isServer) {
  Meteor.publish('ParkingSpots', function() {
    return ParkingSpots.find({});
  });
}