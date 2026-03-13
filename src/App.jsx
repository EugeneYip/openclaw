import {
  BookOpen,
  Brain,
  CheckCircle2,
  Compass,
  Database,
  Globe,
  Layers3,
  Lock,
  MessageSquare,
  Plug,
  Route,
  Server,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Wrench,
  Workflow,
} from "lucide-react";

const sectionLinks = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How it works" },
  { id: "quickstart", label: "Quick start" },
  { id: "providers", label: "Providers" },
  { id: "channels", label: "Channels" },
  { id: "advanced", label: "Advanced features" },
  { id: "security", label: "Security" },
  { id: "commands", label: "Commands" },
];

const heroPills = ["Self-hosted", "Multi-channel", "Agent-native", "Open source"];

const audienceCards = [
  {
    icon: MessageSquare,
    title: "Everyday user",
    body: "Start with the local dashboard, then add one chat app such as WhatsApp or Telegram.",
  },
  {
    icon: TerminalSquare,
    title: "Operator",
    body: "Focus on onboarding, auth, policy, status, logs, doctor, and remote access.",
  },
  {
    icon: Layers3,
    title: "Power user",
    body: "Expand into multi-agent routing, browser automation, memory, hooks, and plugins.",
  },
];

const capabilityCards = [
  {
    icon: MessageSquare,
    title: "Chat apps you already use",
    body: "One Gateway can connect WhatsApp, Telegram, Discord, iMessage, and more.",
  },
  {
    icon: Brain,
    title: "Bring your own model provider",
    body: "Use API-key paths or newer OAuth-style flows, depending on the provider.",
  },
  {
    icon: Wrench,
    title: "Built-in agent tools",
    body: "OpenClaw now exposes typed tools such as browser, canvas, nodes, and cron.",
  },
  {
    icon: Database,
    title: "Memory and workspace",
    body: "Index memory, search semantic context, and keep agent workspaces organized.",
  },
  {
    icon: Workflow,
    title: "Automation and hooks",
    body: "Run scheduled tasks, react to events, and trigger external workflows.",
  },
  {
    icon: ShieldCheck,
    title: "Security-first controls",
    body: "Use allowlists, pairing, tool restrictions, sandboxing, and security audit checks.",
  },
];

const quickSteps = [
  "Install OpenClaw with the official installer",
  "Run onboarding and choose one provider",
  "Open the Control UI and send one local test message",
  "Run status, logs, and doctor",
  "Add one real channel and lock down who can use it",
  "Only then add tools, plugins, memory, or advanced automation",
];

const providerCards = [
  {
    title: "API-key setup",
    items: ["OpenAI API key", "Anthropic API key", "Gemini API key", "Best when you want explicit billing and simple setup"],
  },
  {
    title: "OAuth-style setup",
    items: ["OpenAI Codex OAuth", "Gemini CLI OAuth", "Antigravity OAuth via plugin", "Useful when the provider docs support account-based login flows"],
  },
  {
    title: "Operator rule",
    items: ["Pick one provider first", "Avoid stacking multiple auth methods on day one", "Document which flow you chose", "Plugin-based auth should be treated as a dependency"],
  },
];

const channelCards = [
  {
    title: "Direct messages",
    body: "Start here. DMs are the cleanest place to validate behavior before exposing group surfaces.",
  },
  {
    title: "Groups",
    body: "Groups need separate rules. Mention gating and allowlists help keep triggers deliberate.",
  },
  {
    title: "Identity and routing",
    body: "Different channels, accounts, peers, or groups can route to different agents with different policies.",
  },
];

const advancedCards = [
  {
    icon: Wrench,
    title: "Typed tools",
    body: "OpenClaw is no longer only a skills host. The docs now describe first-class tools for browser, canvas, nodes, and cron.",
  },
  {
    icon: Globe,
    title: "Managed browser",
    body: "The OpenClaw-managed browser runs in its own isolated profile, separate from your personal browser, and uses an orange accent by default.",
  },
  {
    icon: Database,
    title: "Semantic memory",
    body: "Memory can be indexed and searched semantically, so agents can retrieve stored context instead of relying only on live chat history.",
  },
  {
    icon: Workflow,
    title: "Hooks and webhooks",
    body: "OpenClaw can react to lifecycle events and can also connect outward through webhook-style flows.",
  },
  {
    icon: Route,
    title: "Multi-agent routing",
    body: "One Gateway can serve multiple agents, each with different tools, workspaces, and security profiles.",
  },
  {
    icon: Lock,
    title: "Per-agent sandboxing",
    body: "Agents can be restricted differently depending on whether they are personal, work-related, family-facing, or public-facing.",
  },
];

const securityItems = [
  "Keep the Gateway on loopback unless you have a deliberate remote-access plan",
  "Use the local dashboard before turning on external messaging channels",
  "Prefer allowlists or pairing over open inbound access",
  "Treat groups as higher-risk than DMs",
  "Restrict powerful tools on untrusted surfaces",
  "Run security audit checks before exposing anything remotely",
];

const commandBlocks = [
  {
    title: "First-day commands",
    code: `# install
curl -fsSL https://openclaw.ai/install.sh | bash

# guided setup
openclaw onboard --install-daemon

# local UI
openclaw dashboard

# quick health checks
openclaw status
openclaw logs --follow
openclaw doctor`,
  },
  {
    title: "Expansion commands",
    code: `# channels
openclaw channels status --probe
openclaw channels login --channel whatsapp

# tools and plugins
openclaw plugins list
openclaw skills list

# memory
openclaw memory status
openclaw memory index
openclaw memory search "project context"

# security
openclaw security audit
openclaw security audit --deep`,
  },
];

const bestPractices = [
  {
    area: "Best first test",
    recommendation: "Use the local Control UI before any live messaging app.",
  },
  {
    area: "Best first channel",
    recommendation: "Start with one DM channel, not a busy group.",
  },
  {
    area: "Best first provider",
    recommendation: "Choose one provider and one auth method only.",
  },
  {
    area: "Best remote pattern",
    recommendation: "Prefer loopback-first access with Tailscale Serve or SSH tunneling.",
  },
  {
    area: "Best security posture",
    recommendation: "Use allowlists, pairing, and narrow tool permissions.",
  },
  {
    area: "Best expansion order",
    recommendation: "Add tools, memory, plugins, and multi-agent routing after the base setup is stable.",
  },
];

export default function OpenClawGuideVerified2026() {
  return (
    <div className="min-h-screen bg-[#FFF7F1] text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <header className="overflow-hidden rounded-[34px] border border-[#F2D3C2] bg-[linear-gradient(135deg,#FFF9F5_0%,#FFF0E7_42%,#FFF7F1_100%)] shadow-[0_18px_60px_rgba(255,90,45,0.08)]">
          <div className="border-b border-[#F3D9CC] px-6 py-4 sm:px-8">
            <div className="flex flex-wrap items-center gap-2">
              {heroPills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-[#FFD0BF] bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#D14A22]"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                OpenClaw Guide
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">
                Use AI from the chat apps you already know, while keeping control of the Gateway,
                the models, the tools, and the security boundaries.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Badge icon={BookOpen} label="Designed for public readers" />
                <Badge icon={Compass} label="Fast to scan" />
                <Badge icon={ShieldCheck} label="Security-aware by default" />
              </div>
            </div>

            <div className="rounded-[28px] border border-[#FFD6C8] bg-white/85 p-5 shadow-[0_14px_40px_rgba(255,90,45,0.10)]">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[#D14A22]">
                In one sentence
              </div>
              <p className="mt-3 text-base leading-8 text-slate-700">
                OpenClaw is a self-hosted Gateway that connects chat apps to AI agents and lets you add tools,
                memory, automation, and multi-agent routing without giving up operational control.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <MiniStat label="Best first win" value="Local dashboard" />
                <MiniStat label="Best first habit" value="One provider only" />
                <MiniStat label="Best first channel" value="DM, not group" />
                <MiniStat label="Best first mindset" value="Secure by default" />
              </div>
            </div>
          </div>
        </header>

        <div className="sticky top-0 z-10 mt-6 overflow-x-auto rounded-2xl border border-[#F3D9CC] bg-[#FFF8F4]/95 px-3 py-3 backdrop-blur">
          <nav className="flex min-w-max gap-2">
            {sectionLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full border border-[#F1D4C6] bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#FFB89F] hover:text-[#D14A22]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <main className="mt-8 space-y-8">
          <Section id="overview" title="What OpenClaw does" icon={Sparkles}>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {capabilityCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Card key={card.title}>
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-[#FFEEE7] p-2.5 text-[#FF5A2D]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-semibold text-slate-900">{card.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-700">{card.body}</p>
                  </Card>
                );
              })}
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {audienceCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Card key={card.title} tone="soft">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-[#FFF1EB] p-2.5 text-[#FF7A3D]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-semibold text-slate-900">{card.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-700">{card.body}</p>
                  </Card>
                );
              })}
            </div>
          </Section>

          <Section id="how-it-works" title="How it works" icon={Workflow}>
            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <Card>
                <div className="space-y-4">
                  <FlowRow
                    left={{ label: "Chat apps", sub: "WhatsApp, Telegram, Discord, iMessage" }}
                    center={{ label: "Gateway", sub: "Routing, auth, sessions, policy, UI" }}
                    right={{ label: "Agents", sub: "Tools, memory, workspaces, behavior" }}
                  />
                  <FlowRow
                    left={{ label: "Model providers", sub: "OpenAI, Anthropic, Gemini, others" }}
                    center={{ label: "Control layer", sub: "Config, channels, status, security" }}
                    right={{ label: "Execution layer", sub: "Browser, canvas, nodes, cron, plugins" }}
                  />
                </div>
              </Card>

              <Card tone="soft">
                <h3 className="text-base font-semibold text-slate-900">Why this diagram matters</h3>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                  <li>It separates the chat surface from the model provider.</li>
                  <li>It shows that the Gateway is the control center, not just a relay.</li>
                  <li>It makes tools and memory visible as part of the platform, not as an afterthought.</li>
                  <li>It explains why troubleshooting should be layer-by-layer.</li>
                </ul>
              </Card>
            </div>
          </Section>

          <Section id="quickstart" title="Best first path" icon={Compass}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {quickSteps.map((step, index) => (
                <StepCard key={step} index={index + 1} text={step} />
              ))}
            </div>

            <Card tone="soft">
              <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">The most important rule</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    Prove the local Control UI first. It removes the noise of channel pairing, group policy,
                    and remote-access variables from your first test.
                  </p>
                </div>
                <Code>{`# fastest first success
openclaw dashboard`}</Code>
              </div>
            </Card>
          </Section>

          <Section id="providers" title="Providers and authentication" icon={Brain}>
            <div className="grid gap-5 lg:grid-cols-3">
              {providerCards.map((card) => (
                <Card key={card.title}>
                  <h3 className="text-base font-semibold text-slate-900">{card.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {card.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-7 text-slate-700">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#2FBF71]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              <Card>
                <h3 className="text-base font-semibold text-slate-900">Common provider commands</h3>
                <Code>{`# guided setup
openclaw onboard --install-daemon

# OpenAI Codex OAuth
openclaw onboard --auth-choice openai-codex
openclaw models auth login --provider openai-codex

# Gemini CLI OAuth plugin flow
openclaw plugins enable google-gemini-cli-auth
openclaw models auth login --provider google-gemini-cli --set-default`}</Code>
              </Card>

              <Card tone="soft">
                <h3 className="text-base font-semibold text-slate-900">Quick decision table</h3>
                <SimpleTable
                  headers={["Situation", "Better choice"]}
                  rows={[
                    ["I want the simplest first setup", "One provider with a conventional API-key flow"],
                    ["I am following a provider's account-based login flow", "Use the documented OAuth-style path"],
                    ["I need predictable debugging", "Avoid mixing multiple auth methods at once"],
                  ]}
                />
              </Card>
            </div>
          </Section>

          <Section id="channels" title="Channels and access control" icon={MessageSquare}>
            <div className="grid gap-5 lg:grid-cols-3">
              {channelCards.map((card) => (
                <Card key={card.title} tone="soft">
                  <h3 className="text-base font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{card.body}</p>
                </Card>
              ))}
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
              <Card>
                <h3 className="text-base font-semibold text-slate-900">Best-practice matrix</h3>
                <SimpleTable
                  headers={["Topic", "Best practice"]}
                  rows={[
                    ["First channel", "Use one DM channel before any group"],
                    ["Telegram", "Use numeric allowlists rather than loose username assumptions"],
                    ["WhatsApp", "Use pairing or allowlists, and keep access narrow"],
                    ["Groups", "Prefer allowlists and mention gating"],
                    ["Routing", "Different peers or channels can map to different agents"],
                  ]}
                />
              </Card>

              <Card>
                <h3 className="text-base font-semibold text-slate-900">Why channel policy deserves attention</h3>
                <div className="mt-4 space-y-3">
                  <PolicyCard title="DM policy" text="This determines who can reach the agent directly." />
                  <PolicyCard title="Group policy" text="This decides whether the agent should ever respond in shared spaces." />
                  <PolicyCard title="Mention gating" text="This helps prevent accidental or ambient triggering in groups." />
                  <PolicyCard title="Routing" text="This decides which agent should respond in which context." />
                </div>
              </Card>
            </div>
          </Section>

          <Section id="advanced" title="Advanced features worth knowing" icon={Layers3}>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {advancedCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Card key={card.title}>
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-[#FFF0E8] p-2.5 text-[#FF5A2D]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-semibold text-slate-900">{card.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-700">{card.body}</p>
                  </Card>
                );
              })}
            </div>

            <Card tone="soft">
              <h3 className="text-base font-semibold text-slate-900">What this means in practice</h3>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                OpenClaw is more than a simple chatbot bridge. Once the base setup is stable, it can become a layered platform
                for browser work, memory retrieval, scheduled jobs, channel-specific bots, and different agents with different trust levels.
              </p>
            </Card>
          </Section>

          <Section id="security" title="Security and remote access" icon={Server}>
            <div className="grid gap-5 xl:grid-cols-[1fr_0.95fr]">
              <Card>
                <h3 className="text-base font-semibold text-slate-900">Security checklist</h3>
                <ul className="mt-4 space-y-3">
                  {securityItems.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-slate-700">
                      <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[#2FBF71]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card tone="soft">
                <h3 className="text-base font-semibold text-slate-900">Best-practice summary</h3>
                <SimpleTable
                  headers={["Area", "Recommendation"]}
                  rows={bestPractices.map((row) => [row.area, row.recommendation])}
                />
              </Card>
            </div>
          </Section>

          <Section id="commands" title="Commands worth knowing" icon={TerminalSquare}>
            <div className="grid gap-5 xl:grid-cols-2">
              {commandBlocks.map((block) => (
                <Card key={block.title}>
                  <h3 className="text-base font-semibold text-slate-900">{block.title}</h3>
                  <div className="mt-4">
                    <Code>{block.code}</Code>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}

function Section({ id, title, icon: Icon, children }) {
  return (
    <section
      id={id}
      className="rounded-[30px] border border-[#F1D4C6] bg-[#FFFDFB] p-6 shadow-[0_12px_32px_rgba(255,90,45,0.06)] sm:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-[#FFF0E8] p-2.5 text-[#FF5A2D]">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Card({ children, tone = "default" }) {
  const toneClass = tone === "soft" ? "bg-[linear-gradient(180deg,#FFF9F4_0%,#FFFFFF_100%)]" : "bg-white/90";
  return (
    <div className={`rounded-[26px] border border-[#F0D8CC] ${toneClass} p-5 shadow-[0_8px_22px_rgba(255,90,45,0.05)]`}>
      {children}
    </div>
  );
}

function Badge({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#FFD0BF] bg-white/85 px-4 py-2 text-sm font-medium text-[#D14A22]">
      <Icon className="h-4 w-4" />
      {label}
    </span>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#F2D7CA] bg-[#FFF9F4] p-3">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8B7F77]">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function FlowRow({ left, center, right }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
      <FlowNode label={left.label} sub={left.sub} />
      <FlowArrow />
      <FlowNode label={center.label} sub={center.sub} emphasis />
      <FlowArrow />
      <FlowNode label={right.label} sub={right.sub} />
    </div>
  );
}

function FlowNode({ label, sub, emphasis = false }) {
  return (
    <div
      className={`rounded-[22px] border p-4 ${
        emphasis
          ? "border-[#FFCCB8] bg-[linear-gradient(180deg,#FFF3EC_0%,#FFFFFF_100%)] shadow-[0_8px_24px_rgba(255,90,45,0.08)]"
          : "border-[#F0D8CC] bg-white"
      }`}
    >
      <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8B7F77]">{label}</div>
      <div className="mt-2 text-sm leading-6 text-slate-700">{sub}</div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden lg:flex items-center justify-center text-[#FF9A74]">
      <div className="h-px w-8 bg-[#FFC0A9]" />
      <div className="mx-1 h-2.5 w-2.5 rotate-45 border-r-2 border-t-2 border-[#FFC0A9]" />
    </div>
  );
}

function StepCard({ index, text }) {
  return (
    <div className="rounded-[24px] border border-[#F0D8CC] bg-white/90 p-5 shadow-[0_8px_22px_rgba(255,90,45,0.05)]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFEEE7] text-sm font-semibold text-[#FF5A2D]">
          {index}
        </div>
        <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8B7F77]">Step {index}</div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-700">{text}</p>
    </div>
  );
}

function PolicyCard({ title, text }) {
  return (
    <div className="flex gap-4 rounded-[22px] border border-[#F0D8CC] bg-[#FFFDFB] p-4">
      <div className="mt-1 rounded-xl bg-[#FFF0E8] p-2 text-[#FF5A2D]">
        <Plug className="h-4 w-4" />
      </div>
      <div>
        <div className="font-semibold text-slate-900">{title}</div>
        <div className="mt-1 text-sm leading-7 text-slate-700">{text}</div>
      </div>
    </div>
  );
}

function SimpleTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-y-3">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-2 text-left text-sm font-semibold text-slate-900">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className={`rounded-2xl border border-[#F0D8CC] bg-white/88 px-4 py-4 align-top text-sm leading-7 ${
                    cellIdx === 0 ? "font-semibold text-slate-900" : "text-slate-700"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Code({ children }) {
  return (
    <pre className="overflow-x-auto rounded-[22px] border border-[#2A2F3A] bg-[#10131A] p-5 text-sm leading-7 text-[#DFF7E8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <code>{children}</code>
    </pre>
  );
}
