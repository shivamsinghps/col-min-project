const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Get the geo location
const GeoSchema = new Schema({
  type:{
    type:String,
    default:"Point"
  },
  coordinates:{
    type:[Number],
    index:"2dsphere"
  }
});

//The Schema for policemen
const PoliceSchema = new Schema({
  name:{type:String,required:[true,'Name field  required']},
  rank:{type:String,required:[true,'Rank required']},
  available:{type:Boolean,
  default:false},
  geometry:GeoSchema
});

const Police = mongoose.model('police',PoliceSchema);


module.exports=Police;
