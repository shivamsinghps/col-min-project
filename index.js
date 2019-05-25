const Ex=require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Express app setup
const app = Ex();

//Connect to the mongodb
mongoose.connect("mongodb://localhost/PoliceEhelp", { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
//Overriding mongoose promise
mongoose.Promise  = global.Promise;

//bodyparser to parse the incoming json body
app.use(bodyParser.json());

//Handling the routes
app.use('/api',require('./routes/api'));

//Error handling
app.use(function(err,req,res,next){
  res.status(432).send({error:err.message});
});

//Assigning port for connection
app.listen(process.env.port || 4000,function() {
  console.log('active connection');
});
