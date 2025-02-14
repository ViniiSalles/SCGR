/**
 * Componente principal da aplicação.
 * Gerencia a interface do usuário para o controle de gastos residenciais,
 * permitindo o cadastro e listagem de pessoas, transações e um resumo de totais.
 */

import PersonList from "@/components/list-person"; // Lista todas as pessoas cadastradas
import AddPerson from "@/components/crud-person"; // Formulário para adicionar uma nova pessoa
import AddTransaction from "@/components/crud-transaction"; // Formulário para adicionar uma nova transação
import TransactionList from "@/components/list-transaction"; // Lista todas as transações registradas
import TotalsSummary from "@/components/list-totals"; // Exibe o resumo de totais (receitas, despesas e saldo)
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Componente de abas para navegação

export default function Home() {
  return (
    <main className="container mx-auto py-6 space-y-8">
      {/* Título principal da aplicação */}
      <h1 className="text-3xl font-bold">Sistema de Controle de Gastos Residenciais</h1>

      {/* Componente de abas para navegação entre as seções */}
      <Tabs defaultValue="people">
        <TabsList>
          {/* Aba para gerenciamento de pessoas */}
          <TabsTrigger value="people">Pessoas</TabsTrigger>
          {/* Aba para gerenciamento de transações */}
          <TabsTrigger value="transactions">Transações</TabsTrigger>
          {/* Aba para visualizar o resumo de totais */}
          <TabsTrigger value="summary">Totais</TabsTrigger>
        </TabsList>

        {/* Conteúdo da aba "Pessoas" */}
        <TabsContent value="people" className="space-y-6">
          <AddPerson /> {/* Formulário para adicionar uma pessoa */}
          <PersonList /> {/* Lista de pessoas cadastradas */}
        </TabsContent>

        {/* Conteúdo da aba "Transações" */}
        <TabsContent value="transactions" className="space-y-6">
          <AddTransaction /> {/* Formulário para adicionar uma transação */}
          <TransactionList /> {/* Lista de transações */}
        </TabsContent>

        {/* Conteúdo da aba "Totais" */}
        <TabsContent value="summary">
          <TotalsSummary /> {/* Resumo dos totais de receitas, despesas e saldo */}
        </TabsContent>
      </Tabs>
    </main>
  );
}
