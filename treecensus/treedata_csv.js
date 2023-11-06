const mysql = require("mysql");
const conn = require("../db/connection");
const fastcsv=require("fast-csv");

const fs=require("fs");
const ws=fs.createWriteStream("treedata.csv");

const treedata_csv=async (req, res, next)=>{
    conn.query("SELECT * FROM treedata",function(err,data){
        if(err) throw err;

        const jsonData=JSON.parse(JSON.stringify(data));
        //console.log("jsonData",jsonData);
        res.json({"status":"Success","message":"Write to treedata.csv successfully!","data":jsonData});

        fastcsv.write(jsonData,{headers:true})
        // .on("finish",function(){
        //     console.log("Write to treedata.csv successfully!");
        // })
        .pipe(ws);
        res.end();
    })
}

module.exports={treedata_csv};