import { Router } from 'express';
import TransactionController from '../controllers/transactionController.js';

const router = Router();

/**
 * Roteador responsável pelo gerenciamento de transações no sistema.
 * Permite listar, consultar e criar novas transações associadas a pessoas cadastradas.
 */

// Rota para obter todas as transações cadastradas
router.get('/', TransactionController.getAllTransactions);

// Rota para obter uma transação específica pelo ID
router.get('/:id', TransactionController.getTransaction);

// Rota para criar uma nova transação
router.post('/', TransactionController.createTransaction);

export default router;
