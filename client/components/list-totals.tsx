"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import type { PersonWithTotals } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Componente responsável por exibir o resumo de totais das pessoas cadastradas.
 * Lista o total de receitas, despesas e saldo de cada pessoa, além do total geral.
 */
export default function TotalsSummary() {
  // Estado que armazena a lista de pessoas com seus totais de receita, despesa e saldo
  const [peopleWithTotals, setPeopleWithTotals] = useState<PersonWithTotals[]>([])

  // Estado que armazena os totais gerais de todas as pessoas (receitas, despesas e saldo)
  const [totalGeral, setTotalGeral] = useState<{ totalReceita: number; totalDespesa: number; saldo: number } | null>(null)

  // Estado para armazenar mensagens de erro
  const [error, setError] = useState<string | null>(null)

  /**
   * useEffect que faz uma requisição ao backend para buscar os totais de cada pessoa.
   * Ocorre apenas na montagem do componente.
   */
  useEffect(() => {
    axios.get("http://localhost:3001/totals")
      .then((res) => {
        setPeopleWithTotals(res.data.pessoas) // Atualiza a lista de pessoas com totais individuais
        setTotalGeral(res.data.totaisGerais) // Atualiza os totais gerais
      })
      .catch((err) => {
        console.error("Erro ao buscar totais:", err)
        setError("Erro ao carregar os totais") // Define mensagem de erro
      })
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consulta de Totais</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Exibe uma mensagem de erro caso ocorra falha na requisição */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="rounded-md border">
          <Table>
            {/* Cabeçalho da tabela */}
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Total Receita</TableHead>
                <TableHead>Total Despesa</TableHead>
                <TableHead>Saldo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Renderiza a lista de pessoas com seus totais */}
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
                // Exibe mensagem caso não haja registros de pessoas
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Nenhum dado encontrado
                  </TableCell>
                </TableRow>
              )}
              {/* Renderiza os totais gerais caso existam dados */}
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
