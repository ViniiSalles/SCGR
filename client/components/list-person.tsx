"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import type { Person } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

/**
 * Componente responsável por exibir a lista de pessoas cadastradas.
 * Permite a visualização das informações e exclusão de registros.
 */
export default function PersonList() {
  // Estado que armazena a lista de pessoas cadastradas
  const [people, setPeople] = useState<Person[]>([])

  /**
   * useEffect que faz uma requisição ao backend para buscar as pessoas cadastradas.
   * Ocorre apenas na montagem do componente.
   */
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => {
        setPeople(res.data)
      })
      .catch((err) => {
        console.error("Erro ao buscar pessoas:", err)
      })
  }, [])

  /**
   * Função para excluir uma pessoa do banco de dados.
   * Atualiza a lista de pessoas após a exclusão bem-sucedida.
   *
   * @param id - Identificador da pessoa a ser excluída.
   */
  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then(() => {
        // Atualiza o estado removendo a pessoa excluída da lista
        setPeople(people.filter((person) => person.id !== id))
      })
      .catch((err) => {
        console.error("Erro ao deletar pessoa:", err)
      })
  }

  return (
    <div className="rounded-md border">
      <Table>
        {/* Cabeçalho da tabela */}
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Idade</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Mapeia a lista de pessoas para exibição na tabela */}
          {people.map((person) => (
            <TableRow key={person.id}>
              <TableCell>{person.id}</TableCell>
              <TableCell>{person.nome}</TableCell>
              <TableCell>{person.idade}</TableCell>
              <TableCell>
                {/* Botão para excluir a pessoa */}
                <Button variant="destructive" size="sm" onClick={() => handleDelete(person.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
