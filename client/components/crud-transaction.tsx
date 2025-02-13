"use client"

import { useState, useEffect } from "react"
import type { Person } from "@/client/lib/types"
import { Button } from "@/client/components/ui/button"
import { Input } from "@/client/components/ui/input"
import { Label } from "@/client/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/client/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/client/components/ui/card"

export function AddTransaction() {
  const [description, setDescription] = useState("")
  const [value, setValue] = useState("")
  const [type, setType] = useState<"expense" | "income">("expense")
  const [personId, setPersonId] = useState("")
  const [people, setPeople] = useState<Person[]>([])
  const [error, setError] = useState("")



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!description || !value || !type || !personId) {
      setError("Por favor, preencha todos os campos")
      return
    }

    const valueNum = Number.parseFloat(value)
    if (isNaN(valueNum) || valueNum <= 0) {
      setError("Por favoir, insira um valor válido")
      return
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
            <Select value={type} onValueChange={(value: "expense" | "income") => setType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Despesa</SelectItem>
                <SelectItem value="income">Receita</SelectItem>
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
                    {person.name}
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

