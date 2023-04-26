const express = require("express");
const routes = express.Router();

const usuariosController = require("./controllers/usuariosController");
const usuariosMiddleware = require("./middlewares/usuariosMiddleware");

//GET: Buscar uma informação.
//POST: Criar uma informação.
//PUT: Editar uma informação por completo.
//PATCH: Modificar apenas uma parte da informação.
//DELETE: Deleta uma informação.

//O Request é oque a rota envia para o backend.
//O Response é oque o backend vai nos enviar assim que a rota for acessada.
//Aqui estamos pegando todas as funções que foram exportadas e estamos usando na nossa rota
routes.get(
  "/usuarios/:id",
  usuariosMiddleware.userId,
  usuariosController.index
);

routes.post("/register", usuariosController.register);
routes.post("/login", usuariosController.login);
module.exports = routes;
