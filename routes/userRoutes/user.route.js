const router = require('express').Router();

const {registerUser} = require('../../controllers/user.controller');


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;