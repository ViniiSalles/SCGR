"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AddPerson() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !age) {
      setError("Please fill in all fields")
      return
    }

    const ageNum = Number.parseInt(age)
    if (isNaN(ageNum) || ageNum < 0) {
      setError("Please enter a valid age")
      return
    }

  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Person</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit">Add Person</Button>
        </form>
      </CardContent>
    </Card>
  )
}

