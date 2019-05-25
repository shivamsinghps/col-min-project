const Ex = require('express');
const router = Ex.Router();
const Police = require('../models/police');

//Get a list of Policemen from the database
router.get('/police', function(req, res, next){
    // Police.aggregate().near({ near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
    // maxDistance: 100000, spherical: true, distanceField: "dist.calculated" })
    // ﻿.then(function(polices){
    // res.send(polices);
    // }).catch(next);

    Police.aggregate().near({
     near: {
      'type': 'Point',
      'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
     },
     maxDistance: 100000,
     spherical: true,
     distanceField: "dis"
    })﻿.then(function(polices){
    res.send(polices);
    }).catch(next);


});

//Create a Policeman profile
router.post('/police',function(req,res,next){
  Police.create(req.body).then(function(police){
    res.send({police});
  }).catch(next);

});

//Update a Policeman profile in the database
router.put('/police/:id',function(req,res,next){
  Police.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
    Police.findOne({_id:req.params.id}).then(function(police){
    res.send(police);
    });
    res.send(police);
  }).catch(next);

});

//Delete the Policeman from database
router.delete('/police/:id',function(req,res,next){
  Police.findByIdAndRemove({_id:req.params.id}).then(function(police){
    res.send(police);
  }).catch(next);

});


//Exporting the module
module.exports = router;
