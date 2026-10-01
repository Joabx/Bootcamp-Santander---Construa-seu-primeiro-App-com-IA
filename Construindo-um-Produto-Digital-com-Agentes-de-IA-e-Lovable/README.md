# 🛠️ BuildForge - MVP de Consultoria e Montagem de PCs

Plataforma web desenvolvida como MVP para validar a demanda por consultoria especializada e recomendação de hardware sob medida para entusiastas e profissionais de alto desempenho.

Link: https://buildforge-pro-builder.lovable.app
---

## 1. A Dor Escolhida e Por Que Vale um Negócio

* **A Dor:** Profissionais e entusiastas de tecnologia avançada — como editores de vídeo, criadores de conteúdo 4K/8K, desenvolvedores rodando modelos de Inteligência Artificial localmente, usuários de Web3/dApps pesados e mineradores de criptomoedas — enfrentam enorme complexidade ao escolher hardware.
Eles precisam de máquinas com gargalos zerados, placas de vídeo robustas (GPUs com muita VRAM para IA/edição/mineração), refrigeração adequada e fontes de alta potência e confiabilidade.
Errar uma peça significa perda de dinheiro, lentidão em renderizações ou instabilidade em operações críticas.
* **Por Que Vale um Negócio:** O mercado de tecnologia de alta performance exige conhecimento técnico específico que vai muito além de um computador comum. Oferecer consultoria especializada para esse público garante o dimensionamento perfeito de rigs, estações de trabalho e setups robustos, gerando alta conversão e valor agregado por projeto.

---

## 2. Tamanho de Mercado e Business Model Canvas (BMC)

### Tamanho de Mercado
* **TAM (Total Addressable Market):** Mercado global e nacional de hardware de alto desempenho e estações de trabalho.
* **SAM (Serviceable Available Market):** Editores de vídeo, criadores de conteúdo, programadores de IA, entusiastas de Web3 e mineradores de cripto no Brasil que buscam rigs customizados.
* **SOM (Serviceable Obtainable Market):** A fatia inicial de profissionais e criadores atendidos via consultoria especializada nos primeiros meses de operação.

### Business Model Canvas
* **Proposta de Valor:** Entregar o projeto de hardware ideal para cargas de trabalho extremas (IA, edição pesada, Web3 e mineração) com compatibilidade garantida, eficiência energética e sem dor de cabeça.
* **Segmento de Clientes:** Editores de vídeo, criadores de conteúdo, desenvolvedores de IA, operadores de Web3 e mineradores de criptomoedas.
* **Canais:** Landing Page de captura e atendimento consultivo direto via WhatsApp.
* **Relacionamento com o Cliente:** Atendimento técnico personalizado, focado em performance, custo-benefício e confiabilidade dos componentes.
* **Fontes de Receita:** Cobrança de taxa de consultoria técnica para dimensionamento de estações de trabalho e rigs.
* **Recursos Principais:** Conhecimento técnico avançado em arquitetura de hardware, GPUs e sistemas de refrigeração, além da plataforma web MVP.
* **Parcerias Principais:** Lojas de e-commerce de hardware (Kabum, Terabyte, Pichau) para cotação e indicação de peças.
* **Atividades Principais:** Diagnóstico de demandas de processamento pesado, validação de compatibilidade (placa-mãe, linhas PCIe, fontes de alta potência) e acompanhamento do cliente.
* **Estrutura de Custos:** Hospedagem da aplicação web e tempo de consultoria especializada.

---

## 3. A Tese do MVP e O Que Ficou Manual

* **A Tese do MVP:** Validar se profissionais de alta performance (como criadores e entusiastas de IA/Web3) estão dispostos a preencher um formulário detalhado especificando sua carga de trabalho para receber uma recomendação de setup, convertendo o interesse em contato ativo pelo WhatsApp.
* **O Que Ficou Manual de Propósito:** 
  * A verificação em tempo real de estoque de placas de vídeo e fontes de alta potência nos e-commerces.
  * O fechamento final do pagamento (via Pix ou transferência) e a validação minuciosa final do dimensionamento elétrico/térmico feita pelo especialista.

---

## 4. O Mega Prompt e as Correções

### Mega Prompt Utilizado no Lovable:
```markdown
Crie um MVP completo de uma plataforma web moderna, responsiva e focada em conversão chamada "BuildForge" (focada em customização e montagem de PCs de alta performance).

A aplicação deve conter:
1. Landing Page Pública: Hero section moderna e tecnológica (tons de azul escuro, cinza escuro e detalhes em verde neon, estilo hardware/gaming), proposta de valor clara focada em criadores de conteúdo, editores, IA, Web3 e mineração, seção de benefícios e botão de destaque "Montar Meu PC Agora".
2. Formulário / Wizard de Montagem (Passo a Passo Interativo):
   - Passo 1 (Objetivo/Carga de Trabalho): Foco principal (Ex: Edição de Vídeo / 4K, IA e Machine Learning Local, Web3 / Cripto / Mineração, Jogos AAA).
   - Passo 2 (Orçamento): Faixa de orçamento (Ex: R$ 5.000 - R$ 8.000, R$ 8.000 - R$ 15.000, Acima de R$ 15.000).
   - Passo 3 (Preferências): Plataforma preferida (Intel/NVIDIA, AMD/Radeon ou "Deixe o Especialista Escolher").
   - Passo 4 (Contato): Nome, E-mail e WhatsApp do cliente.
   - Ação Final: Resumo da configuração sugerida e botão "Enviar Pedido de Orçamento via WhatsApp" com link (wa.me/...) pré-formatado contendo os dados escolhidos. Os dados também devem ser salvos automaticamente na tabela do Lovable Cloud.
3. Painel Administrativo (/admin): Tela simples para gerenciar leads com listagem em tabela (Nome, Objetivo, Orçamento, WhatsApp, Data e Status), capacidade de atualizar o status e indicadores rápidos no topo.

Utilize Tailwind CSS, ícones da Lucide React e design profissional de mercado.