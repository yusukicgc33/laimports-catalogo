import { server } from './server/server';

const port = process.env.PORT || 3333;

server.listen(port, () => {
    console.log(`[# Server] Servidor Online`);
});