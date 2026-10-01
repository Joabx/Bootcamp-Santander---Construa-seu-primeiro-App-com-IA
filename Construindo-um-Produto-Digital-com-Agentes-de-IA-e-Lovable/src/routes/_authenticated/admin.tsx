import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CircuitBoard, Inbox, LogOut, MessageCircle, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { STATUS_OPTIONS, WHATSAPP_NUMBER, statusLabel } from "@/lib/buildforge";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Painel de leads | BuildForge" },
      { name: "description", content: "Gestão dos pedidos de orçamento recebidos pela BuildForge." },
      { property: "og:title", content: "Painel de leads | BuildForge" },
      { property: "og:description", content: "Acompanhe e atualize o status dos pedidos de orçamento." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Lead = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  goal: string;
  budget: string;
  platform: string;
  notes: string | null;
  status: "novo" | "em_contato" | "orcamento_enviado" | "fechado" | "perdido";
  created_at: string;
};

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: leads, isLoading, error } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Lead[];
    },
  });

  async function updateStatus(id: string, status: Lead["status"]) {
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);
    if (error) {
      toast.error("Não foi possível atualizar o status.");
      return;
    }
    toast.success("Status atualizado.");
    queryClient.invalidateQueries({ queryKey: ["leads"] });
  }

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const list = leads ?? [];
  const now = new Date();
  const stats = [
    { icon: Inbox, label: "Total de pedidos", value: list.length },
    { icon: Users, label: "Novos", value: list.filter((l) => l.status === "novo").length },
    {
      icon: TrendingUp,
      label: "Fechados",
      value: list.filter((l) => l.status === "fechado").length,
    },
    {
      icon: MessageCircle,
      label: "Últimos 7 dias",
      value: list.filter(
        (l) => now.getTime() - new Date(l.created_at).getTime() < 7 * 24 * 60 * 60 * 1000,
      ).length,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2">
            <CircuitBoard className="size-5 text-primary" />
            <span className="font-display font-bold">BuildForge · Painel</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="size-4" /> Sair
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border/70 bg-card p-5">
              <stat.icon className="size-5 text-primary" />
              <p className="mt-3 font-display text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-border/70 bg-card">
          <div className="border-b border-border/60 px-5 py-4">
            <h1 className="font-display text-xl font-bold">Pedidos de orçamento</h1>
            <p className="text-sm text-muted-foreground">
              Atualize o status conforme o atendimento avança.
            </p>
          </div>

          {isLoading ? (
            <p className="p-6 text-sm text-muted-foreground">Carregando pedidos...</p>
          ) : error ? (
            <p className="p-6 text-sm text-destructive">
              Você não tem permissão para ver os pedidos. Peça a um administrador para liberar seu
              acesso.
            </p>
          ) : list.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">Nenhum pedido recebido ainda.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Objetivo</TableHead>
                    <TableHead>Orçamento</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {list.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <span className="font-medium">{lead.name}</span>
                        <span className="block text-xs text-muted-foreground">{lead.email}</span>
                      </TableCell>
                      <TableCell className="text-sm">{lead.goal}</TableCell>
                      <TableCell className="text-sm">{lead.budget}</TableCell>
                      <TableCell>
                        <a
                          className="text-sm text-primary hover:underline"
                          href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "") || WHATSAPP_NUMBER}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {lead.whatsapp}
                        </a>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={lead.status}
                          onValueChange={(value) => updateStatus(lead.id, value as Lead["status"])}
                        >
                          <SelectTrigger className="w-44">
                            <SelectValue placeholder={statusLabel(lead.status)} />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
