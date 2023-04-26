//O controller vai ser quem vai receber a requisição do cliente seja do navegador, app etc.
//Ele vai abstrair esses estados antes de enviar para o banco de dados.
const { v4: uuid } = require("uuid");

//Validações
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usuarios = require("../models/usuarios");

//Aqui estamos exportando todas as funções das nossas rotas
module.exports = {
  async index(request, response) {
    //pegando o ID da URL
    const id = request.params.id;

    //Verifica se o usuário existe no banco de dados
    //O segundo parâmetro exclui a senha do usuário do retorno
    const user = await Usuarios.findById(id, "-password");

    if (!user) {
      return response.status(404).json({ msg: "Usuário não encontrado" });
    }

    response.status(200).json({ user });
  },

  //A rota de criação
  async register(request, response) {
    const { email, password } = request.body;
    //Essa função verifica se o usuário existe no nosso banco de dados
    const userExists = await Usuarios.findOne({ email: email });

    //aqui estou fazendo a criptografia do meu password.
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    if (userExists) {
      return response.status(400).json({ msg: "Usuário já Cadastrado" });
    }

    const usuarios = new Usuarios({
      _id: uuid(),
      email,
      password: passwordHash,
    });

    try {
      //Com o save ele salva uma informação no banco de dados.
      await usuarios.save();

      return response
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso" });
    } catch (err) {
      response.status(500).json({ error: "Ocorreu um erro tente novamente" });
    }
  },

  async login(request, response) {
    const { email, password } = request.body;
    const user = await Usuarios.findOne({ email: email });

    //verifica se o usuário existe no banco de dados
    if (!user) {
      return response.status(404).json({ msg: "Usuário não encontrado" });
    }

    //verifica se o usuário e a senha estão corretos
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return response.status(400).json({ msg: "Usuários ou senha incorretos" });
    }

    try {
      const secret = process.env.SECRET;

      const token = jwt.sign(
        {
          id: user.id,
        },
        secret
      );

      response.status(200).json({ msg: "Sucesso", token });
    } catch (err) {
      response.status(500).json({ error: "Ocorreu um erro tente novamente" });
    }
  },
};
