let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

//let cache = require('./component/cache.js');

/*==============Upload filles=================*/
// const path = require('path');
// const multer = require('multer');

// const upload = multer({
//     dest: 'public/pictures' // uploaded files will be saved in this folder
// });

// app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', './views');
// app.set('view engine', 'ejs');
/*===============================*/

//App config
mongoose.connect("mongodb://localhost:27017/moviesdb");
app.use(bodyParser.json());

let db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to db');
});

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
/*==============upload filles=================*/
// app.post('/profile', upload.single('avatar'), (req, res) => {
//     // req.file is the photo file
//     // req.body holds the text fields, if there are any
//     let name = req.body.name;
//     let pictureUrl = path.join('pictures', req.file.filename);
//     res.render('index', { name, pictureUrl });
// });
/*===============================*/
//


// app.get("/time", cache(10), (req, res) => {
//     let now = new Date();
//     let currTime = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
//     res.send("Current time is: " + currTime);
// });

//schema require
const moviesRouter = require('./routes/movies');
app.use('/movies', moviesRouter);

const ordersRouter = require('./routes/orders');
app.use('/orders', ordersRouter);

const showsRouter = require('./routes/shows');
app.use('/shows', showsRouter);

const theatersRouter = require('./routes/theaters');
app.use('/theaters', theatersRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// app.get("/time", cache(3), (req, res) => {
//     let now = new Date();
//     let currTime = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
//     res.send("Current time is: " + currTime);
// });

app.listen(3000, () => {
    console.log('You on port 3000');
});