const express = require("express");
const serverless = require("serverless-http");
const stripeSecret = process.env.STRIPE_SECRET;
const stripe = require("stripe")(stripeSecret);

const app = express();
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency, receipt_email, description, shipping } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    receipt_email,
    description,
    shipping,
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports.handler = serverless(app);
