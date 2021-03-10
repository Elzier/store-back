require('dotenv').config()
const { verify } = require('jsonwebtoken')

const checkJwtSign = async (req, res, next) => {
  const { headers: { authorization } } = req
  if (authorization) {
    const token = authorization.split(' ')[1]
    verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(403).send({
          meassage: 'User is not authorized!123'
        })
      }
    })
    return next()
  }
  return res.status(403).send({
    meassage: 'User is not authorized!'
  })
}

module.exports = { checkJwtSign }