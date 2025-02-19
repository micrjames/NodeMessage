import http, { IncomingMessage, ServerResponse } from 'http';
import ServerError from "./ServerError.js";
import { RequestHandler } from "./RequestHandler.js";
import { FileHandler } from "./FileHandler.js";

export default class Server {
   private requestHandler: RequestHandler;
   private PORT: string | number;
   constructor(port: string | number, private server: http.Server = http.createServer()) {
	  this.PORT = typeof port === 'string' ? parseInt(port, 10) : port; // Ensure PORT is a number
	  const fileHandler = new FileHandler();
	  this.requestHandler = new RequestHandler(fileHandler);
	  this.server.on('request', this.handleRequest.bind(this));  // Bind 'this' to maintain context
   }

   private handleRequest(req: IncomingMessage, res: ServerResponse) {
	  try {
		 if(req.url === '/error')
			throw new ServerError('Custom error message', 400);
		 /*
		 res.writeHead(200, {'Content-Type': 'text/plain'});
		 res.write('Hello, World!');
		 res.end();
		 */
		 // sendResponse(res, 200, 'text/plain', 'Hello, World!', ResponseAction.WRITE_AND_END);
		 this.requestHandler.handle(req, res)
	  } catch(error) {
		 if(error instanceof ServerError)
			error.sendResponse(res);
		 else
			ServerError.handleError(res, error as Error);	// uncomment -- logs all errors consistently
			console.error('Error handling request:', error);
			/*
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.end();
			*/
			// sendError(res, 500, ''); 
	  }
   };
   private startServer() {
	  this.server.listen(this.PORT, () => {
		 console.log(`Running on port ${this.PORT}`);
	  });
   };

   /*
   start() {
	  // this.server.on('request', this.handleRequest);
	  this.startServer();
   }
   */
   // server.start().catch(console.error);
   async start(): Promise<void> {
	  return new Promise((resolve, reject) => {
		 this.server.once('error', reject);
		 this.startServer();
		 this.server.once('listening', resolve);
	  });
   }
}
