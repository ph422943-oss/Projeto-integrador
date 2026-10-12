
const http = require('http');
const produtos = require('./produtoController');
const fornecedores = require('./fornecedorController');
const associacoes = require('./associacaoController');

const server = http.createServer((req, res) => {
const rota = req.url;
const metodo = req.method;

if (metodo === 'GET' && rota === '/produtos') {
return produtos.listarProdutos(req, res);
}

if (metodo === 'POST' && rota === '/produtos') {
return produtos.criarProduto(req, res);
}

if (metodo === 'GET' && rota === '/fornecedores') {
return fornecedores.listarFornecedores(req, res);
}

if (metodo === 'POST' && rota === '/fornecedores') {
return fornecedores.criarFornecedor(req, res);
}

if (metodo === 'GET' && rota === '/associacoes') {
return associacoes.listarAssociacoes(req, res);
}

if (metodo === 'POST' && rota === '/associacoes') {
return associacoes.associarProdutoFornecedor(req, res);
}

res.writeHead(404, {
'Content-Type': 'application/json; charset=utf-8'
});
res.end(JSON.stringify({ erro: 'Rota não encontrada' }));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
console.log("Servidor rodando na porta ${PORT}");
});
