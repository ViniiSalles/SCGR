import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Controlador responsável pelo gerenciamento de transações financeiras no sistema.
 * Implementa métodos para criar, listar e buscar transações no banco de dados.
 */
class TransactionController {

    /**
     * Cria uma nova transação associada a uma pessoa no banco de dados.
     * Recebe os dados do corpo da requisição e persiste na tabela `transacao`.
     *
     * @param req - Objeto da requisição contendo `value`, `description`, `personId` e `type` no corpo.
     * @param res - Objeto da resposta que retorna os dados da transação cadastrada.
     */
    async createTransaction(req, res) {
        const { value, description, personId, type } = req.body;
        try {
            // Criação da transação vinculada à pessoa especificada
            const transaction = await prisma.transacao.create({
                data: {
                    valor: value,
                    descricao: description,
                    tipo: type,
                    pessoa: { connect: { id: personId } } // Relaciona a transação à pessoa no banco
                }
            });

            res.json(transaction);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Retorna a lista de todas as transações cadastradas no banco de dados.
     *
     * @param req - Objeto da requisição.
     * @param res - Objeto da resposta contendo a lista de transações.
     */
    async getAllTransactions(req, res) {
        try {
            const transactions = await prisma.transacao.findMany();
            res.json(transactions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Busca uma transação pelo ID informado na URL.
     *
     * @param req - Objeto da requisição contendo o ID como parâmetro.
     * @param res - Objeto da resposta retornando os dados da transação encontrada ou `null` se não existir.
     */
    async getTransaction(req, res) {
        const { id } = req.params;
        try {
            const transaction = await prisma.transacao.findUnique({
                where: {
                    id: parseInt(id)
                }
            });

            if (!transaction) {
                return res.status(404).json({ error: "Transação não encontrada" });
            }

            res.json(transaction);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new TransactionController();
