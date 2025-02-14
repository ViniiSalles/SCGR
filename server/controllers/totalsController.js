import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Controlador responsável por calcular e fornecer os totais financeiros do sistema.
 * Ele retorna os totais de receita, despesa e saldo individualmente por pessoa
 * e um total geral consolidado.
 */
class TotalsController {
    
    /**
     * Obtém os totais financeiros de todas as pessoas cadastradas.
     * Retorna a soma de receitas, despesas e saldo por pessoa e um total geral.
     *
     * @param req - Objeto da requisição.
     * @param res - Objeto da resposta contendo os totais calculados.
     */
    async getTotal(req, res) {
        try {
            // Busca todas as pessoas cadastradas e inclui suas transações
            const people = await prisma.pessoa.findMany({
                include: {
                    transacoes: true, // Inclui todas as transações associadas a cada pessoa
                },
            });

            // Mapeia cada pessoa e calcula seus totais financeiros
            const peopleWithTotals = people.map((person) => {
                const totalReceita = person.transacoes
                    .filter((t) => t.tipo === "receita") // Filtra apenas transações do tipo "receita"
                    .reduce((sum, t) => sum + t.valor, 0); // Soma os valores das receitas

                const totalDespesa = person.transacoes
                    .filter((t) => t.tipo === "despesa") // Filtra apenas transações do tipo "despesa"
                    .reduce((sum, t) => sum + t.valor, 0); // Soma os valores das despesas

                return {
                    id: person.id,
                    nome: person.nome,
                    totalReceita,
                    totalDespesa,
                    saldo: totalReceita - totalDespesa, // Calcula o saldo (receita - despesa)
                };
            });

            // Calcula os totais gerais de todas as pessoas
            const totalGeralReceita = peopleWithTotals.reduce((sum, p) => sum + p.totalReceita, 0);
            const totalGeralDespesa = peopleWithTotals.reduce((sum, p) => sum + p.totalDespesa, 0);
            const saldoGeral = totalGeralReceita - totalGeralDespesa;

            // Retorna os dados formatados em JSON
            res.json({
                pessoas: peopleWithTotals, // Lista de pessoas com seus totais individuais
                totaisGerais: {
                    totalReceita: totalGeralReceita, // Total de receitas de todas as pessoas
                    totalDespesa: totalGeralDespesa, // Total de despesas de todas as pessoas
                    saldo: saldoGeral, // Saldo total consolidado
                },
            });
        } catch (error) {
            console.error("Erro ao buscar totais:", error);
            res.status(500).json({ error: "Erro ao carregar os totais" });
        }
    }
}

export default new TotalsController();
