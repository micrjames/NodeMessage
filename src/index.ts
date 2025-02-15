import http, { IncomingMessage, ServerResponse } from 'http';

const PORT = process.env.PORT || 3000;

http.createServer((_: IncomingMessage, res: ServerResponse) => {
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.write('Hello, World!');
   res.end();
}).listen(PORT, () => {
   console.log(`Running on port ${PORT}`);
});
