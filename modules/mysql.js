var mysql = require('mysql');

var db = mysql.createConnection({
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'webapp'
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Succesfully connected ! id: "  +db.threadId);
});

module.exports = db;