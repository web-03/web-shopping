var mysql = require('mysql');
var config = require('./config')
var connection = mysql.createConnection(config);
connection.connect()
module.exports = connection;