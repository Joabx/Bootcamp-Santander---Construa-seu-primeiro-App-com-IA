import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Cpu,
  Brain,
  Coins,
  Gamepad2,
  Video,
  ShieldCheck,
  Wrench,
  Truck,
  Gauge,
  ArrowRight,
  CircuitBoard,
} from "lucide-react";

import heroImage from "@/assets/hero-pc.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BuildForge — PCs de alta performance sob medida" },
      {
        name: "description",
        content:
          "Montagem de PCs personalizados para edição de vídeo 4K, IA local, Web3 e jogos AAA. Receba um orçamento pelo WhatsApp em minutos.",
      },
      { property: "og:title", content: "BuildForge — PCs de alta performance sob medida" },
      {
        property: "og:description",
        content:
          "Configuração ideal para criadores, estúdios de IA, Web3 e gamers. Monte seu PC agora e receba o orçamento no WhatsApp.",
      },
    ],
  }),
  component: Landing,
});

const useCases = [
  {
    icon: Video,
    title: "Criadores & Editores",
    text: "Timelines 4K sem travar, render em minutos e armazenamento rápido para projetos pesados.",
  },
  {
    icon: Brain,
    title: "IA & Machine Learning",
    text: "VRAM e CPU dimensionadas para treinar, ajustar e rodar modelos localmente.",
  },
  {
    icon: Coins,
    title: "Web3 & Mineração",
    text: "Eficiência energética, estabilidade 24/7 e refrigeração pensada para carga contínua.",
  },
  {
    icon: Gamepad2,
    title: "Jogos AAA",
    text: "Alto FPS em 1440p e 4K, com ray tracing ligado e temperatura sob controle.",
  },
];

const benefits = [
  { icon: Wrench, title: "Montagem profissional", text: "Cable management, testes de estresse e sistema pronto para uso." },
  { icon: Gauge, title: "Peças escolhidas por carga", text: "Nada de gargalo: cada componente é definido pelo seu uso real." },
  { icon: ShieldCheck, title: "Garantia e suporte", text: "Acompanhamento pós-entrega e suporte direto com quem montou." },
  { icon: Truck, title: "Entrega segura", text: "Embalagem reforçada e envio com rastreio para todo o Brasil." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2">
            <CircuitBoard className="size-6 text-primary" />
            <span className="font-display text-lg font-bold tracking-tight">BuildForge</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin">Área interna</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/montar">Montar meu PC</Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 grid-tech opacity-60" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <Cpu className="size-3.5" /> Alta performance sob medida
            </span>
            <h1 className="mt-6 font-display text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              O PC certo para a sua{" "}
              <span className="bg-neon-gradient bg-clip-text text-transparent">carga de trabalho</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Montamos máquinas para criadores de conteúdo, editores 4K, laboratórios de IA, operações
              Web3 e gamers exigentes. Você responde 4 perguntas, nós entregamos a configuração ideal.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="shadow-neon">
                <Link to="/montar">
                  Montar Meu PC Agora <ArrowRight className="size-4" />
                </Link>
              </Button>
              <span className="text-sm text-muted-foreground">Orçamento no WhatsApp, sem compromisso.</span>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                ["+800", "builds entregues"],
                ["48h", "para o orçamento"],
                ["100%", "testado antes de enviar"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-border/60 bg-card/60 p-3">
                  <dt className="font-display text-xl font-bold text-primary">{value}</dt>
                  <dd className="text-xs text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-primary/10 blur-3xl" aria-hidden />
            <img
              src={heroImage}
              width={1536}
              height={1024}
              alt="PC gamer personalizado com iluminação verde neon e water cooler"
              className="relative rounded-2xl border border-border/70 shadow-panel"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-3xl font-bold">Feito para o seu tipo de trabalho</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Cada perfil exige uma combinação diferente de processador, GPU, memória e refrigeração.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item) => (
            <div
              key={item.title}
              className="group rounded-xl border border-border/70 bg-card p-6 transition-colors hover:border-primary/60"
            >
              <item.icon className="size-7 text-primary" />
              <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display text-3xl font-bold">Por que montar com a BuildForge</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {benefits.map((item) => (
              <div key={item.title} className="flex gap-4 rounded-xl border border-border/60 bg-card p-6">
                <item.icon className="mt-1 size-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Pronto para tirar o projeto do papel?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Responda o passo a passo e receba a sugestão de configuração junto com o orçamento no
          WhatsApp.
        </p>
        <Button asChild size="lg" className="mt-8 shadow-neon">
          <Link to="/montar">
            Montar Meu PC Agora <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>

      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-muted-foreground sm:flex-row">
          <span className="font-display font-semibold text-foreground">BuildForge</span>
          <span>© {new Date().getFullYear()} BuildForge. Todos os direitos reservados.</span>
        </div>
      </footer>
    </div>
  );
}
