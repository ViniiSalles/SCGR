import { Router } from 'express';
import personRouter from './personRouter.js';
import transactionRouter from './transactionRouter.js';
import totalsRouter from './totalsRouter.js';

const router = Router();

/**
 * Roteador principal da aplicação.
 * Define os endpoints principais e encaminha as requisições para os respectivos roteadores.
 */

// Rotas relacionadas ao gerenciamento de pessoas
router.use('/persons', personRouter);

// Rotas relacionadas ao gerenciamento de transações
router.use('/transactions', transactionRouter);

// Rotas para consulta de totais financeiros
router.use('/totals', totalsRouter);

export default router;
