import { routes } from './routes';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const server = express();

server.use(cors({
    origin: [
        'http://127.0.0.1:5500',
        'https://laimports-catalogo.onrender.com'
    ],
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ]
}))
server.use(express.json())
server.use(routes)

export { server };