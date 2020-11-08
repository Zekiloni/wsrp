var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var db = require(__dirname + '/modules/mysql.js')


app.use('/assets',express.static(__dirname + '/assets'));
app.use('/modules',express.static(__dirname + '/modules'));

//for /index page
app.get('/', function(request,response){
	response.sendFile('index.html',{root:path.join(__dirname,'./views')});
});

//for /home page
app.get('/home', function(request,response){
	response.sendFile('home.html',{root:path.join(__dirname,'./views')});
});

//for /about page
app.get('/about', function(request,response){
	response.sendFile('about.html',{root:path.join(__dirname,'./views')});
});

//for /contact page
app.get('/contact', function(request,response){
	response.sendFile('contact.html',{root:path.join(__dirname,'./views')});
});

app.listen(3000,function(){
	console.log('Listening at port 3000...');
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});


module.exports = app;

