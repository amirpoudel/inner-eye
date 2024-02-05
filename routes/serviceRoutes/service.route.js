const express = require('express');
const router = express.Router();

const {createService,getServices, updateService,deleteService} = require('../../controllers/service.controller')

router.route("/").post(createService).get(getServices);

router.route("/:id").patch(updateService).delete(deleteService);


module.exports = router;
