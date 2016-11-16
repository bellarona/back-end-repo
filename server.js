var config = require('./config/config');
var express = require('express');
var app =  express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var cors = require('./services/cors');
var checkAuthenticated = require('./services/checkAuthenticated');
var message = require('./controllers/message');
var auth = require('./controllers/auth');
var products = require('./controllers/products');
var dataFile = require('./data/data.json');

app.set('appData', dataFile);
// app.locals.allProducts = dataFile.products;


//Middleware
app.use(bodyParser.json());
app.use(cors);


//Connection
mongoose.connect("mongodb://localhost:27017/test", function(err, db){
    if(!err){
        console.log("We are connected to mongo");
    } else {
        console.log("Can't connect to mongo");
    }
});

var server = app.listen(9000, function(){
    console.log('listening on port ', server.address().port)
});



//Requests
app.get('/api/message', message.get);
app.post('/api/message', checkAuthenticated, message.post);

// app.post('/auth/login', auth.login);
app.post('/auth/register', auth.register);

app.get('/api/products', products.get);


// app.use(express.static('app/public'))

