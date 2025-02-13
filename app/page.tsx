import { PersonList } from "@/components/list-person"
import { AddPerson } from "@/components/crud-person"
import { AddTransaction } from "@/components/crud-transaction"
import { TransactionList } from "@/components/list-transaction"
import { TotalsSummary } from "@/components/list-totals"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <main className="container mx-auto py-6 space-y-8">
      <h1 className="text-3xl font-bold">Sistema de Controle de Gastos Residenciais</h1>
      <Tabs defaultValue="people">
        <TabsList>
          <TabsTrigger value="people">Pessoas</TabsTrigger>
          <TabsTrigger value="transactions">Transacoes</TabsTrigger>
          <TabsTrigger value="summary">Totais</TabsTrigger>
        </TabsList>
        <TabsContent value="people" className="space-y-6">
          <AddPerson />
          <PersonList />
        </TabsContent>
        <TabsContent value="transactions" className="space-y-6">
          <AddTransaction />
          <TransactionList />
        </TabsContent>
        <TabsContent value="summary">
          <TotalsSummary />
        </TabsContent>
      </Tabs>
    </main>
  )
}

