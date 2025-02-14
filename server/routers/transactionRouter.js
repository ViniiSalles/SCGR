import {Router} from 'express';
import TransactionController from '../controllers/transactionController.js';

const router = Router();

router.get('/', TransactionController.getAllTransactions);

router.get('/:id', TransactionController.getTransaction);

router.post('/', TransactionController.createTransaction);

export default router;