import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CircuitBoard, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acesso interno | BuildForge" },
      { name: "description", content: "Área restrita da equipe BuildForge para gestão de pedidos de orçamento." },
      { property: "og:title", content: "Acesso interno | BuildForge" },
      { property: "og:description", content: "Entre para acompanhar os pedidos de orçamento da BuildForge." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("A senha precisa ter ao menos 6 caracteres.");
      return;
    }
    setLoading(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        toast.error("E-mail ou senha inválidos.");
        return;
      }
      navigate({ to: "/admin", replace: true });
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setLoading(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      if (data.session) {
        navigate({ to: "/admin", replace: true });
      } else {
        toast.success("Conta criada! Confirme o e-mail para entrar.");
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-hero-gradient px-5">
      <div className="w-full max-w-sm rounded-2xl border border-border/70 bg-card p-8 shadow-panel">
        <Link to="/" className="flex items-center gap-2">
          <CircuitBoard className="size-5 text-primary" />
          <span className="font-display font-bold">BuildForge</span>
        </Link>
        <h1 className="mt-6 font-display text-2xl font-bold">
          {mode === "signin" ? "Entrar na área interna" : "Criar acesso"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Gestão dos pedidos de orçamento recebidos pelo site.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
            />
          </div>
          <Button type="submit" disabled={loading} className="shadow-neon">
            {loading && <Loader2 className="size-4 animate-spin" />}
            {mode === "signin" ? "Entrar" : "Criar conta"}
          </Button>
        </form>

        <button
          type="button"
          className="mt-5 w-full text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        >
          {mode === "signin" ? "Ainda não tem acesso? Criar conta" : "Já tenho acesso. Entrar"}
        </button>
      </div>
    </div>
  );
}
