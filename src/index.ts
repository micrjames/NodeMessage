import Server from "./libs/Server.js";

const PORT = process.env.PORT || 3000;

const server = new Server(typeof PORT === 'string' ? parseInt(PORT, 10) : PORT);
server.start();
