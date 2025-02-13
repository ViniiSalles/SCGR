"use client"

import { useEffect, useState } from "react"
import type { Transaction } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])


  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Person ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>${transaction.value.toFixed(2)}</TableCell>
              <TableCell className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                {transaction.type}
              </TableCell>
              <TableCell>{transaction.personId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

