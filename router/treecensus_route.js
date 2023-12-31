const express=require ("express");
const router=express.Router();

const {treedata}=require("../treecensus/treecensus_data");
//const {countTrees}=require("../treecensus/tree_count");
const {countTreesByUser}=require("../treecensus/tree_count");
const { map_pointer } = require("../treecensus/map_data");
const { exportToCsv } = require("../treecensus/treedata_csv");

router.route("/treedata").post(treedata);
//router.route("/countTrees").get(countTrees);
router.route("/countTreesByUser").post(countTreesByUser);
router.route("/map_pointer").get(map_pointer);
router.route("/exportToCsv").get(exportToCsv);

module.exports=router;