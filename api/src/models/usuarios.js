//O module tem a responsabilidade de se comunicar com o banco de como vai ser o schema
const mongoose = require("mongoose");

//Esse schema e a maneira como organizamos os dados no banco de dados
const usuariosSchema = new mongoose.Schema({
  //o ID esta aqui pela fato de que vou deixar o backend controlar o ID
  _id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Usuarios", usuariosSchema);
