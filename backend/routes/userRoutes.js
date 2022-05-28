const express = require("express")
const { createUser, showUser, deleteUser, userLogin, showUserByUsername, userLogout, googleLogin, showUserById, showUserByUser, addProfile } = require("../controller/userController")
const router = express.Router()

// register routes
router.route('/register').post(createUser)
router.route('/show').get(showUser)

router.route('/delete-user/:id').delete(deleteUser)
router.route('/show/:username').get(showUserByUser)
// router.route(`/show/:username`).get(showUserByUsername)
router.route('/user/profile/:username').put(addProfile)
// login logout routes
router.route('/login').post(userLogin)
router.route('/logout').get(userLogout)
router.route('/google-login').post(googleLogin)


module.exports = router