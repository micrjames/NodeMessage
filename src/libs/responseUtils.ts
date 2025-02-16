import http from 'http';

export enum ResponseAction {
  WRITE_AND_END,
  END_ONLY
}

export function sendResponse(res: http.ServerResponse, statusCode: number, contentType: string, data: any, action: ResponseAction = ResponseAction.END_ONLY, writeData?: any) {
  res.writeHead(statusCode, {'Content-Type': contentType});
  
  if (action === ResponseAction.WRITE_AND_END && writeData !== undefined) {
    res.write(writeData);
  }
  
  res.end(data);
}

export function sendError(res: http.ServerResponse, statusCode: number, message: string) {
  sendResponse(res, statusCode, 'text/plain', message);
}
