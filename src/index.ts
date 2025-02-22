import Server from "./libs/Server.js";

const PORT = process.env.PORT || 3000;

const server = new Server(typeof PORT === 'string' ? parseInt(PORT, 10) : PORT);

(() => {
   try {
	  // server.start();
	  server.start().catch(console.error);
	  console.log('Server started successfully.');
   } catch(error) {
	  console.error('Failed to start server:', error);
	  process.exit(1);
   }
})();
