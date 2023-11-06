const express=require ("express");
const router=express.Router();

const {treedata}=require("../treecensus/treecensus_data");
//const {countTrees}=require("../treecensus/tree_count");
const {countTreesByUser}=require("../treecensus/tree_count");
const { map_pointer } = require("../treecensus/map_data");

router.route("/treedata").post(treedata);
//router.route("/countTrees").get(countTrees);
router.route("/countTreesByUser").post(countTreesByUser);
router.route("/map_pointer").get(map_pointer);

module.exports=router;