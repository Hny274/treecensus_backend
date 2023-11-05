const mysql = require("mysql");
const conn = require("../db/connection");

// const countTrees = async (req, res, next) => {
//     const sql = "SELECT COUNT(*) AS treeCount FROM `treedata`";

//     conn.query(sql, function (err, result) {
//         if (err) {
//             // Handling error and sending response
//             res.json({ "Status": "Error", "message": err });
//             res.end();
//         } else {
//             // Sending success response with the count of trees
//             const treeCount = result[0].treeCount;
//             res.json({ "Status": "Success", "message":"Tree counted Successfully","treeCount": treeCount });
//             res.end();
//         }
//     });
// };


const countTreesByUser = async (req, res, next) => {
    const userEmail = req.body.email; // Assuming the user's email is sent in the request body

    // SQL query to count trees tagged by the user and total trees in the treedata table
    const sql = `
        SELECT
            (SELECT COUNT(*) FROM treedata WHERE user = ?) AS userTreeCount,
            (SELECT COUNT(*) FROM treedata) AS totalTreeCount
    `;

    conn.query(sql, [userEmail], function (err, result) {
        if (err) {
            // Handling error and sending an error response
            res.json({ "Status": "Error", "message": err });
        } else {
            // Sending a success response with the count of trees for the user and total trees in the treedata table
            const userTreeCount = result[0].userTreeCount;
            const totalTreeCount = result[0].totalTreeCount;
            res.json({
                "Status": "Success",
                "userEmail": userEmail,
                "treeCountByUser": userTreeCount,
                "totalTreeCount": totalTreeCount
            });
        }
    });
};

module.exports = { countTreesByUser };

//module.exports = { countTrees };

