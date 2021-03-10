require('dotenv').config()
const { User } = require('../model')
const jwt = require('jsonwebtoken')


const login = async ({ body: { email, password }}, res) => {
  try {
    const userFound = await User.findOne({ email })
    const errorMessage = 'Sorry, login or password is incorrect! Please recheck and try again.'

    if (!userFound) {
      return res.status(403).send({
        errorMessage
      })
    }
    const passwordCorrect = userFound.password === password

    if (!passwordCorrect) {
      return res.status(403).send({
        errorMessage
      })
    }
    const accessToken = jwt.sign({
      userId: userFound._id,
      email: userFound.email
    }, process.env.JWT_SECRET)

    return res.status(200).send({
      accessToken,
      email: userFound.email
    })

  } catch (err) {
    return res.status(403).send({
      errorMessage,
      err
    })
  }
}

const signup = async ({ body: { username, email, password }}, res) => {
  try {
    const userFound = await User.findOne({ email })
    if (userFound) {
      return res.status(403).send({
        message: 'User with this email already exists. Try something else.'
      })
    }

    const createUser = await new User({ username, email, password })
    await createUser.save()
    return res.status(200).send({
      message: 'New User created.'
    })

  } catch (err) {
    return res.status(403).send({
      message: 'Sorry, login or password is incorrect! Please recheck and try again.',
      err
    })
  }
}




module.exports = {
  login,
  signup
}