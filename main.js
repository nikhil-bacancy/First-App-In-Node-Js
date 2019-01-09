
// Modules
const http = require('http');
const fs = require('fs');
const url = require('url');
// Server configuration
const hostname = '127.0.0.1';
const port = 8080;

// Render page
     
    const server = http.createServer(function(request, response) {  
    	
    	let reqUrl = url.parse(request.url).pathname;
		
		console.log(reqUrl);

    	
    	if (reqUrl === '/' || reqUrl === '/favicon.ico') { 
			reqUrl = './index.html';
		}
		else{
			reqUrl = '.' + reqUrl;
		}

		let query = url.parse(request.url,true).query;

		if (Object.keys(query).length !== 0) { 

		   	response.end(`<!DOCTYPE html>
						<html>
						<head>
							<title>Home Page</title>
						</head>
						<body>
							<h1><label> ${query.txtname} </label></h1>
						</body>
						</html>`);  

		}
		else{

			fs.readFile(reqUrl, function (err, html) {
		    
		    if (err) { throw err; }  
			
			response.writeHeader(200, {"Content-Type": "text/html"});  
	       	response.write(html);  
		   	response.end();  
   			
   			});
		}	
		
    }).listen(port, hostname, () => { console.log(`Server running at http://${hostname}:${port}/`) });
