const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51HUy3DIgMTjdJqGgr6nayNLKEKGtv4JctE7sOCVVwi7dj8M4YtHnMzxc9bGTIdDn6HzYgptj0cFNUu44zTPukEzN003r1Sh37j');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  console.log(items[0].amount)
  return items[0].amount;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
    const { currency } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: currency,
    //automatic_payment_methods: {
    //  enabled: true,
    //},
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.get("/greet", async (req, res) => {
	res.send("its working");
});

const PORT = process.env.PORT || 5001;
app.set('port', process.env.PORT)
app.listen(PORT, () -> console.log("Node server listening on port ${PORT}!"));
