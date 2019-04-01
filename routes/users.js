const express = require('express')
const router = express()
const {authentication, authorization, userAuthentication} = require('../middlewares/authentication')
// const authorization = require('../middlewares/authentication')
const UserController = require('../controllers/userController.js')

router.post('/register', UserController.signup)
router.post('/login', UserController.signin)

router.use(authentication, authorization)
router.get('/', UserController.findAll)
router.get('/:id', userAuthentication, UserController.findByPk)
router.post('/', UserController.create)
router.delete('/:id', UserController.delete)
router.put('/:id', userAuthentication, UserController.update)


module.exports = router;