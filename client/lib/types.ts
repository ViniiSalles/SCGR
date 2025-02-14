/**
 * Representa uma pessoa cadastrada no sistema.
 */
export type Person = {
  id: number
  nome: string // Nome da pessoa (mantido em português para compatibilidade com o banco de dados)
  idade: number // Idade da pessoa
}

/**
 * Representa uma transação financeira associada a uma pessoa.
 */
export type Transaction = {
  id: number
  descricao: string // Descrição da transação (mantido em português para compatibilidade com o banco de dados)
  valor: number // Valor da transação
  tipo: "despesa" | "receita" // Tipo da transação (pode ser despesa ou receita)
  pessoaId: number // Identificador da pessoa associada à transação
}

/**
 * Representa uma pessoa com os totais financeiros agregados.
 * Inclui os valores totais de receitas, despesas e o saldo calculado.
 */
export type PersonWithTotals = Person & {
  totalReceita: number // Total de receitas da pessoa
  totalDespesa: number // Total de despesas da pessoa
  saldo: number // Saldo final (totalReceita - totalDespesa)
}

/**
 * Observação:
 * O banco de dados foi criado inicialmente em português, e alguns nomes de propriedades
 * foram mantidos assim para evitar a necessidade de renomear todas as tabelas e colunas.
 * No código, alguns nomes estão em inglês para manter um padrão misto.
 */
