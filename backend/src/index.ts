import { Knex } from './server/database/knex';
import { server } from './server/server';

const urlProd = 'https://api-laimports-catalogo.onrender.com/camisa/1'
const urlDev = 'http://localhost:5555/camisa/1'

const port = process.env.PORT || 3333;

const startServer = () => {
    server.listen(port, () => {
        console.log(`[# Server] Servidor Online`);
    });
    const keepItAlive = setInterval(() => {
        console.log('[# Keep It Alive] Chamando API...'); 
        fetch(`${urlProd}`, {method: 'GET'}).then(res => {return res.json()})
    }, 15000)
}

if(process.env.ENVIROMENT === 'production' && process.env.IS_LOCAL_HOST !== 'true'){    
    Knex.migrate
        .latest()
        .then(() => {
            console.log('Migrate done');
            startServer()
        })
        .catch(console.log)
}else{
    startServer()
}