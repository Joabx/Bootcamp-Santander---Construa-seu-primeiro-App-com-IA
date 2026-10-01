export const WHATSAPP_NUMBER = "5577111111111";

export const GOALS = [
  {
    value: "Edição de Vídeo / 4K",
    label: "Edição de Vídeo / 4K",
    description: "Timeline fluida, render rápido e muita RAM.",
    icon: "video",
  },
  {
    value: "IA e Machine Learning Local",
    label: "IA e Machine Learning Local",
    description: "VRAM alta para treinar e rodar modelos.",
    icon: "brain",
  },
  {
    value: "Web3 / Cripto / Mineração",
    label: "Web3 / Cripto / Mineração",
    description: "Eficiência energética e operação 24/7.",
    icon: "coins",
  },
  {
    value: "Jogos AAA",
    label: "Jogos AAA",
    description: "Alto FPS em 1440p e 4K com ray tracing.",
    icon: "gamepad",
  },
] as const;

export const BUDGETS = [
  { value: "R$ 5.000 - R$ 8.000", label: "R$ 5.000 - R$ 8.000", note: "Entrada performance" },
  { value: "R$ 8.000 - R$ 15.000", label: "R$ 8.000 - R$ 15.000", note: "Alto desempenho" },
  { value: "Acima de R$ 15.000", label: "Acima de R$ 15.000", note: "Workstation extrema" },
] as const;

export const PLATFORMS = [
  { value: "Intel / NVIDIA", label: "Intel / NVIDIA", note: "CUDA, NVENC e estabilidade" },
  { value: "AMD / Radeon", label: "AMD / Radeon", note: "Mais núcleos por real investido" },
  {
    value: "Deixe o Especialista Escolher",
    label: "Deixe o Especialista Escolher",
    note: "Montamos o melhor custo-benefício",
  },
] as const;

type Build = { cpu: string; gpu: string; ram: string; storage: string; extra: string };

const BASE: Record<string, Build> = {
  "Edição de Vídeo / 4K": {
    cpu: "CPU 12–16 núcleos focada em render",
    gpu: "GPU com encoder dedicado e 12–16GB",
    ram: "64GB DDR5",
    storage: "NVMe 2TB (sistema) + 4TB (projetos)",
    extra: "Placa-mãe com Thunderbolt/USB-C e refrigeração silenciosa",
  },
  "IA e Machine Learning Local": {
    cpu: "CPU de alto clock com muitas linhas PCIe",
    gpu: "GPU com 16–24GB de VRAM (foco CUDA)",
    ram: "64–128GB DDR5",
    storage: "NVMe 2TB Gen4 para datasets",
    extra: "Fonte com folga para upgrade de segunda GPU",
  },
  "Web3 / Cripto / Mineração": {
    cpu: "CPU eficiente de baixo consumo",
    gpu: "GPUs otimizadas para eficiência (MH/W)",
    ram: "32GB DDR5",
    storage: "NVMe 1TB",
    extra: "Fonte platinum, airflow reforçado e operação 24/7",
  },
  "Jogos AAA": {
    cpu: "CPU gamer de alto clock",
    gpu: "GPU top de linha para 1440p/4K",
    ram: "32GB DDR5 6000MHz",
    storage: "NVMe 2TB Gen4",
    extra: "Water cooler 360mm e gabinete com vidro temperado",
  },
};

export function buildSuggestion(goal: string, budget: string, platform: string): Build {
  const base = BASE[goal] ?? BASE["Jogos AAA"]!;
  const plat = platform.startsWith("AMD")
    ? "AMD Ryzen / Radeon"
    : platform.startsWith("Intel")
      ? "Intel Core / GeForce RTX"
      : "melhor plataforma do momento";

  const tier =
    budget === "Acima de R$ 15.000"
      ? "topo de linha"
      : budget === "R$ 8.000 - R$ 15.000"
        ? "alto desempenho"
        : "custo-benefício otimizado";

  return {
    cpu: `${base.cpu} (${plat}, linha ${tier})`,
    gpu: `${base.gpu} — ${plat}`,
    ram: base.ram,
    storage: base.storage,
    extra: base.extra,
  };
}

export function buildWhatsAppLink(data: {
  name: string;
  email: string;
  whatsapp: string;
  goal: string;
  budget: string;
  platform: string;
  notes?: string;
}) {
  const build = buildSuggestion(data.goal, data.budget, data.platform);
  const message = [
    "Olá, BuildForge! Quero um orçamento de PC personalizado.",
    "",
    `Nome: ${data.name}`,
    `E-mail: ${data.email}`,
    `WhatsApp: ${data.whatsapp}`,
    "",
    `Objetivo: ${data.goal}`,
    `Orçamento: ${data.budget}`,
    `Plataforma: ${data.platform}`,
    data.notes ? `Observações: ${data.notes}` : "",
    "",
    "Sugestão inicial:",
    `- Processador: ${build.cpu}`,
    `- Placa de vídeo: ${build.gpu}`,
    `- Memória: ${build.ram}`,
    `- Armazenamento: ${build.storage}`,
    `- Extras: ${build.extra}`,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const STATUS_OPTIONS = [
  { value: "novo", label: "Novo" },
  { value: "em_contato", label: "Em contato" },
  { value: "orcamento_enviado", label: "Orçamento enviado" },
  { value: "fechado", label: "Fechado" },
  { value: "perdido", label: "Perdido" },
] as const;

export type LeadStatus = (typeof STATUS_OPTIONS)[number]["value"];

export function statusLabel(status: string) {
  return STATUS_OPTIONS.find((s) => s.value === status)?.label ?? status;
}
