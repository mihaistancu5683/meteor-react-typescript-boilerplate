import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const ParkingSpots:any = new Mongo.Collection('ParkingSpots');

const ParkingSpotSchema = new SimpleSchema({
  date: { type: String, optional: false },
  userId: { type: String, optional: false },
  isActive: { type: Boolean, optional: false },
});
ParkingSpots.attachSchema(ParkingSpotSchema);

if (Meteor.isServer) {
  Meteor.publish('ParkingSpots', function() {
    return ParkingSpots.find({});
  });
}