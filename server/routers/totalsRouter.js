import {Router} from 'express';
import TotalsController from '../controllers/totalsController.js';

const router = Router();

router.get('/', TotalsController.getTotal);

export default router;