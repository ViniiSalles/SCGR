import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class TotalsController {

    async getTotal(req, res) {
        try {
            const people = await prisma.pessoa.findMany({
                include: {
                    transacoes: true, // Inclui todas as transações da pessoa
                },
            });

            // 🔹 Mapeia cada pessoa e calcula seus totais
            const peopleWithTotals = people.map((person) => {
                const totalReceita = person.transacoes
                    .filter((t) => t.tipo === "receita")
                    .reduce((sum, t) => sum + t.valor, 0);

                const totalDespesa = person.transacoes
                    .filter((t) => t.tipo === "despesa")
                    .reduce((sum, t) => sum + t.valor, 0);

                return {
                    id: person.id,
                    nome: person.nome,
                    totalReceita,
                    totalDespesa,
                    saldo: totalReceita - totalDespesa,
                };
            });

            // 🔹 Calcula os totais gerais
            const totalGeralReceita = peopleWithTotals.reduce((sum, p) => sum + p.totalReceita, 0);
            const totalGeralDespesa = peopleWithTotals.reduce((sum, p) => sum + p.totalDespesa, 0);
            const saldoGeral = totalGeralReceita - totalGeralDespesa;

            res.json({
                pessoas: peopleWithTotals,
                totaisGerais: {
                    totalReceita: totalGeralReceita,
                    totalDespesa: totalGeralDespesa,
                    saldo: saldoGeral,
                },
            });
        } catch (error) {
            console.error("Erro ao buscar totais:", error);
            res.status(500).json({ error: "Erro ao carregar os totais" });
        }
    }

}

export default new TotalsController();