"use client"

import { useState, useEffect } from "react"
import type { Person } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
      setError("Please fill in all fields")
      return
    }

    const valueNum = Number.parseFloat(value)
    if (isNaN(valueNum) || valueNum <= 0) {
      setError("Please enter a valid positive value")
      return
    }

  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(value: "expense" | "income") => setType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="person">Person</Label>
            <Select value={personId} onValueChange={setPersonId}>
              <SelectTrigger>
                <SelectValue placeholder="Select person" />
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
          <Button type="submit">Add Transaction</Button>
        </form>
      </CardContent>
    </Card>
  )
}

