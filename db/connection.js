var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"treecensus"
});

// conn.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
conn.connect((err) => {
    if (err) {
        console.error("Error connecting to database: " + err.stack);
        return;
    }
    console.log("Connected to database ");
});
module.exports=conn;