import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   ICON SYSTEM — Pure SVG, zero external dependencies
   All icons use a 24×24 viewBox. Add new entries to ICON_PATHS as needed.
   ═══════════════════════════════════════════════════════════════════════════ */

const ICON_PATHS = {
  bookOpen:
    "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z",
  brain:
    "M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7zM9 21h6M12 2v4M8 8h3M13 8h3M9.5 12H12M12 12h2.5",
  checkCircle:
    "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
  compass:
    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z",
  database:
    "M12 2C7.58 2 4 3.79 4 6v12c0 2.21 3.58 4 8 4s8-1.79 8-4V6c0-2.21-3.58-4-8-4zM4 6c0 2.21 3.58 4 8 4s8-1.79 8-4M4 12c0 2.21 3.58 4 8 4s8-1.79 8-4",
  globe:
    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  layers:
    "M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  messageSquare:
    "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z",
  plug: "M12 22v-5M9 7V2m6 5V2M5 12H2m20 0h-3M7 7h10a2 2 0 0 1 2 2v2a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5V9a2 2 0 0 1 2-2z",
  route:
    "M3 17h2a2 2 0 0 0 2-2V9a2 2 0 0 1 2-2h1m4 0h1a2 2 0 0 1 2 2v6a2 2 0 0 0 2 2h2M6 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  server:
    "M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5zm0 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4zm4-8h.01M6 17h.01",
  shieldCheck:
    "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4",
  sparkles:
    "M12 3l1.912 5.813L20 10.5l-6.088 1.687L12 18l-1.912-5.813L4 10.5l6.088-1.687L12 3zM5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75L5 3zM19 17l.75 2.25L22 20l-2.25.75L19 23l-.75-2.25L16 20l2.25-.75L19 17z",
  terminal:
    "M4 17l6-6-6-6M12 19h8",
  wrench:
    "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  workflow:
    "M3 3h6v6H3V3zm12 0h6v6h-6V3zm-6 12h6v6H9v-6zM6 9v6M18 9v6M9 18H6a3 3 0 0 1-3-3M15 18h3a3 3 0 0 0 3-3",
  chevronDown: "M6 9l6 6 6-6",
  chevronRight: "M9 18l6-6-6-6",
  copy: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z",
  check: "M20 6 9 17l-5-5",
  alertTriangle:
    "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01",
  lightbulb:
    "M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  search: "M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z",
  clock: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2",
  externalLink:
    "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3",
  menu: "M3 12h18M3 6h18M3 18h18",
  x: "M18 6 6 18M6 6l12 12",
};

function Icon({ name, size = 20, className = "", strokeWidth = 1.8, style = {} }) {
  const d = ICON_PATHS[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA — All section content defined here for clarity
   ═══════════════════════════════════════════════════════════════════════════ */

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "sparkles" },
  { id: "architecture", label: "Architecture", icon: "workflow" },
  { id: "quickstart", label: "Quick Start", icon: "compass" },
  { id: "providers", label: "Providers", icon: "brain" },
  { id: "channels", label: "Channels", icon: "messageSquare" },
  { id: "tools", label: "Tools & Memory", icon: "wrench" },
  { id: "advanced", label: "Advanced", icon: "layers" },
  { id: "security", label: "Security", icon: "shieldCheck" },
  { id: "troubleshooting", label: "Troubleshooting", icon: "search" },
  { id: "commands", label: "Commands", icon: "terminal" },
];

const HERO_PILLS = [
  "Self-hosted",
  "Multi-channel",
  "Agent-native",
  "Open source",
];

const AUDIENCE_TIERS = [
  {
    icon: "messageSquare",
    tier: "Beginner",
    title: "Everyday user",
    body: "Start with the local dashboard. Connect one chat app such as WhatsApp or Telegram. Learn the basics of talking to your agent and reviewing its output.",
    sections: "Quick Start → Providers → Channels",
  },
  {
    icon: "terminal",
    tier: "Intermediate",
    title: "Operator",
    body: "Master onboarding, authentication, channel policy, status monitoring, log analysis, the doctor command, and remote-access patterns.",
    sections: "All above → Security → Troubleshooting",
  },
  {
    icon: "layers",
    tier: "Advanced",
    title: "Power user",
    body: "Expand into multi-agent routing, browser automation, semantic memory, hooks, plugins, per-agent sandboxing, and production deployment.",
    sections: "All above → Tools & Memory → Advanced",
  },
];

const CAPABILITY_CARDS = [
  {
    icon: "messageSquare",
    title: "Chat apps you already use",
    body: "One Gateway connects WhatsApp, Telegram, Discord, iMessage, and more. No new app to learn — your existing chat surfaces become AI-powered.",
    example:
      "Send a message to your WhatsApp contact and get a response from Claude, GPT-4, or Gemini — all routed through the same Gateway.",
  },
  {
    icon: "brain",
    title: "Bring your own model provider",
    body: "Use API-key paths or newer OAuth-style flows, depending on the provider. Switch providers or stack them behind routing rules.",
    example:
      "Use Anthropic for long-form writing tasks and OpenAI for code generation, routed by channel or keyword.",
  },
  {
    icon: "wrench",
    title: "Built-in agent tools",
    body: "OpenClaw exposes typed tools such as browser, canvas, nodes, and cron. These are first-class citizens, not afterthoughts.",
    example:
      "Ask your agent to browse a URL, extract data, and save it to a canvas workspace — all within a single conversation.",
  },
  {
    icon: "database",
    title: "Memory and workspace",
    body: "Index memory, search semantic context, and keep agent workspaces organized. Agents remember what matters across sessions.",
    example:
      'Use "openclaw memory search" to find previous conversation context about a project, then feed it into the current task.',
  },
  {
    icon: "workflow",
    title: "Automation and hooks",
    body: "Run scheduled tasks, react to events, and trigger external workflows. The cron tool and hook system make agents proactive, not just reactive.",
    example:
      "Schedule a daily digest at 8 AM that summarizes unread messages and sends the summary to your Telegram DM.",
  },
  {
    icon: "shieldCheck",
    title: "Security-first controls",
    body: "Use allowlists, pairing, tool restrictions, sandboxing, and security audit checks. Every surface has its own policy layer.",
    example:
      "Restrict browser and file-system tools on public-facing group channels while allowing full access on your private DM.",
  },
];

const QUICK_STEPS = [
  {
    step: 1,
    title: "Install OpenClaw",
    desc: "Run the official installer. It sets up the binary, creates the config directory, and optionally installs the background daemon.",
    cmd: "curl -fsSL https://openclaw.ai/install.sh | bash",
    tip: "On macOS, you may need to allow the binary in System Settings → Privacy & Security after the first run.",
  },
  {
    step: 2,
    title: "Run onboarding",
    desc: "The interactive onboarding wizard walks you through provider selection, API key entry, and daemon configuration.",
    cmd: "openclaw onboard --install-daemon",
    tip: "Choose only one provider during onboarding. You can add more later.",
  },
  {
    step: 3,
    title: "Open the Control UI",
    desc: "The local dashboard is a web interface at localhost. Use it to send a test message before connecting any external channel.",
    cmd: "openclaw dashboard",
    tip: "This is the safest place to test. No channel pairing, no group noise, no remote-access variables.",
  },
  {
    step: 4,
    title: "Run health checks",
    desc: "Confirm the daemon is running, the provider is reachable, and no configuration warnings exist.",
    cmd: "openclaw status\nopenclaw logs --follow\nopenclaw doctor",
    tip: "If doctor reports warnings, fix them before proceeding. Don't skip this step.",
  },
  {
    step: 5,
    title: "Add your first channel",
    desc: "Connect one real messaging channel — start with a DM, not a group. Use pairing or allowlists to control who can reach the agent.",
    cmd: "openclaw channels login --channel whatsapp\nopenclaw channels status --probe",
    tip: "Validate by sending a DM to the channel. If it works, you know the base path is solid.",
  },
  {
    step: 6,
    title: "Expand gradually",
    desc: "Only after the base setup is stable, add tools, plugins, memory, automation, or multi-agent routing.",
    cmd: "openclaw plugins list\nopenclaw skills list\nopenclaw memory status",
    tip: "Treat each expansion as a separate deployment. Test after each addition.",
  },
];

const PROVIDER_DATA = {
  apiKey: {
    title: "API-key setup",
    desc: "The traditional approach. You generate an API key from the provider's dashboard and paste it into OpenClaw's configuration. Billing is explicit and predictable.",
    providers: [
      { name: "OpenAI", cmd: "openclaw onboard --provider openai" },
      { name: "Anthropic", cmd: "openclaw onboard --provider anthropic" },
      { name: "Gemini", cmd: "openclaw onboard --provider gemini" },
    ],
    pros: ["Simple setup", "Explicit billing", "Easy to rotate keys", "No browser flow required"],
    cons: ["Manual key management", "Keys can leak if config is exposed"],
  },
  oauth: {
    title: "OAuth-style setup",
    desc: "Newer providers support account-based login flows. The browser opens, you authenticate, and the token is stored locally. Useful when the provider's docs recommend this path.",
    providers: [
      {
        name: "OpenAI Codex OAuth",
        cmd: "openclaw onboard --auth-choice openai-codex\nopenclaw models auth login --provider openai-codex",
      },
      {
        name: "Gemini CLI OAuth",
        cmd: "openclaw plugins enable google-gemini-cli-auth\nopenclaw models auth login --provider google-gemini-cli --set-default",
      },
    ],
    pros: ["No manual key copy", "Account-level permissions", "Some providers prefer this flow"],
    cons: ["Requires a browser session", "Token refresh can fail silently", "Plugin-based auth is a dependency"],
  },
};

const CHANNEL_DETAIL = [
  {
    icon: "messageSquare",
    title: "WhatsApp",
    desc: "Uses QR-code pairing via the WhatsApp Web bridge. The agent appears as a contact on your phone.",
    bestPractice: "Use allowlists to restrict who can message the agent. Keep it to known numbers only.",
    cmd: "openclaw channels login --channel whatsapp",
  },
  {
    icon: "messageSquare",
    title: "Telegram",
    desc: "Create a Telegram bot via BotFather. OpenClaw connects to it via the bot token.",
    bestPractice: "Use numeric user-ID allowlists, not username matching. Usernames can change; IDs cannot.",
    cmd: "openclaw channels login --channel telegram",
  },
  {
    icon: "messageSquare",
    title: "Discord",
    desc: "Create a Discord application and bot. OpenClaw connects using the bot token.",
    bestPractice: "Restrict the bot to specific channels using Discord's own permission system, then layer OpenClaw allowlists on top.",
    cmd: "openclaw channels login --channel discord",
  },
];

const TOOL_CARDS = [
  {
    icon: "globe",
    title: "Managed browser",
    desc: "An isolated browser profile, separate from your personal browser. Uses an orange accent by default so you never confuse it with your own sessions.",
    usage: "The agent can browse URLs, fill forms, extract content, and take screenshots — all sandboxed.",
    cmd: "openclaw tools browser status",
  },
  {
    icon: "database",
    title: "Semantic memory",
    desc: "Memory is indexed and searchable by meaning, not just keyword. Agents retrieve stored context instead of relying only on live chat history.",
    usage: "Index project notes, conversation summaries, or reference documents. Search returns the most relevant chunks.",
    cmd: 'openclaw memory index\nopenclaw memory search "project context"',
  },
  {
    icon: "workflow",
    title: "Hooks and webhooks",
    desc: "React to lifecycle events (message received, tool called, error thrown) and connect outward through webhook-style flows.",
    usage: "Trigger a Slack notification when the agent encounters an error. Run a cleanup script when a session ends.",
    cmd: "openclaw hooks list\nopenclaw hooks add --event on-error --action webhook --url https://...",
  },
  {
    icon: "clock",
    title: "Cron scheduling",
    desc: "Schedule recurring tasks that agents execute on a timer. The cron tool is a first-class part of the platform.",
    usage: "Schedule a daily market summary at 7 AM, a weekly project status report on Mondays, or a periodic health check.",
    cmd: 'openclaw cron add --schedule "0 7 * * *" --task "daily-summary"',
  },
];

const ADVANCED_TOPICS = [
  {
    icon: "route",
    title: "Multi-agent routing",
    desc: "One Gateway can serve multiple agents, each with different tools, workspaces, and security profiles. Routing rules determine which agent handles which context.",
    details: [
      "Route by channel: WhatsApp → personal agent, Discord → work agent",
      "Route by peer: specific contacts go to specific agents",
      "Route by keyword or intent: code questions → dev agent, writing → creative agent",
      "Each agent has its own tool permissions and memory space",
    ],
    cmd: "openclaw agents list\nopenclaw agents route --channel whatsapp --agent personal\nopenclaw agents route --channel discord --agent work",
  },
  {
    icon: "lock",
    title: "Per-agent sandboxing",
    desc: "Agents can be restricted differently depending on their purpose. A family-facing agent should not have the same tool access as a development agent.",
    details: [
      "Personal agents: full tool access, browser, memory, file system",
      "Work agents: scoped tools, audit logging, no personal memory",
      "Family agents: no browser, no file system, curated responses only",
      "Public agents: maximum restriction, allowlisted tools only",
    ],
    cmd: 'openclaw agents sandbox --agent family --deny browser,filesystem\nopenclaw agents sandbox --agent work --allow "tools:code,tools:search"',
  },
  {
    icon: "plug",
    title: "Plugin ecosystem",
    desc: "OpenClaw plugins extend the platform with third-party integrations, additional auth methods, and custom tool definitions.",
    details: [
      "Plugins are managed via the CLI: list, enable, disable, update",
      "Auth plugins add new provider login flows",
      "Tool plugins add new capabilities (e.g., image generation, database queries)",
      "Treat plugin-based auth as a dependency — document it, pin versions",
    ],
    cmd: "openclaw plugins list\nopenclaw plugins enable <plugin-name>\nopenclaw plugins update",
  },
];

const SECURITY_CHECKLIST = [
  {
    category: "Network",
    items: [
      "Keep the Gateway on loopback (127.0.0.1) unless you have a deliberate remote-access plan",
      "If remote access is needed, use Tailscale Serve, SSH tunneling, or a VPN — never expose the port directly",
      "Run the security audit before any remote exposure",
    ],
  },
  {
    category: "Access control",
    items: [
      "Prefer allowlists or pairing over open inbound access",
      "Use the local dashboard before turning on external messaging channels",
      "Treat groups as higher-risk than DMs — they need separate, stricter rules",
    ],
  },
  {
    category: "Tools",
    items: [
      "Restrict powerful tools (browser, filesystem) on untrusted surfaces",
      "Use per-agent sandboxing to enforce tool boundaries",
      "Audit tool usage logs regularly",
    ],
  },
  {
    category: "Operations",
    items: [
      'Run "openclaw security audit" before any production exposure',
      'Run "openclaw security audit --deep" periodically',
      "Keep OpenClaw updated — security patches are time-sensitive",
    ],
  },
];

const TROUBLESHOOTING = [
  {
    problem: "Agent does not respond",
    steps: [
      'Run "openclaw status" — is the daemon running?',
      'Run "openclaw doctor" — are there configuration warnings?',
      'Check "openclaw logs --follow" — is the provider reachable?',
      "Verify the API key or OAuth token has not expired",
      "Test from the local dashboard first to isolate the issue",
    ],
  },
  {
    problem: "Channel pairing fails",
    steps: [
      'Run "openclaw channels status --probe" to check channel health',
      "For WhatsApp: ensure you scanned the QR code within the timeout window",
      "For Telegram: verify the bot token with BotFather",
      "For Discord: check the bot's permissions in the server settings",
      "Restart the daemon and try again: openclaw daemon restart",
    ],
  },
  {
    problem: "Memory search returns no results",
    steps: [
      'Run "openclaw memory status" — is the index built?',
      'Run "openclaw memory index" to rebuild the index',
      "Verify the content was actually stored — check the memory directory",
      "Try broader search terms — semantic search finds meaning, not exact keywords",
    ],
  },
  {
    problem: "Tools are not available to the agent",
    steps: [
      'Run "openclaw skills list" — are the tools listed?',
      "Check the agent's sandbox config — is the tool allowed?",
      "Verify the tool's dependencies are installed (e.g., browser requires Chromium)",
      'Check "openclaw logs" for tool-loading errors',
    ],
  },
];

const COMMAND_REFERENCE = [
  {
    group: "Core operations",
    commands: [
      { cmd: "openclaw onboard --install-daemon", desc: "Interactive first-time setup with daemon installation" },
      { cmd: "openclaw dashboard", desc: "Open the local Control UI in your browser" },
      { cmd: "openclaw status", desc: "Show daemon status, provider health, and channel states" },
      { cmd: "openclaw logs --follow", desc: "Stream live logs from the daemon" },
      { cmd: "openclaw doctor", desc: "Run diagnostic checks and report warnings" },
      { cmd: "openclaw daemon restart", desc: "Restart the background daemon" },
    ],
  },
  {
    group: "Channels",
    commands: [
      { cmd: "openclaw channels status --probe", desc: "Check all channel connections with active probing" },
      { cmd: "openclaw channels login --channel <name>", desc: "Start the pairing flow for a specific channel" },
      { cmd: "openclaw channels logout --channel <name>", desc: "Disconnect a channel" },
    ],
  },
  {
    group: "Providers & auth",
    commands: [
      { cmd: "openclaw models auth login --provider <name>", desc: "Authenticate with a model provider" },
      { cmd: "openclaw models auth status", desc: "Show current auth state for all providers" },
      { cmd: "openclaw onboard --auth-choice <flow>", desc: "Re-run onboarding with a specific auth flow" },
    ],
  },
  {
    group: "Tools & plugins",
    commands: [
      { cmd: "openclaw plugins list", desc: "Show all available and enabled plugins" },
      { cmd: "openclaw plugins enable <name>", desc: "Enable a plugin" },
      { cmd: "openclaw skills list", desc: "Show all available agent tools" },
      { cmd: "openclaw tools browser status", desc: "Check managed browser health" },
    ],
  },
  {
    group: "Memory",
    commands: [
      { cmd: "openclaw memory status", desc: "Show memory index health and statistics" },
      { cmd: "openclaw memory index", desc: "Build or rebuild the semantic index" },
      { cmd: 'openclaw memory search "<query>"', desc: "Search memory by meaning" },
    ],
  },
  {
    group: "Security",
    commands: [
      { cmd: "openclaw security audit", desc: "Run a standard security check" },
      { cmd: "openclaw security audit --deep", desc: "Run a comprehensive deep audit" },
    ],
  },
  {
    group: "Agents (advanced)",
    commands: [
      { cmd: "openclaw agents list", desc: "Show all configured agents" },
      { cmd: "openclaw agents route --channel <ch> --agent <name>", desc: "Set routing rules" },
      { cmd: "openclaw agents sandbox --agent <name> --deny <tools>", desc: "Restrict tools for an agent" },
    ],
  },
];

const BEST_PRACTICES = [
  { area: "First test", rec: "Use the local Control UI before any live messaging app." },
  { area: "First channel", rec: "Start with one DM channel, not a busy group." },
  { area: "First provider", rec: "Choose one provider and one auth method only." },
  { area: "Remote access", rec: "Prefer loopback-first with Tailscale Serve or SSH tunneling." },
  { area: "Security posture", rec: "Allowlists, pairing, narrow tool permissions." },
  { area: "Expansion order", rec: "Add tools, memory, plugins, multi-agent routing after the base is stable." },
  { area: "Debugging", rec: "Work layer by layer: daemon → provider → channel → tools → memory." },
  { area: "Updates", rec: "Keep OpenClaw updated. Security patches are time-sensitive." },
];

/* ═══════════════════════════════════════════════════════════════════════════
   STYLES — Embedded CSS for custom fonts and animations
   ═══════════════════════════════════════════════════════════════════════════ */

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&display=swap');

  :root {
    --font-display: 'Fraunces', Georgia, serif;
    --font-body: 'DM Sans', -apple-system, sans-serif;
    --font-mono: 'DM Mono', 'SF Mono', monospace;

    --c-bg: #FDFAF7;
    --c-bg-warm: #FFF7F1;
    --c-bg-card: #FFFFFF;
    --c-bg-card-soft: #FFFBF7;
    --c-bg-code: #1A1D27;

    --c-border: #EDE0D6;
    --c-border-light: #F5EBE4;
    --c-border-accent: #FFD0BF;

    --c-text: #2D2926;
    --c-text-secondary: #6B5E57;
    --c-text-muted: #9B8F88;
    --c-text-code: #DFF7E8;

    --c-accent: #D14A22;
    --c-accent-light: #FF5A2D;
    --c-accent-bg: #FFF0E8;
    --c-accent-bg-deep: #FFEEE7;

    --c-green: #2FBF71;
    --c-green-bg: #EEFBF3;
    --c-yellow: #E5A100;
    --c-yellow-bg: #FFF8E6;
    --c-red: #DC3545;
    --c-red-bg: #FFF0F0;

    --radius-sm: 12px;
    --radius-md: 18px;
    --radius-lg: 24px;
    --radius-xl: 30px;

    --shadow-card: 0 2px 12px rgba(45, 41, 38, 0.04), 0 1px 3px rgba(45, 41, 38, 0.06);
    --shadow-card-hover: 0 8px 28px rgba(45, 41, 38, 0.08), 0 2px 6px rgba(45, 41, 38, 0.06);
    --shadow-section: 0 4px 20px rgba(45, 41, 38, 0.04);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .oc-guide {
    font-family: var(--font-body);
    background: var(--c-bg);
    color: var(--c-text);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .oc-guide h1, .oc-guide h2, .oc-guide h3 {
    font-family: var(--font-display);
    line-height: 1.25;
  }

  .oc-guide code, .oc-guide pre {
    font-family: var(--font-mono);
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .oc-fade-in {
    animation: fadeInUp 0.4s ease-out both;
  }

  .oc-nav-link {
    transition: all 0.2s ease;
  }
  .oc-nav-link:hover {
    border-color: var(--c-accent-light) !important;
    color: var(--c-accent) !important;
    background: var(--c-accent-bg) !important;
  }
  .oc-nav-link.active {
    border-color: var(--c-accent-light) !important;
    color: var(--c-accent) !important;
    background: var(--c-accent-bg) !important;
    font-weight: 600;
  }

  .oc-card {
    transition: box-shadow 0.25s ease, transform 0.25s ease;
  }
  .oc-card:hover {
    box-shadow: var(--shadow-card-hover);
    transform: translateY(-1px);
  }

  .oc-code-block {
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.15) transparent;
  }
  .oc-code-block::-webkit-scrollbar { height: 6px; }
  .oc-code-block::-webkit-scrollbar-track { background: transparent; }
  .oc-code-block::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }

  .oc-expand-content {
    overflow: hidden;
    transition: max-height 0.35s ease, opacity 0.25s ease;
  }

  .oc-progress-bar {
    transition: width 0.3s ease;
  }

  @media (max-width: 768px) {
    .oc-guide { font-size: 15px; }
  }
`;

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function OpenClawGuide() {
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );
    sections.forEach((s) => observerRef.current.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div className="oc-guide" style={{ minHeight: "100vh" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px 64px" }}>
          {/* ── HERO ── */}
          <header
            style={{
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--c-border)",
              background: "linear-gradient(135deg, #FFFBF7 0%, #FFF3EB 50%, #FFF8F3 100%)",
              boxShadow: "0 12px 48px rgba(209, 74, 34, 0.06)",
              overflow: "hidden",
            }}
          >
            {/* pill bar */}
            <div
              style={{
                borderBottom: "1px solid var(--c-border-light)",
                padding: "14px 28px",
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {HERO_PILLS.map((p) => (
                <span
                  key={p}
                  style={{
                    display: "inline-block",
                    padding: "5px 14px",
                    borderRadius: 999,
                    border: "1px solid var(--c-border-accent)",
                    background: "rgba(255,255,255,0.85)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--c-accent)",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>

            <div style={{ padding: "36px 28px 40px", display: "grid", gap: 32, gridTemplateColumns: "1fr", alignItems: "start" }}>
              <div>
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
                    fontWeight: 700,
                    color: "var(--c-text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  OpenClaw Guide
                </h1>
                <p
                  style={{
                    marginTop: 16,
                    fontSize: "1.05rem",
                    lineHeight: 1.75,
                    color: "var(--c-text-secondary)",
                    maxWidth: 640,
                  }}
                >
                  The complete reference for running AI from the chat apps you already know — while
                  keeping control of the Gateway, the models, the tools, and every security boundary.
                </p>
                <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 10 }}>
                  <HeroBadge icon="bookOpen" label="Beginner to expert" />
                  <HeroBadge icon="compass" label="Step-by-step paths" />
                  <HeroBadge icon="shieldCheck" label="Security-aware" />
                </div>
              </div>

              {/* summary card */}
              <div
                style={{
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--c-border-accent)",
                  background: "rgba(255,255,255,0.9)",
                  padding: 24,
                  boxShadow: "0 8px 32px rgba(209, 74, 34, 0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--c-accent)",
                  }}
                >
                  In one sentence
                </div>
                <p style={{ marginTop: 10, fontSize: "0.95rem", lineHeight: 1.75, color: "var(--c-text-secondary)" }}>
                  OpenClaw is a self-hosted Gateway that connects chat apps to AI agents and lets you
                  add tools, memory, automation, and multi-agent routing without giving up operational
                  control.
                </p>
                <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
                  <MiniStat label="Best first win" value="Local dashboard" />
                  <MiniStat label="Best first habit" value="One provider only" />
                  <MiniStat label="Best first channel" value="DM, not group" />
                  <MiniStat label="Best first mindset" value="Secure by default" />
                </div>
              </div>
            </div>
          </header>

          {/* ── STICKY NAV ── */}
          <nav
            style={{
              position: "sticky",
              top: 0,
              zIndex: 50,
              marginTop: 20,
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--c-border-light)",
              background: "rgba(253, 250, 247, 0.95)",
              backdropFilter: "blur(12px)",
              padding: "10px 14px",
            }}
          >
            {/* mobile toggle */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              style={{
                display: "none",
                width: "100%",
                padding: "8px 12px",
                border: "1px solid var(--c-border)",
                borderRadius: "var(--radius-sm)",
                background: "white",
                cursor: "pointer",
                fontSize: 14,
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                color: "var(--c-text)",
                textAlign: "left",
                alignItems: "center",
                gap: 8,
              }}
              className="oc-mobile-nav-toggle"
            >
              <Icon name="menu" size={16} />
              <span style={{ marginLeft: 8 }}>{NAV_ITEMS.find((n) => n.id === activeSection)?.label || "Navigate"}</span>
            </button>
            <style>{`
              @media (max-width: 860px) {
                .oc-mobile-nav-toggle { display: flex !important; }
                .oc-nav-scroll { display: ${mobileNavOpen ? "flex" : "none"} !important; flex-direction: column !important; margin-top: 8px; }
              }
            `}</style>
            <div
              className="oc-nav-scroll"
              style={{
                display: "flex",
                gap: 6,
                overflowX: "auto",
                scrollbarWidth: "none",
                minWidth: 0,
              }}
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileNavOpen(false)}
                  className={`oc-nav-link ${activeSection === item.id ? "active" : ""}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "7px 14px",
                    borderRadius: 999,
                    border: "1px solid var(--c-border-light)",
                    background: activeSection === item.id ? "var(--c-accent-bg)" : "rgba(255,255,255,0.85)",
                    fontSize: 13,
                    fontWeight: activeSection === item.id ? 600 : 500,
                    color: activeSection === item.id ? "var(--c-accent)" : "var(--c-text-secondary)",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  <Icon name={item.icon} size={14} />
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* ── SECTIONS ── */}
          <main style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 28 }}>
            {/* === OVERVIEW === */}
            <Section id="overview" title="What OpenClaw Does" icon="sparkles">
              <SectionIntro>
                OpenClaw sits between your everyday chat apps and AI model providers. Instead of
                switching to a separate AI interface, you talk to agents through WhatsApp, Telegram,
                Discord, or iMessage — with full control over routing, tools, memory, and security.
              </SectionIntro>

              <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
                {CAPABILITY_CARDS.map((card) => (
                  <ExpandableCard key={card.title} icon={card.icon} title={card.title} body={card.body} expandedContent={
                    <div style={{ marginTop: 12, padding: "14px 16px", borderRadius: "var(--radius-sm)", background: "var(--c-accent-bg)", border: "1px solid var(--c-border-accent)" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-accent)", marginBottom: 6 }}>Example</div>
                      <p style={{ fontSize: "0.87rem", lineHeight: 1.7, color: "var(--c-text-secondary)" }}>{card.example}</p>
                    </div>
                  } />
                ))}
              </div>

              <SubHeading>Who is this guide for?</SubHeading>
              <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                {AUDIENCE_TIERS.map((t) => (
                  <Card key={t.title}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                      <IconBubble name={t.icon} />
                      <div>
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-accent)" }}>{t.tier}</span>
                        <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{t.title}</h3>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.87rem", lineHeight: 1.75, color: "var(--c-text-secondary)" }}>{t.body}</p>
                    <div style={{ marginTop: 12, padding: "8px 12px", borderRadius: "var(--radius-sm)", background: "var(--c-bg-warm)", fontSize: "0.8rem", color: "var(--c-text-muted)", fontWeight: 500 }}>
                      Reading path: {t.sections}
                    </div>
                  </Card>
                ))}
              </div>
            </Section>

            {/* === ARCHITECTURE === */}
            <Section id="architecture" title="How It Works" icon="workflow">
              <SectionIntro>
                Understanding the architecture helps you troubleshoot effectively. Problems live in
                specific layers — isolating the layer narrows the search immediately.
              </SectionIntro>

              <Card>
                <div style={{ display: "grid", gap: 20 }}>
                  <FlowDiagram
                    label="Data flow"
                    nodes={[
                      { label: "Chat apps", sub: "WhatsApp · Telegram · Discord · iMessage" },
                      { label: "Gateway", sub: "Routing · Auth · Sessions · Policy · UI", emphasis: true },
                      { label: "Agents", sub: "Tools · Memory · Workspaces · Behavior" },
                    ]}
                  />
                  <FlowDiagram
                    label="Control flow"
                    nodes={[
                      { label: "Model providers", sub: "OpenAI · Anthropic · Gemini · Others" },
                      { label: "Control layer", sub: "Config · Channels · Status · Security", emphasis: true },
                      { label: "Execution layer", sub: "Browser · Canvas · Nodes · Cron · Plugins" },
                    ]}
                  />
                </div>
              </Card>

              <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                <Card soft>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: 10 }}>Why this architecture matters</h3>
                  <BodyList items={[
                    "It separates the chat surface from the model provider — change one without affecting the other.",
                    "The Gateway is the control center, not a dumb relay. It enforces policy, manages sessions, and routes messages.",
                    "Tools and memory are platform-level features, not bolted-on afterthoughts.",
                    "Troubleshooting works layer by layer: daemon → provider → channel → tools → memory.",
                  ]} />
                </Card>
                <Card soft>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: 10 }}>Layer isolation for debugging</h3>
                  <BodyList items={[
                    'Daemon not running → "openclaw status" and "openclaw doctor"',
                    'Provider unreachable → "openclaw models auth status" and check API key',
                    'Channel not connecting → "openclaw channels status --probe"',
                    'Tool not working → "openclaw skills list" and check sandbox config',
                    'Memory empty → "openclaw memory status" and "openclaw memory index"',
                  ]} />
                </Card>
              </div>
            </Section>

            {/* === QUICKSTART === */}
            <Section id="quickstart" title="Quick Start: Your First 30 Minutes" icon="compass">
              <SectionIntro>
                Follow these steps in order. Each one builds on the last. Resist the urge to skip
                ahead — proving the base path first saves hours of debugging later.
              </SectionIntro>

              <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
                {QUICK_STEPS.map((s) => (
                  <StepCard key={s.step} step={s} />
                ))}
              </div>

              <Callout icon="lightbulb" type="tip" title="The most important rule">
                Prove the local Control UI first. It removes the noise of channel pairing, group
                policy, and remote-access variables from your first test. If the dashboard works,
                you know the daemon and provider are solid. Then layer channels on top.
              </Callout>
            </Section>

            {/* === PROVIDERS === */}
            <Section id="providers" title="Providers and Authentication" icon="brain">
              <SectionIntro>
                OpenClaw supports multiple model providers. The two main authentication patterns are
                API-key and OAuth-style. Choose one pattern and one provider for your first setup.
              </SectionIntro>

              <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
                {Object.values(PROVIDER_DATA).map((p) => (
                  <Card key={p.title}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>{p.title}</h3>
                    <p style={{ fontSize: "0.87rem", lineHeight: 1.75, color: "var(--c-text-secondary)", marginBottom: 16 }}>{p.desc}</p>
                    {p.providers.map((prov) => (
                      <div key={prov.name} style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--c-text)", marginBottom: 4 }}>{prov.name}</div>
                        <CodeBlock>{prov.cmd}</CodeBlock>
                      </div>
                    ))}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-green)", marginBottom: 6 }}>Pros</div>
                        {p.pros.map((pr) => (
                          <div key={pr} style={{ fontSize: "0.8rem", color: "var(--c-text-secondary)", display: "flex", gap: 6, marginBottom: 4 }}>
                            <Icon name="check" size={14} className="" style={{ color: "var(--c-green)", flexShrink: 0, marginTop: 2 }} />
                            <span>{pr}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-yellow)", marginBottom: 6 }}>Cons</div>
                        {p.cons.map((co) => (
                          <div key={co} style={{ fontSize: "0.8rem", color: "var(--c-text-secondary)", display: "flex", gap: 6, marginBottom: 4 }}>
                            <Icon name="alertTriangle" size={14} style={{ color: "var(--c-yellow)", flexShrink: 0, marginTop: 2 }} />
                            <span>{co}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: 14 }}>Quick decision table</h3>
                <SimpleTable
                  headers={["Situation", "Recommended choice"]}
                  rows={[
                    ["I want the simplest first setup", "One provider with a conventional API-key flow"],
                    ["I am following a provider's account-based login docs", "Use the documented OAuth-style path for that provider"],
                    ["I need predictable debugging", "Avoid mixing multiple auth methods at once"],
                    ["I want to switch providers later", "Easy — add a second provider, update routing rules"],
                  ]}
                />
              </Card>
            </Section>

            {/* === CHANNELS === */}
            <Section id="channels" title="Channels and Access Control" icon="messageSquare">
              <SectionIntro>
                Channels are the surfaces where users interact with agents. Each channel type has
                its own pairing flow, access rules, and security considerations.
              </SectionIntro>

              <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
                {CHANNEL_DETAIL.map((ch) => (
                  <Card key={ch.title}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <IconBubble name={ch.icon} />
                      <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{ch.title}</h3>
                    </div>
                    <p style={{ fontSize: "0.87rem", lineHeight: 1.75, color: "var(--c-text-secondary)", marginBottom: 12 }}>{ch.desc}</p>
                    <Callout icon="shieldCheck" type="best" title="Best practice" compact>
                      {ch.bestPractice}
                    </Callout>
                    <div style={{ marginTop: 12 }}>
                      <CodeBlock>{ch.cmd}</CodeBlock>
                    </div>
                  </Card>
                ))}
              </div>

              <Card>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: 14 }}>Channel policy reference</h3>
                <SimpleTable
                  headers={["Policy type", "What it controls", "Recommendation"]}
                  rows={[
                    ["DM policy", "Who can reach the agent via direct message", "Allowlists or pairing — keep access narrow"],
                    ["Group policy", "Whether the agent responds in shared spaces", "Prefer allowlists and mention gating"],
                    ["Mention gating", "Whether the agent only responds when @mentioned", "Always enable in groups to prevent ambient triggering"],
                    ["Routing", "Which agent handles which channel or peer", "Map different channels to different agents as needed"],
                  ]}
                />
              </Card>
            </Section>

            {/* === TOOLS & MEMORY === */}
            <Section id="tools" title="Tools and Memory" icon="wrench">
              <SectionIntro>
                Tools make agents capable. Memory makes them persistent. Both are first-class
                features in OpenClaw, not plugins bolted on after the fact.
              </SectionIntro>

              <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
                {TOOL_CARDS.map((t) => (
                  <Card key={t.title}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <IconBubble name={t.icon} />
                      <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{t.title}</h3>
                    </div>
                    <p style={{ fontSize: "0.87rem", lineHeight: 1.75, color: "var(--c-text-secondary)", marginBottom: 10 }}>{t.desc}</p>
                    <div style={{ padding: "10px 14px", borderRadius: "var(--radius-sm)", background: "var(--c-bg-warm)", marginBottom: 12 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-accent)", marginBottom: 4 }}>Usage</div>
                      <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "var(--c-text-secondary)" }}>{t.usage}</p>
                    </div>
                    <CodeBlock>{t.cmd}</CodeBlock>
                  </Card>
                ))}
              </div>
            </Section>

            {/* === ADVANCED === */}
            <Section id="advanced" title="Advanced Features" icon="layers">
              <SectionIntro>
                Once the base setup is stable, OpenClaw becomes a layered platform for multi-agent
                routing, per-agent sandboxing, and plugin-driven extensibility.
              </SectionIntro>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {ADVANCED_TOPICS.map((topic) => (
                  <Card key={topic.title}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <IconBubble name={topic.icon} />
                      <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{topic.title}</h3>
                    </div>
                    <p style={{ fontSize: "0.87rem", lineHeight: 1.75, color: "var(--c-text-secondary)", marginBottom: 14 }}>{topic.desc}</p>
                    <BodyList items={topic.details} />
                    <div style={{ marginTop: 14 }}>
                      <CodeBlock>{topic.cmd}</CodeBlock>
                    </div>
                  </Card>
                ))}
              </div>
            </Section>

            {/* === SECURITY === */}
            <Section id="security" title="Security and Remote Access" icon="shieldCheck">
              <SectionIntro>
                Security is not a final step — it is the default posture. Every decision in this
                guide assumes loopback-first, allowlist-driven, and least-privilege access.
              </SectionIntro>

              <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                {SECURITY_CHECKLIST.map((cat) => (
                  <Card key={cat.category}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: 12 }}>{cat.category}</h3>
                    {cat.items.map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                        <div style={{ flexShrink: 0, marginTop: 3 }}>
                          <Icon name="shieldCheck" size={16} style={{ color: "var(--c-green)" }} />
                        </div>
                        <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--c-text-secondary)" }}>{item}</p>
                      </div>
                    ))}
                  </Card>
                ))}
              </div>

              <Card>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: 14 }}>Best practices summary</h3>
                <SimpleTable
                  headers={["Area", "Recommendation"]}
                  rows={BEST_PRACTICES.map((bp) => [bp.area, bp.rec])}
                />
              </Card>
            </Section>

            {/* === TROUBLESHOOTING === */}
            <Section id="troubleshooting" title="Troubleshooting" icon="search">
              <SectionIntro>
                When something goes wrong, work layer by layer. These are the most common problems
                and the fastest diagnostic paths for each.
              </SectionIntro>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {TROUBLESHOOTING.map((t) => (
                  <Card key={t.problem}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "var(--radius-sm)",
                          background: "var(--c-red-bg)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon name="alertTriangle" size={16} style={{ color: "var(--c-red)" }} />
                      </div>
                      <h3 style={{ fontSize: "0.95rem", fontWeight: 600 }}>{t.problem}</h3>
                    </div>
                    <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {t.steps.map((step, i) => (
                        <li key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                          <span
                            style={{
                              flexShrink: 0,
                              width: 22,
                              height: 22,
                              borderRadius: "50%",
                              background: "var(--c-accent-bg)",
                              color: "var(--c-accent)",
                              fontSize: 11,
                              fontWeight: 700,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginTop: 2,
                            }}
                          >
                            {i + 1}
                          </span>
                          <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--c-text-secondary)" }}>{step}</p>
                        </li>
                      ))}
                    </ol>
                  </Card>
                ))}
              </div>
            </Section>

            {/* === COMMANDS === */}
            <Section id="commands" title="Command Reference" icon="terminal">
              <SectionIntro>
                Every command you need, organized by function. Copy any command directly from the
                code blocks below.
              </SectionIntro>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {COMMAND_REFERENCE.map((group) => (
                  <Card key={group.group}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: 14 }}>{group.group}</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {group.commands.map((c) => (
                        <div
                          key={c.cmd}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr auto",
                            gap: 12,
                            alignItems: "start",
                            padding: "10px 14px",
                            borderRadius: "var(--radius-sm)",
                            background: "var(--c-bg-warm)",
                            border: "1px solid var(--c-border-light)",
                          }}
                        >
                          <div>
                            <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", fontWeight: 500, color: "var(--c-text)" }}>
                              {c.cmd}
                            </code>
                            <p style={{ fontSize: "0.78rem", color: "var(--c-text-muted)", marginTop: 3, lineHeight: 1.5 }}>{c.desc}</p>
                          </div>
                          <CopyButton text={c.cmd} />
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </Section>
          </main>

          {/* ── FOOTER ── */}
          <footer
            style={{
              marginTop: 48,
              padding: "28px 24px",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--c-border-light)",
              background: "var(--c-bg-card-soft)",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "0.85rem", color: "var(--c-text-muted)", lineHeight: 1.7 }}>
              OpenClaw Guide — Comprehensive reference from beginner to expert.
              <br />
              Built with care. Reviewed for accuracy. Designed to be read.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function Section({ id, title, icon, children }) {
  return (
    <section
      id={id}
      className="oc-fade-in"
      style={{
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--c-border)",
        background: "var(--c-bg-card-soft)",
        padding: "28px 24px",
        boxShadow: "var(--shadow-section)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <IconBubble name={icon} size="lg" />
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.3rem, 3vw, 1.6rem)",
            fontWeight: 600,
            color: "var(--c-text)",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>{children}</div>
    </section>
  );
}

function SectionIntro({ children }) {
  return (
    <p
      style={{
        fontSize: "0.93rem",
        lineHeight: 1.8,
        color: "var(--c-text-secondary)",
        maxWidth: 720,
        marginBottom: 4,
      }}
    >
      {children}
    </p>
  );
}

function SubHeading({ children }) {
  return (
    <h3
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.15rem",
        fontWeight: 600,
        color: "var(--c-text)",
        marginTop: 8,
      }}
    >
      {children}
    </h3>
  );
}

function Card({ children, soft = false }) {
  return (
    <div
      className="oc-card"
      style={{
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--c-border)",
        background: soft ? "linear-gradient(180deg, var(--c-bg-card-soft) 0%, var(--c-bg-card) 100%)" : "var(--c-bg-card)",
        padding: "20px 22px",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {children}
    </div>
  );
}

function ExpandableCard({ icon, title, body, expandedContent }) {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <IconBubble name={icon} />
        <h3 style={{ fontSize: "0.95rem", fontWeight: 600, flex: 1 }}>{title}</h3>
      </div>
      <p style={{ fontSize: "0.87rem", lineHeight: 1.75, color: "var(--c-text-secondary)" }}>{body}</p>
      <button
        onClick={() => setOpen(!open)}
        style={{
          marginTop: 10,
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          padding: "5px 10px",
          borderRadius: 999,
          border: "1px solid var(--c-border)",
          background: "transparent",
          cursor: "pointer",
          fontSize: "0.78rem",
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          color: "var(--c-accent)",
          transition: "all 0.2s ease",
        }}
      >
        <Icon name={open ? "chevronDown" : "chevronRight"} size={12} />
        {open ? "Hide example" : "Show example"}
      </button>
      <div
        className="oc-expand-content"
        style={{
          maxHeight: open ? 300 : 0,
          opacity: open ? 1 : 0,
        }}
      >
        {expandedContent}
      </div>
    </Card>
  );
}

function IconBubble({ name, size = "md" }) {
  const dim = size === "lg" ? 38 : 32;
  const iconSize = size === "lg" ? 18 : 16;
  return (
    <div
      style={{
        width: dim,
        height: dim,
        borderRadius: "var(--radius-sm)",
        background: "var(--c-accent-bg-deep)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: "var(--c-accent-light)",
      }}
    >
      <Icon name={name} size={iconSize} />
    </div>
  );
}

function HeroBadge({ icon, label }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "6px 14px",
        borderRadius: 999,
        border: "1px solid var(--c-border-accent)",
        background: "rgba(255,255,255,0.85)",
        fontSize: "0.82rem",
        fontWeight: 600,
        color: "var(--c-accent)",
      }}
    >
      <Icon name={icon} size={14} />
      {label}
    </span>
  );
}

function MiniStat({ label, value }) {
  return (
    <div
      style={{
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--c-border-light)",
        background: "var(--c-bg-card-soft)",
        padding: "10px 14px",
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-text-muted)" }}>
        {label}
      </div>
      <div style={{ marginTop: 4, fontSize: "0.85rem", fontWeight: 600, color: "var(--c-text)" }}>{value}</div>
    </div>
  );
}

function FlowDiagram({ label, nodes }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
        {nodes.map((node, i) => (
          <div key={node.label} style={{ display: "contents" }}>
            <div
              style={{
                flex: "1 1 180px",
                padding: "14px 16px",
                borderRadius: "var(--radius-md)",
                border: node.emphasis ? "1.5px solid var(--c-accent-light)" : "1px solid var(--c-border)",
                background: node.emphasis ? "linear-gradient(180deg, #FFF5EF 0%, white 100%)" : "white",
                boxShadow: node.emphasis ? "0 4px 16px rgba(209,74,34,0.08)" : "none",
                minWidth: 0,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text-muted)" }}>
                {node.label}
              </div>
              <div style={{ marginTop: 6, fontSize: "0.82rem", lineHeight: 1.6, color: "var(--c-text-secondary)" }}>{node.sub}</div>
            </div>
            {i < nodes.length - 1 && (
              <div style={{ display: "flex", alignItems: "center", padding: "0 6px", color: "var(--c-accent-light)", flexShrink: 0 }}>
                <Icon name="arrowRight" size={18} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepCard({ step }) {
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "var(--c-accent-bg-deep)",
            color: "var(--c-accent-light)",
            fontSize: "0.85rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {step.step}
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-text-muted)" }}>
            Step {step.step}
          </div>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--c-text)" }}>{step.title}</h3>
        </div>
      </div>
      <p style={{ fontSize: "0.85rem", lineHeight: 1.75, color: "var(--c-text-secondary)", marginBottom: 12 }}>{step.desc}</p>
      <CodeBlock>{step.cmd}</CodeBlock>
      <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: "var(--radius-sm)", background: "var(--c-yellow-bg)", border: "1px solid #F5E0A0", fontSize: "0.8rem", lineHeight: 1.6, color: "#8B6914" }}>
        <strong>Tip:</strong> {step.tip}
      </div>
    </Card>
  );
}

function CodeBlock({ children }) {
  return (
    <div style={{ position: "relative" }}>
      <pre
        className="oc-code-block"
        style={{
          borderRadius: "var(--radius-sm)",
          border: "1px solid #2A2F3A",
          background: "var(--c-bg-code)",
          padding: "14px 16px",
          paddingRight: 48,
          fontSize: "0.82rem",
          lineHeight: 1.8,
          color: "var(--c-text-code)",
          fontFamily: "var(--font-mono)",
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
        }}
      >
        <code>{children}</code>
      </pre>
      <div style={{ position: "absolute", top: 8, right: 8 }}>
        <CopyButton text={typeof children === "string" ? children : ""} />
      </div>
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button
      onClick={handleCopy}
      title="Copy"
      style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.12)",
        background: copied ? "rgba(47,191,113,0.2)" : "rgba(255,255,255,0.06)",
        color: copied ? "#2FBF71" : "rgba(255,255,255,0.5)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s ease",
        flexShrink: 0,
      }}
    >
      <Icon name={copied ? "check" : "copy"} size={14} />
    </button>
  );
}

function Callout({ icon, type, title, children, compact = false }) {
  const colors = {
    tip: { bg: "var(--c-yellow-bg)", border: "#F5E0A0", accent: "var(--c-yellow)", text: "#8B6914" },
    warning: { bg: "var(--c-red-bg)", border: "#FFCCCC", accent: "var(--c-red)", text: "#8B1A1A" },
    best: { bg: "var(--c-green-bg)", border: "#B8E8CC", accent: "var(--c-green)", text: "#1A6B3C" },
  };
  const c = colors[type] || colors.tip;
  return (
    <div
      style={{
        borderRadius: compact ? "var(--radius-sm)" : "var(--radius-md)",
        border: `1px solid ${c.border}`,
        background: c.bg,
        padding: compact ? "10px 14px" : "18px 22px",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
      }}
    >
      <div style={{ flexShrink: 0, marginTop: 2, color: c.accent }}>
        <Icon name={icon} size={compact ? 16 : 18} />
      </div>
      <div>
        {title && <div style={{ fontSize: compact ? "0.8rem" : "0.88rem", fontWeight: 700, color: c.text, marginBottom: 4 }}>{title}</div>}
        <div style={{ fontSize: compact ? "0.8rem" : "0.87rem", lineHeight: 1.7, color: c.text }}>{children}</div>
      </div>
    </div>
  );
}

function BodyList({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div style={{ flexShrink: 0, marginTop: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--c-accent-light)" }} />
          </div>
          <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--c-text-secondary)" }}>{item}</p>
        </div>
      ))}
    </div>
  );
}

function SimpleTable({ headers, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" }}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "8px 14px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "var(--c-text)",
                  letterSpacing: "0.02em",
                  borderBottom: "2px solid var(--c-border)",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: "12px 14px",
                    fontSize: "0.84rem",
                    lineHeight: 1.6,
                    color: j === 0 ? "var(--c-text)" : "var(--c-text-secondary)",
                    fontWeight: j === 0 ? 600 : 400,
                    background: i % 2 === 0 ? "var(--c-bg-card)" : "var(--c-bg-card-soft)",
                    borderTop: "1px solid var(--c-border-light)",
                    borderBottom: "1px solid var(--c-border-light)",
                    ...(j === 0 ? { borderLeft: "1px solid var(--c-border-light)", borderRadius: "var(--radius-sm) 0 0 var(--radius-sm)" } : {}),
                    ...(j === row.length - 1 ? { borderRight: "1px solid var(--c-border-light)", borderRadius: "0 var(--radius-sm) var(--radius-sm) 0" } : {}),
                  }}
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
