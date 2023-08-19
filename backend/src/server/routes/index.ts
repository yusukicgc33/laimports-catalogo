import { Router } from "express";
import { CamisasController } from "../controllers";
import { HomeApiController } from "../controllers";

const routes = Router();

routes.get('/gerenciar', HomeApiController.home);
routes.get('/gerenciar/camisa', HomeApiController.produto)

routes.get('/camisa', CamisasController.getAll);
routes.get('/camisa/:id', CamisasController.getById);
routes.post('/camisa', CamisasController.create);
routes.put('/camisa/:id', CamisasController.updateById)
routes.delete('/camisa/:id', CamisasController.deleteById)

export {routes};