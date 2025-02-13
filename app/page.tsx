import { PersonList } from "@/components/list-person"
import { AddPerson } from "@/components/crud-person"
import { AddTransaction } from "@/components/crud-transaction"
import { TransactionList } from "@/components/list-transaction"
import { TotalsSummary } from "@/components/list-totals"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <main className="container mx-auto py-6 space-y-8">
      <h1 className="text-3xl font-bold">Residential Expense Control</h1>
      <Tabs defaultValue="people">
        <TabsList>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
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

