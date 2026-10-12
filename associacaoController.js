
const associacoes = [];

function listarAssociacoes(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(JSON.stringify(associacoes));
}

function associarProdutoFornecedor(req, res) {
  let corpo = '';

  req.on('data', parte => {
    corpo += parte;
  });

  req.on('end', () => {
    try {
      const dados = JSON.parse(corpo);

      if (
        dados.produtoId == null ||
        dados.fornecedorId == null
      ) {
        res.writeHead(400);
        res.end('Informe o produtoId e o fornecedorId');
        return;
      }

      const associacao = {
        id: Date.now(),
        produtoId: dados.produtoId,
        fornecedorId: dados.fornecedorId
      };

      associacoes.push(associacao);

      res.writeHead(201, {
        'Content-Type': 'application/json; charset=utf-8'
      });
      res.end(JSON.stringify(associacao));
    } catch (erro) {
      res.writeHead(400);
      res.end('JSON inválido');
    }
  });
}

module.exports = {
  listarAssociacoes,
  associarProdutoFornecedor
};
