import http from 'http';
import path from 'path';
import { FileHandler } from "./FileHandler.js";
import ServerError from "./ServerError.js";

export class RequestHandler {
    constructor(private fileHandler: FileHandler, private dirName: string = 'public') {}

    handle(req: http.IncomingMessage, res: http.ServerResponse) {
	    try {
		   // const parsedUrl = url.parse(req.url!, true);		// const parsedUrl = path.parse(req.url, true);
		   const parsedUrl = new URL(req.url!, `http://${req.headers.host}`);
		   // const filePath = parsedUrl.pathname === '/' ? './index.html' : parsedUrl.pathname;
		   const filePath = parsedUrl.pathname === '/' ? './index.html' : parsedUrl.pathname.slice(1);
																		   // Remove leading '/'

		   // Determine the content type based on the file extension
		   const ext = path.extname(filePath);
		   let contentType = 'text/html';

		   switch(ext) {
			  case '.css':
				 contentType = 'text/css';
				 break;
			  case '.js':
				 contentType = 'application/javascript';
			  break;
		   }
		   // this.fileHandler.serveFile(res, `${this.dirName}/${filePath}`!, contentType);
		   this.fileHandler.serveFile(res, path.join(this.dirName, filePath), contentType);
		   // Use path.join() for cross-platform compatibility
		} catch(error) {
		   console.error('Request handling error:', error);
		   ServerError.handleError(res, error as Error);
		}
    }
}
