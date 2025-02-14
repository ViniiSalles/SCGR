"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import type { Transaction } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/transactions")
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar transacoes:", err);
      });
  }, []);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Descricao</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Pessoa ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.descricao}</TableCell>
              <TableCell>${transaction.valor.toFixed(2)}</TableCell>
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

