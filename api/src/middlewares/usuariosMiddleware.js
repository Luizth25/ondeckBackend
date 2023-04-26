//Middlewares = são funções que acontecem entre uma função e outra, como se fosse o meio do caminho
//ele serve para ser executado antes da função principal ser executada, ele vai validar se o ID é valido

const jwt = require("jsonwebtoken");

module.exports = {
  async userId(request, response, next) {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return response.status(401).json({ msg: "Acesso negado" });
    }

    try {
      const secret = process.env.SECRET;

      jwt.verify(token, secret);
      next();
    } catch (err) {
      return response.status(400).json({ msg: err.msg });
    }
  },
};
