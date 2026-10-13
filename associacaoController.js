const produtos = require('./produtoController');
const fornecedores = require('./fornecedorController');

let associacoes = [];
let proximoId = 1;

exports.listar = (req, res) => res.json(associacoes);

exports.criar = (req, res) => {
  const produtoId = Number(req.body.produtoId);
  const fornecedorId = Number(req.body.fornecedorId);

  if (!produtoId || !fornecedorId) {
    return res.status(400).json({ erro: 'Informe produtoId e fornecedorId.' });
  }
  if (!produtos.obterIds().includes(produtoId)) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }
  if (!fornecedores.obterIds().includes(fornecedorId)) {
    return res.status(404).json({ erro: 'Fornecedor não encontrado.' });
  }
  if (associacoes.some(a => a.produtoId === produtoId && a.fornecedorId === fornecedorId)) {
    return res.status(409).json({ erro: 'Essa associação já existe.' });
  }

  const associacao = { id: proximoId++, produtoId, fornecedorId };
  associacoes.push(associacao);
  res.status(201).json(associacao);
};

exports.excluir = (req, res) => {
  const id = Number(req.params.id);
  if (!associacoes.some(a => a.id === id)) {
    return res.status(404).json({ erro: 'Associação não encontrada.' });
  }
  associacoes = associacoes.filter(a => a.id !== id);
  res.status(204).end();
};
