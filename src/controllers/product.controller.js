const generCrud = require('./gener.controller')
const { Product } = require('../model')

module.exports = {
  ...generCrud(Product)
}