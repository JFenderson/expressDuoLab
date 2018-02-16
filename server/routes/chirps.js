const express = require('express');
const chirpsStore = require('../chirpsStore');
let router = express.Router();

router.get('/', (req, res) => {
    res.send('chirps');
});

router.get('/:id?', (req, res) => {
    if(id) {
        res.json(chirpsStore.getChirps(id));
    } else{
        res.send(chirpsStore.getChirps());
    }
});

router.post('/', (req, res) => {
    chirpsStore.CreateChirp(req.body);
    res.sendStatus(200);
});


module.exports = router;