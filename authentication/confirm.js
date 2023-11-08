const mysql = require("mysql");
const conn = require("../db/connection");

const confirm=(req,res)=>{
         const {tocken:tocken} = req.query;
         var sql = "UPDATE `userdata` SET `confirm`=TRUE WHERE `tocken`=?";
         conn.query(sql,[tocken],function (err,result,fields) {
             if (err) {
                 res.send("<h1>Error in Confirmation</h1>")
                 res.end(); 
             }
             else{
                 res.send("<h1>Sucessfully Registered Email</h1><h3>Go to Login</h3>")
                 res.end();
             }
         })};

module.exports={confirm};   