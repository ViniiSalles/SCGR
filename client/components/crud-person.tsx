"use client"

import { useState } from "react"
import { Button } from "@/client/components/ui/button"
import { Input } from "@/client/components/ui/input"
import { Label } from "@/client/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/client/components/ui/card"

export function AddPerson() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !age) {
      setError("Por favor, preencha todos os campos")
      return
    }

    const ageNum = Number.parseInt(age)
    if (isNaN(ageNum) || ageNum < 0) {
      setError("Por favor, insira uma idade válida")
      return
    }

  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Pessoa</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite o nome" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Idade</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Digite a idade"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit">Cadastrar</Button>
        </form>
      </CardContent>
    </Card>
  )
}

