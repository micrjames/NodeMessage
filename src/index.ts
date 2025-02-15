import http, { IncomingMessage, ServerResponse } from 'http';

const PORT = process.env.PORT || 3000;

const handleRequest = (_: IncomingMessage, res: ServerResponse): void => {
   try {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  res.write('Hello, World!');
	  res.end();
   } catch(error) {
	  console.error('Error handling request:', error);
	  res.writeHead(500, {'Content-Type': 'text/plain'});
	  res.end();
   }
};

http.createServer(handleRequest).listen(PORT, () => {
   console.log(`Running on port ${PORT}`);
});
