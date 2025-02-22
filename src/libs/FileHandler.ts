import http from 'http';
// import fs from 'fs';
import * as fs from 'fs/promises';
import path from 'path';
// import { sendError, sendResponse, ResponseAction } from "./responseUtils.js";
import { sendError, sendResponse } from "./responseUtils.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class FileHandler {
  async serveFile(res: http.ServerResponse, filePath: string, contentType: string = 'text/html'): Promise<void> {
   // not on the same level from 'Server', but one level up -- hence the '../' 
   // const absolutePath = path.resolve(__dirname, `../${filePath}`);
   const absolutePath = path.join(__dirname, '..', filePath);
   // fs.access(filePath, fs.constants.R_OK, (err) => {
   /*
   fs.access(absolutePath, fs.constants.R_OK, err => {
	   if (err) {
		 console.error('File access error:', err);
		 sendError(res, 404, 'File not found');
	   } else {
		 // fs.readFile(filePath, (readErr, data) => {
		 fs.readFile(absolutePath, (readErr, data) => {
		   if (readErr) {
			 console.error('Error reading file:', readErr);
			 sendError(res, 500, 'Error reading file');
		   } else {
			 sendResponse(res, 200, contentType, data);
		   }
		 });
	   }
	 });
	 */
	 try {
		await fs.access(absolutePath, fs.constants.R_OK);
		const data = await fs.readFile(absolutePath);
			// Returns a Promise<Buffer>
		sendResponse(res, 200, contentType, data);
	 } catch(error) {
		if((error as NodeJS.ErrnoException).code === 'ENOENT')
		   sendError(res, 404, 'File not found.');
		else
		   sendError(res, 500, 'Error reading file.');
	 }
   }
}
