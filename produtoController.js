let produtos = [];
let proximoId = 1;

exports.listar = (req, res) => res.json(produtos);

exports.criar = (req, res) => {
  const { nome, codigoBarras, descricao, quantidade, categoria, validade } = req.body;
  if (!nome || !codigoBarras) {
    return res.status(400).json({ erro: 'Nome e código de barras são obrigatórios.' });
  }
  if (produtos.some(p => p.codigoBarras === String(codigoBarras))) {
    return res.status(409).json({ erro: 'Já existe produto com esse código de barras.' });
  }
  const produto = {
    id: proximoId++,
    nome: String(nome).trim(),
    codigoBarras: String(codigoBarras).trim(),
    descricao: descricao || '',
    quantidade: Number(quantidade || 0),
    categoria: categoria || '',
    validade: validade || ''
  };
  produtos.push(produto);
  res.status(201).json(produto);
};

exports.atualizar = (req, res) => {
  const produto = produtos.find(p => p.id === Number(req.params.id));
  if (!produto) return res.status(404).json({ erro: 'Produto não encontrado.' });
  const { nome, codigoBarras, descricao, quantidade, categoria, validade } = req.body;
  if (codigoBarras && produtos.some(p => p.id !== produto.id && p.codigoBarras === String(codigoBarras))) {
    return res.status(409).json({ erro: 'Já existe produto com esse código de barras.' });
  }
  Object.assign(produto, {
    ...(nome !== undefined && { nome: String(nome).trim() }),
    ...(codigoBarras !== undefined && { codigoBarras: String(codigoBarras).trim() }),
    ...(descricao !== undefined && { descricao }),
    ...(quantidade !== undefined && { quantidade: Number(quantidade) }),
    ...(categoria !== undefined && { categoria }),
    ...(validade !== undefined && { validade })
  });
  res.json(produto);
};

exports.excluir = (req, res) => {
  const id = Number(req.params.id);
  if (!produtos.some(p => p.id === id)) return res.status(404).json({ erro: 'Produto não encontrado.' });
  produtos = produtos.filter(p => p.id !== id);
  res.status(204).end();
};

exports.obterIds = () => produtos.map(p => p.id);
