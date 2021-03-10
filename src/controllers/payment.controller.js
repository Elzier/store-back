const dollarsToCents = require('dollars-to-cents')
const { createUserConfirmOrderEmail, createAdminConfirmOrderEmail } = require('./mail.controller')
const { Order } = require('../model')
const { sum } = require('ramda')
const stripe = require('stripe')(
  'sk_test_51IQYXrDXAeuEaQrVhgOX6h2WmkZo9O9a3SiorP4YiGtKU9ZyqMLWcogwlCsliIPqgg1GhaUqzaVsPKXfFHqd8vKf00CYxMhJDe'
)

const createPaymentIntend = async (
  { body: { adress, fullName, phone, email, products } },
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
      products: productsIds,
      amount,
    }

    const newOrder = new Order(prepareOrder)
    const saveOrder = await newOrder.save()

    const paymentIntent = await stripe.paymentIntents.create({
      amount: dollarsToCents(amount),
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        orderId: String(saveOrder._id),
      },
    })

    return res.status(200).send({
      paymentIntent,
      saveOrder,
    })
  } catch (err) {
    res.status(500).send(err)
  }
}

const stripeWebHook = async ({ body: { data } }, res) => {
  try {
    const { metadata: { orderId } } = data.object
    const order = await Order.findById(orderId)
    if (!order) {
      throw new Error('Order not found')
    }

    await Order.findByIdAndUpdate(orderId, { status: 'Paid' })
    createUserConfirmOrderEmail(order)
    createAdminConfirmOrderEmail(order)

    return res.status(200).send('success')
  } catch (err) {
    console.log(err, 'ERROR')
    res.status(500).send(err)
  }
}

module.exports = {
  createPaymentIntend,
  stripeWebHook,
}