
const produtos = [];

function listarProdutos(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(JSON.stringify(produtos));
}

function criarProduto(req, res) {
  let corpo = '';

  req.on('data', parte => {
    corpo += parte;
  });

  req.on('end', () => {
    try {
      const produto = JSON.parse(corpo);
      produto.id = Date.now();
      produtos.push(produto);

      res.writeHead(201, {
        'Content-Type': 'application/json; charset=utf-8'
      });
      res.end(JSON.stringify(produto));
    } catch (erro) {
      res.writeHead(400);
      res.end('JSON inválido');
    }
  });
}

module.exports = {
  listarProdutos,
  criarProduto
};
