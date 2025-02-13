"use client"

import { useEffect, useState } from "react"
import type { PersonWithTotals } from "@/client/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/client/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/client/components/ui/card"

export function TotalsSummary() {
  const [peopleWithTotals, setPeopleWithTotals] = useState<PersonWithTotals[]>([])


  const grandTotals = peopleWithTotals.reduce(
    (acc, person) => ({
      income: acc.income + person.totalIncome,
      expenses: acc.expenses + person.totalExpenses,
      balance: acc.balance + person.balance,
    }),
    { income: 0, expenses: 0, balance: 0 },
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consulta de Totais</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Total Receita</TableHead>
                <TableHead>Total Despesa</TableHead>
                <TableHead>Saldo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {peopleWithTotals.map((person) => (
                <TableRow key={person.id}>
                  <TableCell>{person.name}</TableCell>
                  <TableCell className="text-green-600">${person.totalIncome.toFixed(2)}</TableCell>
                  <TableCell className="text-red-600">${person.totalExpenses.toFixed(2)}</TableCell>
                  <TableCell className={person.balance >= 0 ? "text-green-600" : "text-red-600"}>
                    ${person.balance.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-bold">
                <TableCell>SALDO TOTAL</TableCell>
                <TableCell className="text-green-600">${grandTotals.income.toFixed(2)}</TableCell>
                <TableCell className="text-red-600">${grandTotals.expenses.toFixed(2)}</TableCell>
                <TableCell className={grandTotals.balance >= 0 ? "text-green-600" : "text-red-600"}>
                  ${grandTotals.balance.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

