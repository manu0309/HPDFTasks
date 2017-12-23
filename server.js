var express = require('express');
var request = require('request');
var path = require('path');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

 
var app = express();
app.use(cookieParser())
app.use(bodyParser.json());

app.get('/',function(req,res){
	res.send('Hello World-Manu');
});


var data1, data2;
app.get('/authors', function(req, res, next){


request('https://jsonplaceholder.typicode.com/users', {json: true}, (error, response, body) => {
	if(error) {return console.log(error);} ;

    data1 = body;
 
request('https://jsonplaceholder.typicode.com/posts', {json: true}, (error, response, body) => {
if(error) {return console.log(error);} ;

  	data2 = body;
   	
   	next();

});

});


}, function(req, res){

	var numPosts = [] ;
	var author_post = "Author Name -- Number of Posts"+"<br />";
 	for(var i = 0 ; i < data1.length; i++)
 	{
 		var authorName = data1[i].name ;
 		var authorId = data2[i].id ;

 		numPosts[i] = 0 ;
 		for(var j = 0 ; j < data2.length ; j++)
 		{
 			if(data2[j].userId == authorId)
 			{	
 				numPosts[i] += 1 ;

 			}


 		}

 		author_post += authorName+" -- "+numPosts[i]+"<br />";




 	}

 	 		res.send(author_post);

});


app.get('/setcookie',function(req, res){
     
	if(req.cookies.Manu == undefined){
		res.cookie('Manu' , '20').send('Cookie is set');		
	}
	else{
		res.send("Cookie is present");
	}

     
});


app.get('/getcookies',function(req,res){
	var cookie = req.cookies;
	res.send('Manu'+': '+cookie.manu);

});



app.get('/robots.txt', function (req, res, next){ 

	res.status(403).send("Access Denied");
});


app.get('/html', function(req, res){

  res.sendFile(path.join(__dirname,  'index.html'));


});


app.get('/image', function (req, res){ 

	  res.sendFile(path.join(__dirname, 'image.png'));
});	


function createTemplate (){

var htmlTemplate = `
<html>
	<head>
	
	</head>
	<body>
		<div>
			<h3> Add Text </h3>
			<div>
				<input type="text" id="information" placeholder="information"/>
				<input type="submit" id="submit_btn"/>
			</div>
		</div>
		<script type="text/javascript" src="/submit.js">
        </script>
	</body>
</html>`;

return htmlTemplate;

}

app.get('/submit.js',function(req,res){

	res.sendFile(path.join(__dirname, 'submit.js'));
});

app.get('/input',function(req,res){

	res.send(createTemplate());

});


app.post('/text', function(req, res){

var text = req.body.information ;
console.log(text);

res.send("Get Value");

});


app.listen(8081, function(){
	console.log('listening on port 8081!');
});