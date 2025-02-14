import { Router } from 'express';
import TotalsController from '../controllers/totalsController.js';

const router = Router();

/**
 * Roteador responsável por fornecer os totais financeiros do sistema.
 * Permite a consulta dos totais de receitas, despesas e saldo geral.
 */

// Rota para obter os totais financeiros do sistema
router.get('/', TotalsController.getTotal);

export default router;
