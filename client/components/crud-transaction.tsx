"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import type { Person } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Componente responsável pelo cadastro de uma nova transação.
 * Permite a inserção de uma descrição, valor, tipo (receita ou despesa) 
 * e vinculação a uma pessoa cadastrada.
 */
export default function AddTransaction() {
  // Estados para armazenar os valores do formulário
  const [description, setDescription] = useState("") // Descrição da transação
  const [value, setValue] = useState("") // Valor da transação
  const [type, setType] = useState<"despesa" | "receita">("despesa") // Tipo da transação
  const [personId, setPersonId] = useState("") // ID da pessoa associada à transação
  const [people, setPeople] = useState<Person[]>([]) // Lista de pessoas cadastradas
  const [error, setError] = useState("") // Estado para armazenar mensagens de erro

  /**
   * useEffect para buscar todas as pessoas cadastradas no backend
   * e atualizar a lista no estado `people`
   */
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

  /**
   * Função chamada ao enviar o formulário.
   * Valida os campos e envia uma requisição POST para o backend.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Previne o comportamento padrão do formulário
    setError("") // Limpa mensagens de erro anteriores

    // Validação dos campos obrigatórios
    if (!description || !value || !type || !personId) {
      setError("Por favor, preencha todos os campos")
      return
    }

    // Verifica se a pessoa selecionada existe na lista
    const selectedPerson = people.find(person => person.id.toString() === personId);
    if (!selectedPerson) {
      setError("Pessoa não encontrada")
      return
    }

    // Impede que menores de 18 anos cadastrem receitas
    if (selectedPerson.idade < 18 && type === "receita") {
      setError("Pessoas menores de 18 anos só podem cadastrar despesas.")
      return
    }

    // Converte o valor para número e valida se é positivo
    const valueNum = Number.parseFloat(value)
    if (isNaN(valueNum) || valueNum <= 0) {
      setError("Por favor, insira um valor válido")
      return
    }

    try {
      // Envia os dados para o backend
      await axios.post("http://localhost:3001/transactions", {
        descricao: description,
        valor: valueNum,
        tipo: type,
        pessoaId: Number.parseInt(personId),
      })

      // Limpa os campos após o cadastro bem-sucedido
      setDescription("")
      setValue("")
      setType("despesa")
      setPersonId("")
    } catch (err) {
      setError("Erro ao cadastrar transação")
      console.error("Erro ao cadastrar transação:", err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Transação</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de entrada para a descrição da transação */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a transação"
            />
          </div>

          {/* Campo de entrada para o valor da transação */}
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

          {/* Seleção do tipo da transação (despesa ou receita) */}
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

          {/* Seleção da pessoa associada à transação */}
          <div className="space-y-2">
            <Label htmlFor="person">Pessoa</Label>
            <Select value={personId} onValueChange={setPersonId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a pessoa" />
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

          {/* Exibição de erro, caso ocorra */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Botão de envio do formulário */}
          <Button type="submit">Cadastrar</Button>
        </form>
      </CardContent>
    </Card>
  )
}
