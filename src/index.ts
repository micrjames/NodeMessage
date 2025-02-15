import http, { IncomingMessage, ServerResponse } from 'http';
import ServerError from "./ServerError.js";

const PORT = process.env.PORT || 3000;

const handleRequest = (req: IncomingMessage, res: ServerResponse): void => {
   try {
	  if(req.url === '/error')
		 throw new ServerError('Custom error message', 400);
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  res.write('Hello, World!');
	  res.end();
   } catch(error) {
	  if(error instanceof ServerError)
		 error.sendResponse(res);
	  else
		 ServerError.handleError(res, error as Error);
	  /*
	  console.error('Error handling request:', error);
	  res.writeHead(500, {'Content-Type': 'text/plain'});
	  res.end();
	  */
   }
};

http.createServer(handleRequest).listen(PORT, () => {
   console.log(`Running on port ${PORT}`);
});
