var express = require('express');
var router = express.Router();
var City = require('../models').City;

/* var cities = [
  { id: 1, name: 'Cape Town' },
  { id: 2, name: 'St Petersburg' },
  { id: 3, name: 'New Orleans' }
] */

/* GET cities listings. */
router.get('/', function(req, res) {
  City.all({
    order: [
      ['createdAt', 'ASC']
    ]
  })
    .then( function(cities) {
      return res.render('cities', { cities: cities });
  })
});

/* POST add cities listing */
router.post('/', function(req, res) {
  var title = req.body.title;
  City.create({ city: city })
    .then( function() {
      res.redirect('/cities');
  });
});

router.delete('/:id', function(req, res) {
  City.findById(req.params.id)
    .then( function(city) {
      city.destroy()
    })
    .then( function() {
      return res.redirect('/cities');
  });
});

router.get('/:id/edit', function(req, res) {
  City.findById(req.params.id)
    .then( function(city) {
      return res.render('edit', { city: city });
  });
});

router.put('/:id', function(req, res) {
  City.update(
    { name: req.body.name },
    { where: { id: req.params.id } }
  )
  .then( function() {
    return res.redirect('/cities');
  })
});

module.exports = router;