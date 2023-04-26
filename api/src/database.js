const mongoose = require("mongoose");

//Essa é a função que se conecta com a base de dados
function connectToDatabase() {
  //Ele recebe 2 parâmetros um é a URL que ele vai se conectar o outro e oque ele deve fazer nessa URL
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("Connected to the database"));
}

module.exports = connectToDatabase;
