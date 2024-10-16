const Cliente = require('../models/cliente');

// Criar novo cliente
exports.createCliente = async (req, res) => {
  const { nome, sobrenome, data_nasc, endereco, qualServicoNecessita, telefone, senha, email } = req.body;

  try {
    const newCliente = await Cliente.create({ nome, sobrenome, data_nasc, endereco, qualServicoNecessita, telefone, senha, email });
    res.status(201).json({ message: 'Cliente criado com sucesso!', newCliente });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
};
