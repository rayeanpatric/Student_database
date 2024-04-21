const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Patric4vr@Sql!',
    database: 'stud_db'
});

app.get('/final_appl', (req, res) => {
    const sql = "SELECT * FROM final_appl";
    pool.query(sql, (error, data) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.json(error);
        }
        // Map the data to include only necessary columns
        const modifiedData = data.map(row => ({
            s_no: row.s_no,
            reg_no: row.reg_no,
            name: row.Name,
            stu_type: row.stu_type
            // Add more columns as needed
        }));
        res.json(modifiedData);
    });
});

app.get('/user', (req, res) => {
    const sql = "SELECT * FROM user"; // Modify the table name here
    pool.query(sql, (error, data) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.json(error);
        }
        // Map the data to include only necessary columns
        const userData = data.map(row => ({
            email: row.email,
            uname: row.uname,
            fac_id: row.fac_id,
            des: row.des,
            degree_id: row.degree_id
            // Add more columns as needed
        }));
        res.json(userData);
    });
});

app.listen(8081, () => {
    console.log("listening");
});