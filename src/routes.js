const express = require('express');
const router = express.Router();

const FornecedorController = require('./controllers/FornecedorController');
const ServicoController = require('./controllers/ServicoController');

// rota de todos os fornecedores
router.get('/fornecedores', FornecedorController.buscarTodos);
// rota para um fornecedor específico via id
router.get('/fornecedores/:id', FornecedorController.buscarUm);
// rota para inserir novo fornecedor
router.post('/fornecedores', FornecedorController.inserir);
// rota para alterar fornecedor
router.put('/fornecedores/:id', FornecedorController.alterar);
// rota para excluir fornecedor
router.delete('/fornecedores/:id', FornecedorController.excluir);

// rota de todos os serviços
router.get('/servicos', ServicoController.buscarTodos);
// rota para um serviço específico via id
router.get('/servicos/:id', ServicoController.buscarUm);
// rota para inserir novo serviço
router.post('/servicos', ServicoController.inserir);
// rota para alterar serviço
router.put('/servicos/:id', ServicoController.alterar);
// rota para excluir serviço
router.delete('/servicos/:id', ServicoController.excluir);

module.exports = router;