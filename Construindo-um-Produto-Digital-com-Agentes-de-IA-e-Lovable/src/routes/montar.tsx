import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  CircuitBoard,
  Coins,
  Gamepad2,
  Loader2,
  MessageCircle,
  Video,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { BUDGETS, GOALS, PLATFORMS, buildSuggestion, buildWhatsAppLink } from "@/lib/buildforge";

export const Route = createFileRoute("/montar")({
  head: () => ({
    meta: [
      { title: "Monte seu PC | BuildForge" },
      {
        name: "description",
        content:
          "Passo a passo para configurar seu PC de alta performance: objetivo, orçamento, plataforma e contato. Orçamento enviado pelo WhatsApp.",
      },
      { property: "og:title", content: "Monte seu PC | BuildForge" },
      {
        property: "og:description",
        content: "Responda 4 passos e receba a configuração sugerida com orçamento pelo WhatsApp.",
      },
    ],
  }),
  component: Wizard,
});

const goalIcons = { video: Video, brain: Brain, coins: Coins, gamepad: Gamepad2 } as const;

const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  whatsapp: z
    .string()
    .trim()
    .min(10, "Informe o WhatsApp com DDD")
    .max(20, "Número muito longo")
    .regex(/^[0-9()+\-\s]+$/, "Use apenas números e símbolos de telefone"),
  notes: z.string().trim().max(500, "Máximo de 500 caracteres").optional(),
});

const steps = ["Objetivo", "Orçamento", "Preferências", "Contato"];

function Wizard() {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("");
  const [platform, setPlatform] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", whatsapp: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState<null | { link: string }>(null);

  const suggestion = goal ? buildSuggestion(goal, budget, platform) : null;

  async function handleSubmit() {
    const parsed = contactSchema.safeParse(contact);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSaving(true);
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      whatsapp: parsed.data.whatsapp,
      goal,
      budget,
      platform,
      notes: parsed.data.notes || null,
    });
    setSaving(false);

    if (error) {
      toast.error("Não conseguimos salvar seu pedido. Tente novamente.");
      return;
    }

    toast.success("Pedido registrado! Agora é só enviar no WhatsApp.");
    setDone({
      link: buildWhatsAppLink({
        name: parsed.data.name,
        email: parsed.data.email,
        whatsapp: parsed.data.whatsapp,
        notes: parsed.data.notes ?? "",
        goal,
        budget,
        platform,
      }),
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2">
            <CircuitBoard className="size-5 text-primary" />
            <span className="font-display font-bold">BuildForge</span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="size-4" /> Voltar
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12">
        {done ? (
          <div className="rounded-2xl border border-primary/50 bg-card p-8 text-center shadow-neon">
            <CheckCircle2 className="mx-auto size-12 text-primary" />
            <h1 className="mt-5 font-display text-2xl font-bold">Configuração pronta!</h1>
            <p className="mt-2 text-muted-foreground">
              Salvamos seu pedido. Envie no WhatsApp para falar com um especialista agora.
            </p>
            {suggestion && <SummaryCard goal={goal} budget={budget} platform={platform} suggestion={suggestion} />}
            <Button asChild size="lg" className="mt-6 shadow-neon">
              <a href={done.link} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" /> Enviar Pedido de Orçamento via WhatsApp
              </a>
            </Button>
          </div>
        ) : (
          <>
            <ol className="mb-8 flex items-center gap-2">
              {steps.map((label, index) => (
                <li key={label} className="flex flex-1 flex-col gap-2">
                  <div
                    className={`h-1.5 rounded-full ${index <= step ? "bg-neon-gradient" : "bg-muted"}`}
                  />
                  <span
                    className={`text-xs font-medium ${index <= step ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {index + 1}. {label}
                  </span>
                </li>
              ))}
            </ol>

            <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-panel sm:p-8">
              {step === 0 && (
                <Section title="Qual será o foco principal da máquina?" subtitle="Escolha a carga de trabalho dominante.">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {GOALS.map((option) => {
                      const Icon = goalIcons[option.icon];
                      return (
                        <OptionCard
                          key={option.value}
                          selected={goal === option.value}
                          onClick={() => setGoal(option.value)}
                          title={option.label}
                          description={option.description}
                          icon={<Icon className="size-5 text-primary" />}
                        />
                      );
                    })}
                  </div>
                </Section>
              )}

              {step === 1 && (
                <Section title="Qual a faixa de orçamento?" subtitle="Usamos isso para calibrar as peças.">
                  <div className="grid gap-3">
                    {BUDGETS.map((option) => (
                      <OptionCard
                        key={option.value}
                        selected={budget === option.value}
                        onClick={() => setBudget(option.value)}
                        title={option.label}
                        description={option.note}
                      />
                    ))}
                  </div>
                </Section>
              )}

              {step === 2 && (
                <Section title="Tem preferência de plataforma?" subtitle="Se não tiver, deixa com a gente.">
                  <div className="grid gap-3">
                    {PLATFORMS.map((option) => (
                      <OptionCard
                        key={option.value}
                        selected={platform === option.value}
                        onClick={() => setPlatform(option.value)}
                        title={option.label}
                        description={option.note}
                      />
                    ))}
                  </div>
                </Section>
              )}

              {step === 3 && (
                <Section title="Para onde enviamos o orçamento?" subtitle="Seus dados ficam só com a nossa equipe.">
                  <div className="grid gap-4">
                    <Field label="Nome completo" error={errors["name"]}>
                      <Input
                        value={contact.name}
                        maxLength={100}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        placeholder="Seu nome"
                      />
                    </Field>
                    <Field label="E-mail" error={errors["email"]}>
                      <Input
                        type="email"
                        value={contact.email}
                        maxLength={255}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        placeholder="voce@email.com"
                      />
                    </Field>
                    <Field label="WhatsApp (com DDD)" error={errors["whatsapp"]}>
                      <Input
                        value={contact.whatsapp}
                        maxLength={20}
                        onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                        placeholder="(11) 99999-9999"
                      />
                    </Field>
                    <Field label="Observações (opcional)" error={errors["notes"]}>
                      <Textarea
                        value={contact.notes}
                        maxLength={500}
                        onChange={(e) => setContact({ ...contact, notes: e.target.value })}
                        placeholder="Softwares que usa, periféricos, prazo..."
                      />
                    </Field>
                  </div>
                  {suggestion && (
                    <SummaryCard goal={goal} budget={budget} platform={platform} suggestion={suggestion} />
                  )}
                </Section>
              )}

              <div className="mt-8 flex items-center justify-between gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0 || saving}
                >
                  <ArrowLeft className="size-4" /> Anterior
                </Button>
                {step < 3 ? (
                  <Button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={(step === 0 && !goal) || (step === 1 && !budget) || (step === 2 && !platform)}
                  >
                    Continuar <ArrowRight className="size-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={saving} className="shadow-neon">
                    {saving ? <Loader2 className="size-4 animate-spin" /> : <MessageCircle className="size-4" />}
                    Gerar orçamento
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  title,
  description,
  icon,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${
        selected
          ? "border-primary bg-primary/10 shadow-neon"
          : "border-border bg-surface/40 hover:border-primary/50"
      }`}
    >
      {icon}
      <span>
        <span className="block font-display text-base font-semibold">{title}</span>
        <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
      </span>
    </button>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

function SummaryCard({
  goal,
  budget,
  platform,
  suggestion,
}: {
  goal: string;
  budget: string;
  platform: string;
  suggestion: { cpu: string; gpu: string; ram: string; storage: string; extra: string };
}) {
  return (
    <div className="mt-6 rounded-xl border border-primary/40 bg-surface/50 p-5 text-left">
      <h2 className="font-display text-lg font-semibold">Resumo da configuração sugerida</h2>
      <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
        {goal} • {budget || "orçamento a definir"} • {platform || "plataforma a definir"}
      </p>
      <ul className="mt-4 grid gap-2 text-sm">
        <li><span className="text-muted-foreground">Processador:</span> {suggestion.cpu}</li>
        <li><span className="text-muted-foreground">Placa de vídeo:</span> {suggestion.gpu}</li>
        <li><span className="text-muted-foreground">Memória:</span> {suggestion.ram}</li>
        <li><span className="text-muted-foreground">Armazenamento:</span> {suggestion.storage}</li>
        <li><span className="text-muted-foreground">Extras:</span> {suggestion.extra}</li>
      </ul>
    </div>
  );
}
