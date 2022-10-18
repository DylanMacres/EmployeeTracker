const mysql = require('mysql')


const connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    database: 'tracker_db',
    password: "Cjwq1jhm!",
});

module.exports = connection;