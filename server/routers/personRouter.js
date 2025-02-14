import {Router} from 'express';
import PersonController from '../controllers/personController.js';

const router = Router();

router.get('/', PersonController.getAllPersons);

router.get('/:id', PersonController.getPerson);

router.post('/', PersonController.createPerson);

router.delete('/:id', PersonController.deletePerson);

export default router;