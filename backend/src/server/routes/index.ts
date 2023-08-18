import { Router } from "express";
import { CamisasController } from "../controllers";

const routes = Router();

routes.get('/camisa', CamisasController.getAll);
routes.get('/camisa/:id', CamisasController.getById);
routes.post('/camisa', CamisasController.create);
routes.put('/camisa/:id', CamisasController.updateById)
routes.delete('/camisa/:id', CamisasController.deleteById)

export {routes};