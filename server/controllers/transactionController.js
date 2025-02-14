import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

class TransactionController{

    async createTransaction(req, res){
        const {value, description, personId, type} = req.body;
        try {
            const transaction = await prisma.transacao.create({
                data: {
                    valor: value,
                    descricao: description,
                    tipo: type,
                    pessoa: { connect: { id: personId } }
                }
            });
            res.json(transaction);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getAllTransactions(req, res){
        try {
            const transactions = await prisma.transacao.findMany();
            res.json(transactions);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getTransaction(req, res){
        const {id} = req.params;
        try {
            const transaction = await prisma.transacao.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
            res.json(transaction);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

}

export default new TransactionController();