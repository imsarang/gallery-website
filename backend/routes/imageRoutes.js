const express = require("express")
const { uploadImage, deleteImage, getImageByUser, getImageById, getAllImage, getImageByName, getImageByCategory, deleteImageByUrl, addToChoice, removeChoices} = require("../controller/imageController")
const { authenticate } = require("../middleware/auth")
const router = express.Router()

router.route('/upload').post(uploadImage)
router.route(`/delete/:id`).delete(deleteImage)
router.route(`/images/:created_by`).get(getImageByUser)
router.route(`/image/:id`).get(getImageById)
router.route(`/images`).get(getAllImage)
router.route(`/images/category/:category`).get(getImageByCategory)

router.route(`/image/:choice`).put(addToChoice)
router.route(`/imageDel/:choice/:id`).put(removeChoices)
// router.route(`/delete/:image_url`).delete(deleteImageByUrl)
// router.route(`/images/:name`).get(getImageByName)
module.exports = router