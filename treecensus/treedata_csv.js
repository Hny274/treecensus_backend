const mysql = require("mysql");
const conn = require("../db/connection");

const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;

const exportToCsv = async (req, res, next) => {
    // SQL query to select all data from the treedata table
    const sql = `
        SELECT treeid, height, latitude, longitude, date, diameter, harmprac, health, owner, botanical, local, landmark, user
        FROM treedata
    `;

    conn.query(sql, function (err, result) {
        if (err) {
            // Handling error and sending an error response
            return res.status(500).json({ "Status": "Error", "message": err.message });
        }

        // Generating CSV data
        const csvData = result;

        // Setting up CSV stringifier with headers
        const csvStringifier = createCsvStringifier({
            header: [
                { id: 'treeid', title: 'Tree ID' },
                { id: 'height', title: 'Height' },
                { id: 'latitude', title: 'Latitude' },
                { id: 'longitude', title: 'Longitude' },
                { id: 'date', title: 'Date' },
                { id: 'diameter', title: 'Diameter' },
                { id: 'harmprac', title: 'Harmprac' },
                { id: 'health', title: 'Health' },
                { id: 'owner', title: 'Owner' },
                { id: 'botanical', title: 'Botanical' },
                { id: 'local', title: 'Local' },
                { id: 'landmark', title: 'Landmark' },
                { id: 'user', title: 'User' }
            ]
        });

        // Converting data to CSV format
        //const csvString = csvStringifier.stringifyRecords(csvData);
        const csvString = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(csvData);

        // Sending the CSV string as a response
        res.setHeader('Content-Type', 'text/csv');
        //res.setHeader('Content-Disposition', 'attachment; filename=tree_data.csv');
        return res.status(200).attachment("treed.csv").send(csvString);
    });
};

module.exports = { exportToCsv };


