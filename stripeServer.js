'use stric'
const constants = require('./constants/constants');
const express = require("express");
const app = express();
const { resolve } = require("path");
const dotenv = require('dotenv');
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY
const PUBLISHABLE_KEY = process.env.PUBLISHABLE_KEY
// This is your real test secret API key.
const stripe = require(constants.stripe)(SECRET_KEY);
app.use(express.static("."));
app.use(express.json());

module.exports = {
  greetUser: function (req, res) {
    return res.status(200).json({ 'message': constants.greet_message });
  },

  config: function (req, res) {
    return res.status(200).json({ 'publishableKey': PUBLISHABLE_KEY });
  },

  createPaymentIntent: async function (req, res) {

    // Create a PaymentIntent with the order amount and currency

    try {
      const { amount, currency, paymentMethodType } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        payment_method_types: [paymentMethodType]
      });
      
      return res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (e) {
      return res.status(400).json({ error: { message: e.message } });
    }
  }
}