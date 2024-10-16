const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Modelo de usuário

// Registro de novo usuário
exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  // Hashing da senha antes de salvar
  const hashedPassword = await bcrypt.hash(senha, 10);

  try {
    const newUser = await User.create({ nome, email, senha: hashedPassword });
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

// Login e geração de token JWT
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });

    res.status(200).json({ message: 'Autenticado com sucesso', token });
  } catch (error) {
    res.status(500).json({ error: 'Erro no login' });
  }
};
