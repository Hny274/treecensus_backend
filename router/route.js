const express=require ("express");
const router=express.Router();

const {login} = require("../authentication/login");
const {signup} = require("../authentication/signup");

router.route("/login").post(login);
router.route("/signup").post(signup);

module.exports=router;