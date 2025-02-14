"use client"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Componente responsável pelo cadastro de uma nova pessoa.
 * Permite inserir um nome e uma idade e envia os dados para o backend.
 */
export default function AddPerson() {
  // Estados para armazenar os valores do formulário
  const [name, setName] = useState("") // Nome da pessoa
  const [age, setAge] = useState("") // Idade da pessoa
  const [error, setError] = useState("") // Estado para armazenar mensagens de erro

  /**
   * Função chamada ao enviar o formulário.
   * Valida os campos e envia uma requisição POST para o backend.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Previne o comportamento padrão do formulário
    setError("") // Limpa mensagens de erro anteriores

    // Validação dos campos obrigatórios
    if (!name || !age) {
      setError("Por favor, preencha todos os campos")
      return
    }

    const ageNum = Number.parseInt(age)
    if (isNaN(ageNum) || ageNum < 0) {
      setError("Por favor, insira uma idade válida")
      return
    }

    // Eu pesoalmente prefiro utiliza o Axios para requisicoes, acho bem mais simples e funcional que o fetch

    try {
      // Envia os dados para o backend
      await axios.post("http://localhost:3001/persons", { nome: name, idade: ageNum })

      // Limpa os campos após o cadastro bem-sucedido
      setName("")
      setAge("")
    } catch (err) {
      setError("Erro ao cadastrar pessoa")
      console.error("Erro ao cadastrar pessoa:", err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Pessoa</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de entrada para o nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Digite o nome" 
            />
          </div>

          {/* Campo de entrada para a idade */}
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

          {/* Exibição de erro, caso ocorra */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Botão de envio do formulário */}
          <Button type="submit">Cadastrar</Button>
        </form>
      </CardContent>
    </Card>
  )
}
