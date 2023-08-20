import { Knex } from './server/database/knex';
import { server } from './server/server';

const port = process.env.PORT || 3333;

const startServer = () => {
    server.listen(port, () => {
        console.log(`[# Server] Servidor Online`);
    });
}

if(process.env.ENVIROMENT === 'production' && process.env.IS_LOCAL_HOST !== 'true'){
    Knex.destroy()
    .then(() => {console.log('Destroy Done')})
    
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