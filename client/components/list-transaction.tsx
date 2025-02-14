"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import type { Transaction } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

/**
 * Componente responsável por exibir a lista de transações cadastradas.
 * Lista todas as transações com suas respectivas descrições, valores, tipos e IDs das pessoas associadas.
 */
export default function TransactionList() {
  // Estado que armazena a lista de transações
  const [transactions, setTransactions] = useState<Transaction[]>([])

  /**
   * useEffect que faz uma requisição ao backend para buscar todas as transações cadastradas.
   * Executa apenas na montagem do componente.
   */
  useEffect(() => {
    axios
      .get("http://localhost:3001/transactions")
      .then((res) => {
        setTransactions(res.data) // Atualiza o estado com a lista de transações recebida do backend
      })
      .catch((err) => {
        console.error("Erro ao buscar transações:", err)
      })
  }, [])

  return (
    <div className="rounded-md border">
      <Table>
        {/* Cabeçalho da tabela */}
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Pessoa ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Renderiza a lista de transações */}
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.descricao}</TableCell>
              <TableCell>
                R$ {transaction.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </TableCell>
              <TableCell className={transaction.tipo === "receita" ? "text-green-600" : "text-red-600"}>
                {transaction.tipo}
              </TableCell>
              <TableCell>{transaction.pessoaId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
