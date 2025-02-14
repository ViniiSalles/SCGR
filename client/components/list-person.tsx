"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import type { Person } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"



export default function PersonList() {
  const [people, setPeople] = useState<Person[]>([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => {
        setPeople(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar pessoas:", err);
      });
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then(() => {
        setPeople(people.filter((person) => person.id !== id));
      })
      .catch((err) => {
        console.error("Erro ao deletar pessoa:", err);
      });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Idade</TableHead>
            <TableHead>Acoes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person.id}>
              <TableCell>{person.id}</TableCell>
              <TableCell>{person.nome}</TableCell>
              <TableCell>{person.idade}</TableCell>
              <TableCell>
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

