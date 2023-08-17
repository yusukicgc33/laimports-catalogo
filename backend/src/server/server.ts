import express from 'express';
import 'dotenv/config';
import { routes } from './routes';

const server = express();

server.use(express.json())
server.use(routes)

export { server };