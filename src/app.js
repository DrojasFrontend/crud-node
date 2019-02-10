const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
//const port = 3000;

//SERVER
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => {
    console.log(`Server to Listening ${app.get('port')}`);
});

//BASE DE DATOS
mongoose.connect('mongodb://localhost/crud-mongo', {useNewUrlParser: true})
.then(db => console.log('Db connected'))
.catch(err => console.log(err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//ROUTES
app.use('/', indexRouter);

