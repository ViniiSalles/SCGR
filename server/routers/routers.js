import {Router} from 'express';
import personRouter from './personRouter.js';
import transactionRouter from './transactionRouter.js';
import totalsRouter from './totalsRouter.js';

const router = Router();

router.use('/persons', personRouter);
router.use('/transactions', transactionRouter);
router.use('/totals', totalsRouter);

export default router;