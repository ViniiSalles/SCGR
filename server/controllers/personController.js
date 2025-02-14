import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();


class PersonController {

    async createPerson(req, res) {
        const {name, age} = req.body;
        try {
            const person = await prisma.pessoa.create({
                data: {
                    nome:name,
                    idade:age
                }
            });
            res.json(person);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getAllPersons(req, res) {
        try {
            const persons = await prisma.pessoa.findMany();
            res.json(persons);
        } catch (error) {
            res.status(500).json({error: error.message});
        }    
    }

    async getPerson(req, res) {
        const {id} = req.params;
        try {
            const person = await prisma.pessoa.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
            res.json(person);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async deletePerson(req, res) {
        const {id} = req.params;
        try {
            const person = await prisma.pessoa.delete({
                where: {
                    id: parseInt(id)
                }
            });
            res.json(person);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

}

export default new PersonController();