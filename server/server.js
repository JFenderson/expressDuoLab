const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const mustache = require('mustache');

let app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client')));

// router.use((req, res, next)=> {
//     console.log('/' + req.method);
//     next();
// });

// router.use('/user/:id', (req, res, next) => {
//     console.log(req.params.id)
//     if(req.params.id == 0) {
//         res.json({'message': 'you must pass ID other than 0'})
//     }
//     else next();
// })

// router.get('/', (req, res) => {
//     res.json({'message': 'Hello World'});
// });

// router.get('/user/:id', (req,res) => {
//     res.json({'message': 'Hello '+req.params.id});
// });

// router.get('../chirps.json', function(req, res) {
//     res.sendFile(path.join(__dirname + './client/index.html'));
//     console.log('working');
// });


app.use('/api', apiRouter);


app.listen(3000, () => {
    console.log('listening!!!');
});

module.export = router;
