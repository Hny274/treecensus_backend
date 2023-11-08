const mysql = require("mysql");
const conn = require("../db/connection");
const {signupmail, signupnmail} = require("../email/email")
// const signup = async (req, res, next) => {
//     try {
//         const { userid, first_name, last_name, email, password } = req.body;
//         var values = [[userid, first_name, last_name, email, password]];
//         var sql = "INSERT INTO `userdata` (userid,first_name,last_name,email,password) VALUES(?)";
//         conn.query(sql, values, function (err, result, feilds) {
//             if (err) throw err;
//             else {
//                 const userData = {
//                     userid: userid,
//                     first_name: first_name,
//                     last_name: last_name,
//                     email: email
//                 };
//                 res.json({ "status": "Success", "message": "User Created Successfully", "data": userData });
//                 res.end();

//             }
//             console.log(result.insertId);
//         })
//     } catch (error) {
//         console.log("Error :: " + error);
//     }
// }

const signup = async (req, res, next) => {
    let timestamp = Date.now();
    console.log(timestamp);
    const { userid, user_name, mobile, email, password } = req.body;
    const checkEmailQuery = "SELECT * FROM `userdata` WHERE email = ?";
    conn.query(checkEmailQuery, [email], (err, result) => {
        if (err) throw err;
            // Handle the error
            // Change in file
        else {
            if (result.length > 0) {
                // Email already exists, handle accordingly
                res.json({ "Status": "error", "message": "Email already exists" });
                res.end();
            } else {
                // Email doesn't exist, proceed with the insertion
                const insertQuery = "INSERT INTO `userdata` (userid, user_name, mobile, email, password, tocken) VALUES (?, ?, ?, ?, ?, ?)";
                conn.query(insertQuery, [userid, user_name, mobile, email, password, timestamp], (err, result) => {
                    // Handle the insertion result
                    if (err) throw err;
                    else {
                        const userData = {
                            userid: userid,
                            user_name:user_name,
                            mobile:mobile,
                            email: email
                        };
                        res.json({ "status": "Success", "message": "User Created Successfully", "data": userData });
                        signupnmail(email,user_name,timestamp);
                        res.end();

                }
                console.log(result.insertId);
                    });
            }
        }
    });
};

module.exports = { signup };