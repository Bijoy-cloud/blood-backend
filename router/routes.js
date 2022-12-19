const express = require('express')
const router = express.Router();
const donorApi = require('../controller/donorController')
const {register,login} = require('../controller/auth');
const verifyToken = require('../utilis/verifyToken');
router.post("/registerDonor",donorApi.create)
router.get("/findAll-bloodGroup",donorApi.findAll)
router.get("/findAll-bloodGroup",donorApi.findByBloodGroup)
router.post("/register",register)
router.post("/login",login)
module.exports = router;