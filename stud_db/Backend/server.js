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

app.get('/first', (req, res) => {
    const sql = "SELECT * FROM first_fa";
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

app.get('/second', (req, res) => {
    const sql = "SELECT * FROM second_fa";
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

app.get('/third', (req, res) => {
    const sql = "SELECT * FROM third_fa";
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

app.get('/studentDetails/:reg_no', (req, res) => {
    const sql = "SELECT sf.s_no, sf.Name, sf.reg_no, s.DoB, s.blood, s.mail, s.mob_no FROM student s JOIN second_fa sf ON s.reg_no = sf.reg_no WHERE s.reg_no = ?"; 
    pool.query(sql, [req.params.reg_no], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json(error);
        }
        // Map the data to include only necessary columns
        const userData = results.map(row => ({
            s_no: row.s_no,
            Name: row.Name,
            reg_no: row.reg_no,
            DoB: row.DoB,
            blood: row.blood,
            mail: row.mail,
            mob_no: row.mob_no
        }));
        res.json(userData);
    });
});

app.listen(8081, () => {
    console.log("Connection Successful");
});