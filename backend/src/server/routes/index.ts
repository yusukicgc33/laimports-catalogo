import { Router } from "express";
import { CamisasController } from "../controllers";

const routes = Router();

routes.post('/nova-camisa', CamisasController.create);

export {routes};