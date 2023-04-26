//Ele basicamente e repensável em dizer para o node entender o novo .env
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const connectToDatabase = require("./database");

connectToDatabase();

const app = express();
//Estamos usando o use que vem do express usando as rotas que estamos manipulando

//Essa const foi criara para salvar a porta caso exita alteração.
const port = 3333;

app.use(cors());
//Dessa forma o express passa a entender o json
app.use(express.json());
app.use(routes);

//Estamos usando o listen para informar que ele vai escutar essa rota.
//O primeiro parâmetro é a nossa rota que queremos que ele escute.
app.listen(port, () => {
  console.log(`Backend started at http://localhost:${port}`);
});
