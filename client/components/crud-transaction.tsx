"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import type { Person } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddTransaction() {
  const [description, setDescription] = useState("")
  const [value, setValue] = useState("")
  const [type, setType] = useState<"despesa" | "receita">("despesa")
  const [personId, setPersonId] = useState("")
  const [people, setPeople] = useState<Person[]>([])
  const [error, setError] = useState("")

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!description || !value || !type || !personId) {
      setError("Por favor, preencha todos os campos")
      return
    }

    const selectedPerson = people.find(person => person.id.toString() === personId);
    if (!selectedPerson) {
      setError("Pessoa não encontrada")
      return
    }

    if (selectedPerson.idade < 18 && type === "receita") {
      setError("Pessoas menores de 18 anos só podem cadastrar despesas.")
      return
    }

    const valueNum = Number.parseFloat(value)
    if (isNaN(valueNum) || valueNum <= 0) {
      setError("Por favoir, insira um valor válido")
      return
    }
    try {
      await axios.post("http://localhost:3001/transactions", {
        description,
        value: valueNum,
        type,
        personId: Number.parseInt(personId),
      })
      
      setDescription("")
      setValue("")
      setType("despesa")
      setPersonId("")
    } catch (err) {
      setError
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Transacao</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descricao</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a transacao"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Valor</Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Digite o valor"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select value={type} onValueChange={(value: "despesa" | "receita") => setType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="despesa">Despesa</SelectItem>
                <SelectItem value="receita">Receita</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="person">Pessoa</Label>
            <Select value={personId} onValueChange={setPersonId}>
              <SelectTrigger>
                <SelectValue placeholder="Seleciona a pessoa" />
              </SelectTrigger>
              <SelectContent>
                {people.map((person) => (
                  <SelectItem key={person.id} value={person.id.toString()}>
                    {person.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit">Cadastrar</Button>
        </form>
      </CardContent>
    </Card>
  )
}

