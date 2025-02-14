import {Router} from 'express';
import personRouter from './personRouter.js';
import transactionRouter from './transactionRouter.js';

const router = Router();

router.use('/persons', personRouter);
router.use('/transactions', transactionRouter);

export default router;