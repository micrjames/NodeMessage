import Server from "./Server.js";

const PORT = process.env.PORT || 3000;

const server = new Server(PORT);
server.start();
