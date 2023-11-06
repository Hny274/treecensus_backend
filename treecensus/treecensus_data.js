const mysql = require("mysql");
const conn = require("../db/connection");

const treedata = async (req, res, next) => {
    const { treeid, height, latitude, longitude, date, diameter, harmprac, health, owner, botanical, local, landmark, user } = req.body;
    
    // Organizing data in an array without hardcoded values
    const values = [treeid, height, latitude, longitude, date, diameter, harmprac, health, owner, botanical, local, landmark, user];
    
    // SQL query to insert data into the 'treecensus_data' table
    const sql = "INSERT INTO `treedata`(treeid, height, latitude, longitude, date, diameter, harmprac, health, owner, botanical, local, landmark, user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    // Executing the SQL query
    conn.query(sql, values, function (err, result) {
        if (err) {
            // Handling error and sending response
            res.json({ "Status": "Error", "message": err });
            res.end();
        } else {
            // Checking if the result object has the insertId property
            const insertedId = result && result.insertId ? result.insertId : null;
            
            // Sending success response along with the inserted data and ID
            res.json({ "Status": "Success", "message": "Data entered successfully", "data": req.body});
            res.end();
        }
        
        // Logging the entire result object for debugging purposes
        console.log(result);
    });
};



module.exports={treedata};