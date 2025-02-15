import http from 'http';
import url from 'url';
import { FileHandler } from "./FileHandler.js";

export class RequestHandler {
  constructor(private fileHandler: FileHandler) {}

  handle(req: http.IncomingMessage, res: http.ServerResponse) {
    const parsedUrl = url.parse(req.url!, true);		// const parsedUrl = path.parse(req.url, true);
    const filePath = parsedUrl.pathname === '/' ? './index.html' : parsedUrl.pathname;
    this.fileHandler.serveFile(res, filePath!);
  }
}
