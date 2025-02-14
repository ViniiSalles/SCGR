import { Router } from 'express';
import PersonController from '../controllers/personController.js';

const router = Router();

/**
 * Rotas para gerenciamento de pessoas no sistema.
 * Permitem operações de listagem, consulta, criação e exclusão de registros de pessoas.
 */

// Rota para obter todas as pessoas cadastradas
router.get('/', PersonController.getAllPersons);

// Rota para obter uma pessoa específica pelo ID
router.get('/:id', PersonController.getPerson);

// Rota para criar uma nova pessoa
router.post('/', PersonController.createPerson);

// Rota para excluir uma pessoa pelo ID
router.delete('/:id', PersonController.deletePerson);

export default router;
