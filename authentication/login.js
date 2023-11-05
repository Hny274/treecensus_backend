const mysql = require("mysql")
const conn = require("../db/connection");

const login = async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    var sql ="SELECT * FROM `userdata` WHERE email =?"//+ mysql.escape(email);
    conn.on('error', function(err) {
        console.log("[mysql error]",err);
    });
    await conn.query(sql,[email],function (err,result,fields) {
        if (err) {
            res.json({"Status":"Error","Result":err});
            res.end();
        };
        var string=JSON.stringify(result);
        var json =  JSON.parse(string);
        if (json.length==0) {
            res.json({"status":"Fail","message":"NO user Found","data":{}});
            res.end();
        }
        else{
            if (json[0].email==email&&json[0].password==password) {
                res.json({"status":"Success","message":"Login Successfully","data":{"email":json[0].email,"first_name":json[0].first_name,"last_name":json[0].last_name,"id":json[0].userid}});
                res.end();
            }
            else{
                res.json({"status":"Fail","message":"Wrong Password","data":{}});
                res.end();
            }
        }
    });
    
}
module.exports = {login};