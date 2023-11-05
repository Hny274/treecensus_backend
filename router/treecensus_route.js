const express=require ("express");
const router=express.Router();

const {treedata}=require("../treecensus/treecensus_data");
//const {countTrees}=require("../treecensus/tree_count");
const {countTreesByUser}=require("../treecensus/tree_count");

router.route("/treedata").post(treedata);
//router.route("/countTrees").get(countTrees);
router.route("/countTreesByUser").post(countTreesByUser);

module.exports=router;