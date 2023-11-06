const mysql = require("mysql");
const conn = require("../db/connection");

const map_pointer = async (req, res, next) => {
    // SQL query to select specific columns from the treedata table for all trees
    const sql = `
        SELECT treeid, latitude, longitude, user, owner
        FROM treedata
    `;

    conn.query(sql, function (err, result) {
        if (err) {
            // Handling error and sending an error response
            return res.status(500).json({ "Status": "Error", "message": err.message });
        }

        // Sending a success response with the selected columns for all trees from the database
        return res.status(200).json({
            "Status": "Success",
            "treeData": result
        });
    });
};

module.exports = { map_pointer };
