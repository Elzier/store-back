const generCrud = require('./gener.controller')
const { Category } = require("../model");

module.exports = {
  ...generCrud(Category)
};
