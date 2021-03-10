const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose')

const schema = new Schema({
  adress: {
    type: String,
    default: '',
  },
  fullName: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  amount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: 'Pending'
  },
  products: [
    {
      type: ObjectId,
      ref: 'Product',
    },
  ],
})

module.exports = model('Order', schema)
