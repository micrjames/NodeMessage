import http from 'http';
import path from 'path';
import { FileHandler } from "./FileHandler.js";
import ServerError from "./ServerError.js";
import { IRequestHandler } from "./responseUtils";

export class RequestHandler implements IRequestHandler {

    private static readonly MIME_TYPES: Record<string, string> = {
	   '.html': 'text/html',
	   '.css': 'text/css',
	   '.js': 'application/javascript',
    };
    constructor(private fileHandler: FileHandler, private dirName: string = 'public') {}

	/*
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
    */
	async handle(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
	    try {
		   const parsedUrl = new URL(req.url ?? '', `http://${req.headers.host}`);
		   const filePath = parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname.slice(1);
		   const ext = path.extname(filePath);
		   const contentType = RequestHandler.MIME_TYPES[ext] || 'application/octet-stream';

		   await this.fileHandler.serveFile(res, path.join(this.dirName, filePath), contentType);
	    } catch (error) {
		   ServerError.handleError(res, error as Error);
	    }
	}
}
