import http from 'http';
import path from 'path';
import { FileHandler } from "./FileHandler.js";

export class RequestHandler {
    constructor(private fileHandler: FileHandler, private dirName: string = 'public') {}

    handle(req: http.IncomingMessage, res: http.ServerResponse) {
	    // const parsedUrl = url.parse(req.url!, true);		// const parsedUrl = path.parse(req.url, true);
	    const parsedUrl = new URL(req.url!, `http://${req.headers.host}`);
	    const filePath = parsedUrl.pathname === '/' ? './index.html' : parsedUrl.pathname;

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
	    this.fileHandler.serveFile(res, `${this.dirName}/${filePath}`!, contentType);
    }
}
