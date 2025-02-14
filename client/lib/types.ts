export type Person = {
    id: number
    nome: string
    idade: number
  }
  
export type Transaction = {
  id: number
  descricao: string
  valor: number
  tipo: "despesa" | "receita"
  pessoaId: number
}

export type PersonWithTotals = Person & {
  totalReceita: number
  totalDespesa: number
  saldo: number
}

//Aqui eu deixei meio portugues meio ingles, pois na hora de criar o banco de dados eu esqueci e criei ele em portugues, algumas coisas tive que alterar pra nao precisar escrever tudo de novo

  