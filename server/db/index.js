const mysql = require('mysql');
const Promise = require("bluebird");

const database = "budget";
const dbInfo = {
    user: 'root',
    password: 'pawscat',
    database: 'budget'
}

const connection = mysql.createConnection(dbInfo);

const db = Promise.promisifyAll(connection, {multiArgs: true});

db.connectAsync()
    // .then(() => {
    //     console.log(`connected to database ${database}`);
    // })
    // .then(() => {
    //     db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`)
    //     console.log(`${database} created`)
    // })
    // .then(() => )

module.exports = db;