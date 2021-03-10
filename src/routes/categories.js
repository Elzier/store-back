const router = require("express-promise-router")()
const { category } = require("../controllers")
const { checkJWtSign } = require('../middlewares/checkJwt.middleware')

router.route('/:id').get(category.get)
router.route('/').post(category.create)
router.route('/').get(checkJwtSign, category.getAll)
router.route('/:id').put(category.update)
router.route('/:id').delete(category.delete)
 

module.exports = router