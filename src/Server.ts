import http, { IncomingMessage, ServerResponse } from 'http';
import ServerError from "./ServerError.js";
import { ResponseAction, sendResponse, sendError } from './responseUtils.js';

export default class Server {
   constructor(private PORT: string | number = 3000, private server: http.Server = http.createServer()) {}

   private handleRequest(req: IncomingMessage, res: ServerResponse) {
	  try {
		 if(req.url === '/error')
			throw new ServerError('Custom error message', 400);
		 /*
		 res.writeHead(200, {'Content-Type': 'text/plain'});
		 res.write('Hello, World!');
		 res.end();
		 */
		 sendResponse(res, 200, 'text/plain', 'Hello, World!', ResponseAction.WRITE_AND_END);
	  } catch(error) {
		 if(error instanceof ServerError)
			error.sendResponse(res);
		 else
			ServerError.handleError(res, error as Error);
		 console.error('Error handling request:', error);
		 /*
		 res.writeHead(500, {'Content-Type': 'text/plain'});
		 res.end();
		 */
		 sendError(res, 500, ''); 
	  }
   };
   private startServer() {
	  this.server.listen(this.PORT, () => {
		 console.log(`Running on port ${this.PORT}`);
	  });
   };

   start() {
	  this.server.on('request', this.handleRequest);
	  this.startServer();
   }
}
