const router = require("express").Router();

const { createGallery } = require("../../controllers/gallery.controller");

const upload = require("../../middlewares/multer.middleware");

router.route("/").post(upload.array('image',10),createGallery);


module.exports = router;