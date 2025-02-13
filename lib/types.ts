export type Person = {
    id: number
    name: string
    age: number
  }
  
  export type Transaction = {
    id: number
    description: string
    value: number
    type: "expense" | "income"
    personId: number
  }
  
  export type PersonWithTotals = Person & {
    totalIncome: number
    totalExpenses: number
    balance: number
  }
  
  