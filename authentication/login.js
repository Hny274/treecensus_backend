const mysql = require("mysql")
const conn = require("../db/connection");
const {loginmail} = require("../email/email");

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

        if (json[0].confirm===0) {
            res.json({"Status":"RuntimeError","Result":{"message":"Confirm Email-Id from Mail"}});
            res.end();
        }
        else{
            if (json[0].email==email&&json[0].password==password) {
                res.json({"status":"Success","message":"Login Successfully","data":{"email":json[0].email,"user_name":json[0].user_name,"id":json[0].userid}});
                loginmail(json[0].email,json[0].user_name);
                res.end();
            }else{
                res.json({"status":"Fail","message":"Wrong Password","data":{}});
                res.end();
            }
        }          
    });
    
}
module.exports = {login};