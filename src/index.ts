import http, { IncomingMessage, ServerResponse } from 'http';

const PORT = process.env.PORT || 3000;

class ServerError extends Error {
   constructor(message: string, public status: number) {
	  super(message);
	  this.name = 'ServerError';
   }

   sendResponse(res: ServerResponse) {
	  res.writeHead(this.status, {'Content-Type': 'text/plain'});
	  res.end(this.message);
   }

   static handleError(res: ServerResponse, error: Error) {
	  let status = 500;
	  let message = 'Internal Server Error';

	  if(error instanceof ServerError) {
		 status = error.status;
		 message = error.message;
	  }

	  res.writeHead(status, {'Content-Type': 'text/plain'});
	  res.end(message);
   }
}
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
