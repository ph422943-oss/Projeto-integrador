let fornecedores = [];
let proximoId = 1;

exports.listar = (req, res) => res.json(fornecedores);

exports.criar = (req, res) => {
  const { empresa, cnpj, endereco, telefone, email, contatoPrincipal } = req.body;
  if (!empresa || !cnpj) {
    return res.status(400).json({ erro: 'Empresa e CNPJ são obrigatórios.' });
  }
  const cnpjLimpo = String(cnpj).replace(/\D/g, '');
  if (fornecedores.some(f => f.cnpj === cnpjLimpo)) {
    return res.status(409).json({ erro: 'Já existe fornecedor com esse CNPJ.' });
  }
  const fornecedor = {
    id: proximoId++,
    empresa: String(empresa).trim(),
    cnpj: cnpjLimpo,
    endereco: endereco || '',
    telefone: telefone || '',
    email: email || '',
    contatoPrincipal: contatoPrincipal || ''
  };
  fornecedores.push(fornecedor);
  res.status(201).json(fornecedor);
};

exports.atualizar = (req, res) => {
  const fornecedor = fornecedores.find(f => f.id === Number(req.params.id));
  if (!fornecedor) return res.status(404).json({ erro: 'Fornecedor não encontrado.' });
  const { empresa, cnpj, endereco, telefone, email, contatoPrincipal } = req.body;
  const cnpjLimpo = cnpj === undefined ? undefined : String(cnpj).replace(/\D/g, '');
  if (cnpjLimpo && fornecedores.some(f => f.id !== fornecedor.id && f.cnpj === cnpjLimpo)) {
    return res.status(409).json({ erro: 'Já existe fornecedor com esse CNPJ.' });
  }
  Object.assign(fornecedor, {
    ...(empresa !== undefined && { empresa: String(empresa).trim() }),
    ...(cnpjLimpo !== undefined && { cnpj: cnpjLimpo }),
    ...(endereco !== undefined && { endereco }),
    ...(telefone !== undefined && { telefone }),
    ...(email !== undefined && { email }),
    ...(contatoPrincipal !== undefined && { contatoPrincipal })
  });
  res.json(fornecedor);
};

exports.excluir = (req, res) => {
  const id = Number(req.params.id);
  if (!fornecedores.some(f => f.id === id)) return res.status(404).json({ erro: 'Fornecedor não encontrado.' });
  fornecedores = fornecedores.filter(f => f.id !== id);
  res.status(204).end();
};

exports.obterIds = () => fornecedores.map(f => f.id);
