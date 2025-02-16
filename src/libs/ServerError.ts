import { ServerResponse } from 'http';
import { sendError } from './responseUtils.js';

export default class ServerError extends Error {
   constructor(message: string, public status: number) {
	  super(message);
	  this.name = 'ServerError';
   }

   sendResponse(res: ServerResponse) {
	  /*
	  res.writeHead(this.status, {'Content-Type': 'text/plain'});
	  res.end(this.message);
	  */

	  sendError(res, this.status, this.message);
   }

   static handleError(res: ServerResponse, error: Error) {
	  let status = 500;
	  let message = 'Internal Server Error';

	  if(error instanceof ServerError) {
		 status = error.status;
		 message = error.message;
	  }
	  /*
	  res.writeHead(status, {'Content-Type': 'text/plain'});
	  res.end(message);
	  */
	  sendError(res, status, message);
   }
}
