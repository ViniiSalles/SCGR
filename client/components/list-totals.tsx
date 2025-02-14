"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import type { PersonWithTotals } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TotalsSummary() {
  const [peopleWithTotals, setPeopleWithTotals] = useState<PersonWithTotals[]>([])
  const [totalGeral, setTotalGeral] = useState<{ totalReceita: number; totalDespesa: number; saldo: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios.get("http://localhost:3001/totals")
      .then((res) => {
        setPeopleWithTotals(res.data.pessoas)
        setTotalGeral(res.data.totaisGerais)
      })
      .catch((err) => {
        console.error("Erro ao buscar totais:", err)
        setError("Erro ao carregar os totais")
      })
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consulta de Totais</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 text-sm">{error}</p>}
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
              {peopleWithTotals.length > 0 ? (
                peopleWithTotals.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell>{person.nome}</TableCell>
                    <TableCell className="text-green-600">
                      R$ {person.totalReceita.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-red-600">
                      R$ {person.totalDespesa.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className={person.saldo >= 0 ? "text-green-600" : "text-red-600"}>
                      R$ {person.saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Nenhum dado encontrado
                  </TableCell>
                </TableRow>
              )}
              {totalGeral && (
                <TableRow className="font-bold">
                  <TableCell>TOTAL GERAL</TableCell>
                  <TableCell className="text-green-600">
                    R$ {totalGeral.totalReceita.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-red-600">
                    R$ {totalGeral.totalDespesa.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className={totalGeral.saldo >= 0 ? "text-green-600" : "text-red-600"}>
                    R$ {totalGeral.saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
