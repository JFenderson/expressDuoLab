const express = require('express');
let router = express.Router();

const queries = require('../filestore');

// const chirpMessage = [
//     {
//         id: 0,
//         user: "Joseph",
//         text: "Hello World"
//     },
//     {
//         id: 1,
//         user: "mickey",
//         text: "welcome to disney"
//     },
//     {
//         id: 2,
//         user: "morty",
//         text: "aw geez"
//     }
// ]

// function find(id) {
//     return chirpMessage.filter(c => c.id == id)[0];
//   }
  
/* All routes in this file will be prepended with the path /dinosaur */

// READ - read all
router.get('/', (req, res) => {
    res.json(queries.GetChirps())
    console.log('got chirps');
});


// READ - read one
router.get('/:id', (req, res) => {
    res.json(queries.GetChirp(req.params.id))
    console.log(req.params.id);
});

// CREATE - creates one
router.post('/', (req, res) => {
    queries.CreateChirp(req.body);
    res.sendStatus(200);
    console.log('posted');
});

// // Update - show update form
// router.put('/:id/edit', (req, res) => {
//   queries.UpdateChirp(req.params.id, req.body)
//     console.log(req.params.id);
//     console.log('updated chirp');
// });

// router.post('/', (req, res) => {
//   queries.CreateChirp(req.params.id, req.body)
//       res.redirect(`./chirps/${chirps.id}`);
//       console.log('created a chirp');
// });

// UPDATE - updates one
router.put('/:id', (req, res) => {
  queries.UpdateChirp(req.params.id, req.body)
      res.redirect(`./chirps`);
      console.log('updated a chirp');
});

// DELETE - deletes one
router.delete('/:id', (req, res) => {
  queries.DeleteChirp(req.params.id, req.body)
      res.redirect('./chirps');
      console.log(req.params.id);
      console.log('deleted a chirp');
});

module.exports = router;
