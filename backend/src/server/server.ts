import { routes } from './routes';
import express from 'express';
import cors from 'cors';
import path from 'path'
import ejs from 'ejs';
import 'dotenv/config';
import bodyParser from 'body-parser'

let originURL = 'http://127.0.0.1:5500'

const server = express();

if(process.env.ENVIROMENT === 'production' && process.env.IS_LOCAL_HOST !== 'true'){
    originURL = 'https://laimports-catalogo.onrender.com'
}

server.use(cors({
    origin: `${originURL}`,
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ]
}))
server.use(express.static(path.resolve(__dirname, '..', '..', 'public')))
server.use(express.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use(routes)

server.set('view engine', 'ejs');
server.set('views', './src/server/views'); //path.resolve e join não funcionaram || Só funcionou no render e localhost com o camonho manual

export { server };