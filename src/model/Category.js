const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose')

const schema = new Schema({
  title: {
    type: String,
    default: '',
  },
  description: {
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
  products: [
    {
      type: ObjectId,
      ref: 'Product',
    },
  ],
  cleintSecret: {
    type: String,
    default: '',
  },
  amount: {
    type: Number,
    default: 0,
  },
})

module.exports = model('Category', schema)
