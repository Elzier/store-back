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
  clentSecret: {
    type: String,
    default: '',
  },
  products: [
    {
      type: ObjectId,
      ref: 'Product',
    },
  ],
})

module.exports = model('Order', schema)
