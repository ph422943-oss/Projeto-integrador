const express = require('express');
const cors = require('cors');

const produtoController = require('./produtoController');
const fornecedorController = require('./fornecedorController');
const associacaoController = require('./associacaoController');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API do Projeto Integrador ADS funcionando.' });
});

app.get('/produtos', produtoController.listar);
app.post('/produtos', produtoController.criar);
app.put('/produtos/:id', produtoController.atualizar);
app.delete('/produtos/:id', produtoController.excluir);

app.get('/fornecedores', fornecedorController.listar);
app.post('/fornecedores', fornecedorController.criar);
app.put('/fornecedores/:id', fornecedorController.atualizar);
app.delete('/fornecedores/:id', fornecedorController.excluir);

app.get('/associacoes', associacaoController.listar);
app.post('/associacoes', associacaoController.criar);
app.delete('/associacoes/:id', associacaoController.excluir);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
