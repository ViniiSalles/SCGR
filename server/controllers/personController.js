import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Controlador responsável pelo gerenciamento de pessoas no sistema.
 * Implementa métodos para criar, listar, buscar e excluir registros no banco de dados.
 */
class PersonController {

    /**
     * Cria uma nova pessoa no banco de dados.
     * Recebe os dados do corpo da requisição e persiste na tabela `pessoa`.
     *
     * @param req - Objeto da requisição contendo `name` e `age` no corpo.
     * @param res - Objeto da resposta que retorna os dados da pessoa cadastrada.
     */
    async createPerson(req, res) {
        const { name, age } = req.body;
        try {
            const person = await prisma.pessoa.create({
                data: {
                    nome: name,
                    idade: age
                }
            });
            res.json(person);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Retorna a lista de todas as pessoas cadastradas no banco de dados.
     *
     * @param req - Objeto da requisição.
     * @param res - Objeto da resposta contendo a lista de pessoas.
     */
    async getAllPersons(req, res) {
        try {
            const persons = await prisma.pessoa.findMany();
            res.json(persons);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Busca uma pessoa pelo ID informado na URL.
     *
     * @param req - Objeto da requisição contendo o ID como parâmetro.
     * @param res - Objeto da resposta retornando os dados da pessoa encontrada ou `null` se não existir.
     */
    async getPerson(req, res) {
        const { id } = req.params;
        try {
            const person = await prisma.pessoa.findUnique({
                where: {
                    id: parseInt(id)
                }
            });

            if (!person) {
                return res.status(404).json({ error: "Pessoa não encontrada" });
            }

            res.json(person);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Exclui uma pessoa do banco de dados pelo ID informado.
     *
     * @param req - Objeto da requisição contendo o ID como parâmetro.
     * @param res - Objeto da resposta retornando os dados da pessoa excluída.
     */
    async deletePerson(req, res) {
        const { id } = req.params;
        try {
            const person = await prisma.pessoa.delete({
                where: {
                    id: parseInt(id)
                }
            });

            res.json(person);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new PersonController();
