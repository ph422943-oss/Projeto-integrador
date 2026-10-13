# Projeto Integrador ADS — Produtos e Fornecedores

Sistema simples com API Node.js/Express e interface React para gerenciar produtos, fornecedores e suas associações.

## Requisitos
- Node.js LTS instalado
- Conexão com a internet na primeira instalação

## Como executar
1. Abra a pasta do projeto no VS Code.
2. No terminal, execute `npm install`.
3. Execute `npm run install:frontend`.
4. Execute `npm run dev` para iniciar API e interface.
5. Abra `http://localhost:5173`.

A API roda em `http://localhost:3000`.

## Rotas da API
- `GET /produtos` — listar produtos
- `POST /produtos` — cadastrar produto
- `PUT /produtos/:id` — atualizar produto
- `DELETE /produtos/:id` — excluir produto
- `GET /fornecedores` — listar fornecedores
- `POST /fornecedores` — cadastrar fornecedor
- `PUT /fornecedores/:id` — atualizar fornecedor
- `DELETE /fornecedores/:id` — excluir fornecedor
- `GET /associacoes` — listar associações
- `POST /associacoes` — associar produto e fornecedor
- `DELETE /associacoes/:id` — remover associação

Os dados ficam em memória e são reiniciados quando o servidor é reiniciado. Isso mantém o projeto simples para demonstração acadêmica.

## Testes no Insomnia/Postman
1. `GET http://localhost:3000/produtos`
2. `POST http://localhost:3000/produtos`, Body JSON:
   `{"nome":"Arroz","codigoBarras":"7891234567890","descricao":"Pacote 5 kg","quantidade":10,"categoria":"Alimentos","validade":"2027-12-31"}`
3. `POST http://localhost:3000/fornecedores`, Body JSON:
   `{"empresa":"Fornecedor Exemplo","cnpj":"12345678000199","endereco":"Brasília - DF","telefone":"61999990000","email":"contato@exemplo.com","contatoPrincipal":"Maria"}`
4. Use os IDs retornados para `POST http://localhost:3000/associacoes`, Body JSON:
   `{"produtoId":1,"fornecedorId":1}`

Observação: os dados de exemplo são fictícios. A validação de CNPJ verifica duplicidade informada, não a validade matemática dos dígitos.
