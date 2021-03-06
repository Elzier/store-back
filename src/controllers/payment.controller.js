const dollarsToCents = require('dollars-to-cents')
const { Order } = require('../model')
const { sum } = require('ramda')
const stripe = require('stripe')(
  'sk_test_51IQYXrDXAeuEaQrVhgOX6h2WmkZo9O9a3SiorP4YiGtKU9ZyqMLWcogwlCsliIPqgg1GhaUqzaVsPKXfFHqd8vKf00CYxMhJDe'
)

const createPaymentIntend = async (
  { body: { adress, fullName, phone, email, clientSecret, products } },
  res
) => {
  try {
    if (!adress) {
      throw new Error('Adress is required!')
    }

    const amount = sum(products.map((i) => Number(i.price)))
    const productsIds = products.map(({ _id }) => _id)
    const prepareOrder = {
      fullName,
      adress,
      phone,
      email,
      clientSecret,
      products: productsIds,
      amount,
    }

    const newOrder = new Order(prepareOrder)
    const saveOrder = newOrder.save()

    const paymentIntent = await stripe.paymentIntents.create({
      amount: dollarsToCents(amount),
      currency: 'usd',
      payment_method_types: ['card'],
    })

    return res.status(200).send(paymentIntent)
  } catch (err) {
    res.status(500).send(err)
  }
}

const stripeWebHook = async ({ body }, res) => {
  try {
    console.log(body)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  createPaymentIntend,
}
