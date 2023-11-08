const express=require ("express");
const router=express.Router();

const {login} = require("../authentication/login");
const {signup} = require("../authentication/signup");
const {confirm} = require("../authentication/confirm");

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/confirm").get(confirm);

module.exports=router;