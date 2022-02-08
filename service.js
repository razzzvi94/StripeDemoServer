const bodyparser = require('body-parser')
const express = require('express');
const stripeServer = require('./stripeServer');
const app = express();

// Body-parser middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.get('/greet', stripeServer.greetUser);

app.get('/config', stripeServer.config);

app.post('/create-payment-intent', stripeServer.createPaymentIntent)

module.exports = app;