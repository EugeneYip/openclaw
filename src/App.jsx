import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   OPENCLAW GUIDE — COMPREHENSIVE REBUILD v2
   Pure SVG icon system · No external icon dependencies
   Audience: public-facing readers from absolute beginner to power user
   Source-verified against openclaw.ai, docs.openclaw.ai, GitHub
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── ICON SYSTEM ──────────────────────────────────────────────────────────────

const ICON_PATHS = {
  sparkles: "M12 3l1.9 5.8L20 10.5l-6.1 1.7L12 18l-1.9-5.8L4 10.5l6.1-1.7L12 3zM5 3l.8 2.2L8 6l-2.2.8L5 9l-.8-2.2L2 6l2.2-.8L5 3zM19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8L19 17z",
  workflow: "M3 3h6v6H3V3zm12 0h6v6h-6V3zm-6 12h6v6H9v-6zM6 9v6M18 9v6M9 18H6a3 3 0 0 1-3-3M15 18h3a3 3 0 0 0 3-3",
  compass: "M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10zm4.2-14.2-2.1 6.3-6.3 2.1 2.1-6.3 6.3-2.1z",
  server: "M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5zm0 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4zm4-8h.01M6 17h.01",
  terminal: "M4 17l6-6-6-6M12 19h8",
  brain: "M12 2a7 7 0 0 0-7 7c0 2.4 1.2 4.5 3 5.7V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.3c1.8-1.2 3-3.3 3-5.7a7 7 0 0 0-7-7zM9 21h6M12 2v4M8 8h3M13 8h3M9.5 12H12M12 12h2.5",
  database: "M12 2C7.6 2 4 3.8 4 6v12c0 2.2 3.6 4 8 4s8-1.8 8-4V6c0-2.2-3.6-4-8-4zM4 6c0 2.2 3.6 4 8 4s8-1.8 8-4M4 12c0 2.2 3.6 4 8 4s8-1.8 8-4",
  shieldCheck: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4",
  search: "M21 21l-4.4-4.4M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z",
  globe: "M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  messageSquare: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm13 14v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  layers: "M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  route: "M3 17h2a2 2 0 0 0 2-2V9a2 2 0 0 1 2-2h1m4 0h1a2 2 0 0 1 2 2v6a2 2 0 0 0 2 2h2M6 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  cloud: "M20 17.6A4.5 4.5 0 0 0 18 9h-1A7 7 0 1 0 4 15.5M8 18h10",
  box: "M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8zM3.3 7 12 12l8.7-5M12 22V12",
  plug: "M12 22v-5M9 7V2m6 5V2M5 12H2m20 0h-3M7 7h10a2 2 0 0 1 2 2v2a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5V9a2 2 0 0 1 2-2z",
  wrench: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9l-3.8 3.8z",
  clock: "M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10zM12 6v6l4 2",
  bookOpen: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z",
  alertTriangle: "M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4m0 4h.01",
  checkCircle: "M22 11.1V12a10 10 0 1 1-5.9-9.1M22 4 12 14l-3-3",
  check: "M20 6 9 17l-5-5",
  x: "M18 6 6 18M6 6l12 12",
  copy: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z",
  chevronDown: "M6 9l6 6 6-6",
  chevronRight: "M9 18l6-6-6-6",
  menu: "M3 12h18M3 6h18M3 18h18",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  externalLink: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3",
  lightbulb: "M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z",
  smartphone: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm4 16h2",
  monitor: "M3 4h18v12H3zM8 20h8M12 16v4",
  heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.3l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z",
  music: "M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  mic: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8",
  wifi: "M5 12.6a14 14 0 0 1 14 0M8.5 16.4a8 8 0 0 1 7 0M12 20h.01",
  package: "M16.5 9.4l-9-5.2M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.3 7 12 12l8.7-5M12 22V12",
  grid: "M3 3h7v7H3V3zm11 0h7v7h-7V3zm0 11h7v7h-7v-7zM3 14h7v7H3v-7z",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  camera: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  radio: "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM16.2 7.8a6 6 0 0 1 0 8.5M7.8 16.2a6 6 0 0 1 0-8.4M19.1 4.9a10 10 0 0 1 0 14.2M4.9 19.1a10 10 0 0 1 0-14.2",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  cpu: "M4 4h16v16H4V4zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm16 2-8 5-8-5",
  link: "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.8 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
};

function Icon({ name, size = 20, strokeWidth = 1.85, className = "", style = {} }) {
  const d = ICON_PATHS[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

// ─── NAV DATA ─────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "sparkles" },
  { id: "paths", label: "Start Paths", icon: "compass" },
  { id: "install", label: "Install", icon: "server" },
  { id: "architecture", label: "Architecture", icon: "workflow" },
  { id: "config", label: "Config", icon: "wrench" },
  { id: "providers", label: "Models", icon: "brain" },
  { id: "channels", label: "Channels", icon: "messageSquare" },
  { id: "apps", label: "Apps", icon: "smartphone" },
  { id: "pairing", label: "Pairing", icon: "link" },
  { id: "browser", label: "Browser", icon: "globe" },
  { id: "memory", label: "Memory", icon: "database" },
  { id: "automation", label: "Automation", icon: "clock" },
  { id: "agents", label: "Agents", icon: "route" },
  { id: "integrations", label: "Ecosystem", icon: "grid" },
  { id: "security", label: "Security", icon: "shieldCheck" },
  { id: "troubleshooting", label: "Debug", icon: "search" },
  { id: "commands", label: "Commands", icon: "terminal" },
  { id: "checklist", label: "Checklist", icon: "checkCircle" },
];

// ─── CONTENT DATA ─────────────────────────────────────────────────────────────

// (Hero pills removed for cleaner visual)

const WHAT_IT_IS = [
  { icon: "workflow", title: "Gateway-first architecture", body: "The Gateway is the operational center. It owns session state, routing, channels, policies, and tool orchestration. Debugging always starts here." },
  { icon: "messageSquare", title: "Your chat apps are the interface", body: "WhatsApp, Telegram, Discord, Slack, Signal, iMessage, Teams, Matrix, and more become the surface. The core runtime stays the same regardless of channel." },
  { icon: "brain", title: "Any model, swappable", body: "Claude, GPT, Gemini, Grok, MiniMax, DeepSeek, Mistral, local models via Ollama. Provider choice is independent from channel choice." },
  { icon: "shieldCheck", title: "Security is structural", body: "OpenClaw can touch powerful tools and real messaging surfaces. Safe defaults, sandboxed execution, and audit-first posture are part of the design." },
  { icon: "smartphone", title: "Companion apps extend reach", body: "Native macOS menu bar app, iOS and Android nodes with Canvas, camera, voice, and screen capture. Remote control from anywhere." },
  { icon: "zap", title: "Self-extending capabilities", body: "The agent can write its own skills, install plugins from ClawHub, and build new integrations on the fly. Skills are verified via VirusTotal partnership." },
];

const AUDIENCE_TIERS = [
  { icon: "messageSquare", tier: "Beginner", title: "Everyday user", body: "Use the local dashboard first, connect one DM channel, and learn the difference between the Gateway, the chat surface, and the model provider.", path: "Overview → Start Paths → Install → Models → Channels" },
  { icon: "monitor", tier: "Intermediate", title: "Operator", body: "Manage daemon health, channel pairing, config structure, browser modes, memory indexing, companion apps, and routine debugging.", path: "All above → Config → Pairing → Browser → Apps → Debug" },
  { icon: "layers", tier: "Advanced", title: "Power user", body: "Run OpenClaw on a VPS, add remote nodes, separate agents by purpose, build automation with cron/hooks/webhooks, and enforce security policies.", path: "All above → Automation → Multi-Agent → Security → Checklist" },
];

const START_PATHS = [
  { icon: "compass", title: "Fastest safe first win", audience: "New to OpenClaw", steps: ["Install OpenClaw via the one-liner script", "Run the onboarding wizard", "Open the local dashboard (Control UI)", "Send one test prompt in the browser", "Only then connect one DM channel"] },
  { icon: "cloud", title: "Always-on remote host", audience: "VPS / cloud / DigitalOcean", steps: ["Run the Gateway on a VPS or use the DigitalOcean 1-Click", "Keep the bind loopback-first when possible", "Access via SSH tunnel or Tailscale Serve", "Add token/password auth for non-loopback binds", "Use nodes for actions on your laptop or phone"] },
  { icon: "users", title: "Multiple personas", audience: "Work + personal split", steps: ["Create multiple agents with separate workspaces", "Give each agent its own identity and tool policy", "Bind different channels or accounts to each agent", "Keep risky tools off public-facing agents", "Audit with sandbox explain before rollout"] },
];

const INSTALL_MODES = [
  { title: "Local machine", icon: "monitor", summary: "Best for first-time users, private experiments, and lowest debugging complexity.", goodFor: ["Learning the product", "Testing channels", "Local dashboard", "Browser automation on same machine"], caution: "Uptime depends on your laptop. Good for personal use, less ideal for always-on service.", commands: ["curl -fsSL https://openclaw.ai/install.sh | bash", "openclaw onboard --install-daemon", "openclaw gateway status", "openclaw dashboard", "openclaw doctor"] },
  { title: "VPS / cloud server", icon: "cloud", summary: "Best for 24/7 availability, stable uptime, and multi-device access.", goodFor: ["Always-on agents", "Remote dashboard", "Cross-device usage", "Shared ops environment"], caution: "A remote Gateway cannot directly control your personal browser unless you also run a node on that device.", commands: ["openclaw gateway --bind tailnet --token \"<token>\"", "openclaw gateway status", "openclaw health --verbose", "ssh -N -L 18789:127.0.0.1:18789 user@server"] },
  { title: "Docker", icon: "box", summary: "Useful for isolated deployments and repeatable builds.", goodFor: ["Reproducible deployment", "Environment isolation", "Infrastructure consistency"], caution: "Headless OAuth and browser flows need extra care. Not recommended as a first setup.", commands: ["docker compose run --rm openclaw-cli dashboard --no-open", "docker compose run --rm openclaw-cli channels login", "docker compose run --rm openclaw-cli channels add --channel telegram --token \"<token>\""] },
  { title: "DigitalOcean 1-Click", icon: "cloud", summary: "Hardened deployment with secure defaults on a managed Droplet.", goodFor: ["Fast VPS setup", "Secure defaults out of box", "systemd service management"], caution: "Still requires channel and provider configuration after deployment.", commands: ["# Deployed via DigitalOcean Marketplace", "nano /opt/openclaw.env", "systemctl restart openclaw", "# Follow dashboard pairing instructions"] },
];

const ARCHITECTURE_LAYERS = [
  { title: "Chat surfaces", sub: "WhatsApp · Telegram · Discord · Slack · Signal · iMessage · Teams · Matrix · Nostr · Zalo · WebChat", emphasis: false },
  { title: "Gateway", sub: "Routing · Sessions · Channels · Policies · Pairing · Control UI · State · Streaming", emphasis: true },
  { title: "Agents", sub: "Identity · Workspace · Model · Tool policy · Memory · Sandbox · AGENTS.md · SOUL.md · TOOLS.md", emphasis: false },
  { title: "Execution", sub: "Browser · Web tools · Cron · Hooks · Webhooks · Heartbeats · Skills · Nodes · Canvas · Voice", emphasis: false },
];

const CONFIG_BLOCKS = [
  { title: "What to understand first", items: ["Config lives at ~/.openclaw/openclaw.json and supports JSON5 (comments, trailing commas).", "Find the active file with openclaw config file.", "The Gateway can hot-reload many changes, but always verify with status after edits.", "Workspace root is ~/.openclaw/workspace (configurable). It contains AGENTS.md, SOUL.md, and TOOLS.md."] },
  { title: "Minimum sane starter config", code: `{\n  identity: {\n    name: "Clawd",\n  },\n  channels: {\n    telegram: {\n      enabled: true,\n      botToken: "123:abc",\n      dmPolicy: "pairing",\n      groups: {\n        "*": { requireMention: true },\n      },\n    },\n  },\n}` },
  { title: "Config helper commands", code: "openclaw config file\nopenclaw config validate\nopenclaw config set channels.discord.enabled true --json\nopenclaw config set channels.discord.token '\"YOUR_BOT_TOKEN\"' --json" },
];

const PROVIDER_TABLE = {
  headers: ["Provider", "Models", "Auth method"],
  rows: [
    ["Anthropic", "Claude Opus 4.5, Sonnet, Haiku", "API key or Claude Pro/Max subscription (OAuth)"],
    ["OpenAI", "GPT-5, GPT-4o, o1, o3-mini", "API key or ChatGPT/Codex subscription (OAuth)"],
    ["Google", "Gemini 2.5 Pro / Flash", "API key or CLI auth plugin"],
    ["xAI", "Grok 3 & 4", "API key"],
    ["MiniMax", "MiniMax-M2.5", "API key"],
    ["DeepSeek", "DeepSeek V3 & R1", "API key"],
    ["Mistral", "Mistral Large & Codestral", "API key"],
    ["OpenRouter", "Hundreds of models, 1 API key", "API key"],
    ["Vercel AI Gateway", "Unified gateway to many providers", "API key"],
    ["Perplexity", "Search-augmented AI", "API key"],
    ["Hugging Face", "Open-source models", "API key"],
    ["Local (Ollama / LM Studio)", "Any local model", "No key needed"],
  ],
};

const CHANNEL_TABLE = {
  headers: ["Channel", "Setup pattern", "DM", "Groups", "Notes"],
  rows: [
    ["WhatsApp", "channels login (QR)", "Yes", "Yes", "Baileys protocol. Good starter channel."],
    ["Telegram", "channels add / config (token)", "Yes", "Yes", "Bot API via grammY. Use numeric user IDs."],
    ["Discord", "channels add / config (token)", "Yes", "Yes", "Bot API. Lock server permissions first."],
    ["Slack", "Workspace app (Bolt)", "Yes", "Yes", "Good for work environments."],
    ["Signal", "Channel-specific (signal-cli)", "Yes", "Yes", "Privacy-focused."],
    ["iMessage (imsg)", "macOS AppleScript bridge", "Yes", "Yes", "macOS only. Legacy path."],
    ["iMessage (BlueBubbles)", "BlueBubbles server", "Yes", "Yes", "Modern iMessage. macOS permissions required."],
    ["Microsoft Teams", "Enterprise setup", "Yes", "Yes", "Enterprise support."],
    ["Matrix", "Matrix protocol", "Yes", "Yes", "Self-hosted chat protocol."],
    ["Nextcloud Talk", "Self-hosted config", "Yes", "Yes", "Self-hosted Nextcloud."],
    ["Nostr", "NIP-04 DMs", "Yes", "No", "Decentralized protocol."],
    ["Zalo", "Bot API", "Yes", "Yes", "Zalo platform."],
    ["Zalo Personal", "QR login", "Yes", "Yes", "Personal account."],
    ["Mattermost", "Extension plugin", "Yes", "Yes", "Via extension package."],
    ["WebChat", "Built-in Control UI", "Yes", "No", "Browser-based. No channel setup needed."],
  ],
};

const COMPANION_APPS = [
  { title: "macOS App", icon: "monitor", desc: "Menu bar control for Gateway health, Voice Wake with push-to-talk overlay, WebChat and debug tools.", note: "Requires macOS 15+. Universal Binary. Signed builds required for permissions to persist.", link: "https://docs.openclaw.ai/macos" },
  { title: "iOS Node", icon: "smartphone", desc: "Pairs via Gateway WebSocket. Canvas surface, voice trigger forwarding, camera access.", note: "Pairs as a node using openclaw devices. Voice Wake + Canvas.", link: "https://docs.openclaw.ai/ios" },
  { title: "Android Node", icon: "smartphone", desc: "Connect, Chat, and Voice tabs. Canvas, camera, screen capture, and Android device commands.", note: "Pairs via WS node using device pairing flow.", link: "https://docs.openclaw.ai/android" },
  { title: "Windows", icon: "monitor", desc: "Full support via WSL2. The one-liner installer handles Node.js and dependencies.", note: "WSL2 recommended for best experience.", link: "https://docs.openclaw.ai/windows" },
  { title: "Linux", icon: "terminal", desc: "Native support. systemd user service for daemon. The primary server deployment target.", note: "Node 22+ required.", link: "https://docs.openclaw.ai/linux" },
];

const PAIRING_AND_NODES = [
  { icon: "link", title: "Pairing is identity control", body: "Pairing determines whether a device, DM, or node is trusted to interact with the Gateway. Not just convenience, but a security boundary.", commands: ["openclaw pairing list telegram", "openclaw pairing approve telegram <CODE>", "openclaw pairing list discord", "openclaw pairing approve discord <CODE>"] },
  { icon: "monitor", title: "Nodes solve remote actions", body: "If your Gateway is on a VPS but your browser or desktop is on your laptop, you need a node on that device. The remote Gateway is not magic.", commands: ["openclaw node", "openclaw devices list", "openclaw devices approve <REQUEST_ID>"] },
  { icon: "smartphone", title: "Mobile nodes", body: "iOS and Android apps pair as WebSocket nodes. They expose Canvas, camera, voice, and device-specific commands back to the Gateway.", commands: ["# iOS: use the OpenClaw iOS app pairing flow", "# Android: use the OpenClaw Android app pairing flow", "openclaw devices list"] },
];

const BROWSER_MODES = [
  { title: "Managed browser profile", icon: "globe", risk: 30, summary: "Safest default. OpenClaw uses its own dedicated Chrome profile, separate from your browsing.", commands: ["openclaw browser profiles", "openclaw browser --browser-profile openclaw start", "openclaw browser --browser-profile openclaw open https://example.com", "openclaw browser snapshot", "openclaw browser screenshot"] },
  { title: "Chrome extension relay", icon: "plug", risk: 72, summary: "Higher convenience, higher risk. Controls your real Chrome tabs after manual attachment. Agent interacts with logged-in sessions.", commands: ["openclaw browser extension install", "openclaw browser extension path", "openclaw browser --browser-profile chrome tabs"] },
  { title: "Remote browser via node proxy", icon: "cloud", risk: 58, summary: "For when Gateway and browser live on different machines. Requires understanding networking and trust boundaries.", commands: ["# Run a node on the machine with the browser", "# Gateway proxies browser actions to that node", "openclaw node"] },
];

const MEMORY_AND_SKILLS = [
  { icon: "database", title: "Memory", body: "Persistent context that turns every session into a continuation instead of starting from zero. Memory is indexed and searchable by meaning.", commands: ["openclaw memory status", "openclaw memory index", "openclaw memory search \"project context\""] },
  { icon: "bookOpen", title: "Workspace files", body: "AGENTS.md defines your agent's persona and instructions. SOUL.md shapes personality. TOOLS.md configures available tools. These are injected into every session.", commands: ["# Edit in ~/.openclaw/workspace/", "# AGENTS.md — agent instructions", "# SOUL.md — personality and tone", "# TOOLS.md — tool configuration"] },
  { icon: "code", title: "Skills", body: "Capability units that extend what the agent can do. The agent can write its own skills. Third-party skills are code that deserves inspection. VirusTotal scans for security.", commands: ["openclaw skills list", "openclaw skills check", "npx clawhub"] },
  { icon: "package", title: "Plugins", body: "Plugins power provider auth, extra tools, and deeper integrations. Know what you enabled and why.", commands: ["openclaw plugins list", "openclaw plugins enable google-gemini-cli-auth", "openclaw update"] },
];

const AUTOMATION_CARDS = [
  { title: "Cron jobs", icon: "clock", desc: "Calendar-like scheduling. Every morning, every Monday, one specific time.", commands: ["openclaw cron add --name daily-summary --cron \"0 7 * * *\" --message \"Send the daily summary\"", "openclaw cron list"] },
  { title: "Hooks", icon: "workflow", desc: "Event-driven lifecycle behavior. Snapshots on reset, audit logs, follow-up actions.", commands: ["openclaw hooks list", "openclaw hooks --help"] },
  { title: "Webhooks", icon: "zap", desc: "External triggers from any service. Gmail Pub/Sub, GitHub events, custom HTTP calls.", commands: ["# Configure in openclaw.json", "# Gmail Pub/Sub triggers on new email", "# Custom webhook endpoints"] },
  { title: "Heartbeats", icon: "heart", desc: "Proactive check-ins. The agent wakes on a configurable schedule to act on your behalf, review pending tasks, or send updates.", commands: ["# Configured in agent settings", "# Wakes periodically to check in", "# Users report this as a favorite feature"] },
];

const MULTI_AGENT_CARDS = [
  { title: "Agent isolation", icon: "layers", body: "One Gateway, multiple agents. Each gets its own workspace, identity, model, sandbox, and routing bindings.", commands: ["openclaw agents list", "openclaw agents add work --workspace ~/.openclaw/workspace-work", "openclaw agents bindings", "openclaw agents bind --agent work --bind telegram:ops"] },
  { title: "Routing priority", icon: "route", body: "More specific matches win. Exact peer → channel + account → channel fallback → default agent.", examples: ["Telegram personal DM → home agent", "Discord guild work → work agent", "Family DM channel → family agent (restricted tools)", "Public room mention → public agent (maximum restrictions)"] },
  { title: "Sandbox and tool policy", icon: "lock", body: "Multi-agent is also risk segmentation. Separate environments that should never share the same permissions.", commands: ["openclaw sandbox explain", "# agents.defaults.sandbox for global", "# agents.list[].sandbox for per-agent"] },
];

const INTEGRATION_CATEGORIES = [
  { title: "Productivity", icon: "checkCircle", items: ["Apple Notes", "Apple Reminders", "Things 3", "Notion", "Obsidian", "Bear Notes", "Trello", "GitHub"] },
  { title: "Music & Audio", icon: "music", items: ["Spotify", "Sonos", "Shazam"] },
  { title: "Smart Home", icon: "home", items: ["Philips Hue", "8Sleep", "Home Assistant"] },
  { title: "Media & Creative", icon: "camera", items: ["AI Image Gen", "GIF Search", "Peekaboo (screen capture)", "Camera"] },
  { title: "Social & Comms", icon: "mail", items: ["Twitter/X", "Email (Himalaya)", "Gmail Pub/Sub"] },
  { title: "Tools", icon: "wrench", items: ["1Password", "Weather", "Browser automation", "Canvas (visual workspace)"] },
];

const SECURITY_SECTIONS = [
  { title: "Remote access", icon: "cloud", risk: 82, items: ["Keep the Gateway loopback-first. Access via SSH tunnel or Tailscale Serve.", "Require token/password auth for any non-loopback bind.", "Do not present public exposure as a normal beginner option."] },
  { title: "Group chats", icon: "users", risk: 68, items: ["Use mention gating (requireMention: true) in groups.", "Prefer allowlists or pairing over open access.", "Public rooms should not grant browser or filesystem power."] },
  { title: "Skills & extensions", icon: "box", risk: 90, items: ["Treat third-party skills as untrusted code. Read before enabling.", "VirusTotal partnership scans skills for known threats.", "Prefer sandboxed execution and restricted tool policy."] },
  { title: "Browser control", icon: "globe", risk: 78, items: ["Managed profile is safer than your day-to-day browser.", "Never normalize giving raw credentials to the model.", "Manual login is the safer teaching pattern."] },
];

const TROUBLESHOOTING = [
  { problem: "Agent does not reply anywhere", steps: ["openclaw gateway status or openclaw status --all", "openclaw doctor", "openclaw logs --follow", "openclaw models auth status", "Prove the local dashboard works before debugging channels."] },
  { problem: "Telegram or Discord does not work after setup", steps: ["Verify token/config setup, not the WhatsApp-style login.", "openclaw channels status --probe", "Confirm Gateway restarted or hot-reloaded after config change.", "Send a DM, then check pairing list / approve if pairing is enabled."] },
  { problem: "Browser actions fail", steps: ["openclaw browser profiles — check the active profile.", "Managed profile: ensure browser is started.", "Extension relay: confirm you manually attached the tab.", "Remote: confirm the node is online and approved with openclaw devices list."] },
  { problem: "Memory search returns weak results", steps: ["openclaw memory status", "openclaw memory index — rebuild the index.", "Verify content exists in the workspace.", "Use broader meaning-based queries, not exact-word assumptions."] },
  { problem: "Security audit shows critical findings", steps: ["openclaw security audit first, then --deep when needed.", "Do not ignore network exposure warnings.", "Check browser exposure, token auth, and tool policy.", "openclaw sandbox explain to understand what is blocked or too open."] },
];

const COMMAND_GROUPS = [
  { group: "Core setup", commands: [
    ["curl -fsSL https://openclaw.ai/install.sh | bash", "Install OpenClaw"],
    ["openclaw onboard --install-daemon", "Onboarding wizard + daemon install"],
    ["openclaw gateway status", "Check Gateway state"],
    ["openclaw dashboard", "Open the Control UI"],
    ["openclaw doctor", "Run diagnostics"],
    ["openclaw docs browser", "Search live docs from CLI"],
  ]},
  { group: "Config", commands: [
    ["openclaw config file", "Print active config path"],
    ["openclaw config validate", "Validate config structure"],
    ["openclaw config set channels.discord.enabled true --json", "Set a config value from CLI"],
  ]},
  { group: "Channels", commands: [
    ["openclaw channels list", "Show configured channels"],
    ["openclaw channels status --probe", "Health check with active probing"],
    ["openclaw channels login --channel whatsapp", "WhatsApp QR login"],
    ["openclaw channels add --channel telegram --token $TOKEN", "Add Telegram bot"],
    ["openclaw channels add --channel discord --token $TOKEN", "Add Discord bot"],
    ["openclaw channels capabilities", "Inspect channel capabilities"],
  ]},
  { group: "Pairing & devices", commands: [
    ["openclaw pairing list telegram", "List Telegram pairing requests"],
    ["openclaw pairing approve telegram <CODE>", "Approve a pairing code"],
    ["openclaw node", "Start a node host"],
    ["openclaw devices list", "List paired/pending devices"],
    ["openclaw devices approve <ID>", "Approve a device request"],
  ]},
  { group: "Browser & web", commands: [
    ["openclaw browser profiles", "List browser profiles"],
    ["openclaw browser --browser-profile openclaw start", "Start managed browser"],
    ["openclaw browser snapshot", "Capture page snapshot"],
    ["openclaw browser screenshot", "Capture screenshot"],
    ["openclaw browser extension install", "Install Chrome extension"],
  ]},
  { group: "Memory & skills", commands: [
    ["openclaw memory status", "Memory index status"],
    ["openclaw memory index", "Build/rebuild memory index"],
    ["openclaw memory search \"query\"", "Search memory by meaning"],
    ["openclaw skills list", "List available skills"],
    ["openclaw skills check", "Check skill readiness"],
    ["openclaw plugins list", "List plugins"],
    ["npx clawhub", "Browse/install skills from ClawHub"],
  ]},
  { group: "Automation & agents", commands: [
    ["openclaw cron add --name X --cron \"0 7 * * *\" --message \"Y\"", "Create a cron job"],
    ["openclaw cron list", "List cron jobs"],
    ["openclaw hooks list", "List hooks"],
    ["openclaw agents list", "List agents"],
    ["openclaw agents bindings", "List routing bindings"],
    ["openclaw agents bind --agent work --bind telegram:ops", "Bind traffic to agent"],
  ]},
  { group: "Security & status", commands: [
    ["openclaw security audit", "Standard security audit"],
    ["openclaw security audit --deep", "Deep audit"],
    ["openclaw sandbox explain", "Explain sandbox and tool policy"],
    ["openclaw status --usage", "Usage and provider breakdown"],
  ]},
];

const LAUNCH_CHECKLIST = [
  "Telegram and Discord are taught as token-based config flows, not channels-login.",
  "Browser section distinguishes managed profile, extension relay, and remote node paths.",
  "Remote access is presented as a controlled topology decision, not casual port exposure.",
  "Pairing and nodes have their own section instead of being buried elsewhere.",
  "Web tools are taught as a safer first alternative before heavier browser automation.",
  "Skills are presented with security posture. VirusTotal partnership is mentioned.",
  "Companion apps (macOS, iOS, Android) are documented with pairing and Canvas.",
  "All 15+ channels are listed with correct setup patterns.",
  "All major model providers are listed including subscription auth and local models.",
  "Workspace files (AGENTS.md, SOUL.md, TOOLS.md) are explained.",
  "Heartbeats and webhooks are covered alongside cron and hooks.",
  "The full integration ecosystem (50+ integrations) is referenced.",
  "Usage tracking is visible so readers understand cost and provider consumption.",
];

// ─── STYLES ───────────────────────────────────────────────────────────────────

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&display=swap');

  :root {
    --font-display: 'Fraunces', Georgia, serif;
    --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'DM Mono', ui-monospace, monospace;
    --c-bg: #FCFAF7; --c-bg-soft: #FFF8F1; --c-bg-card: #FFFFFF; --c-bg-card-soft: #FFFCF9; --c-bg-code: #1A1E28;
    --c-text: #2D2926; --c-text-secondary: #6A5D56; --c-text-muted: #9B8F88; --c-text-code: #E0F6E8;
    --c-border: #EDE1D7; --c-border-light: #F5EBE4; --c-border-accent: #FFD6C7;
    --c-accent: #D14A22; --c-accent-bright: #FF5A2D; --c-accent-bg: #FFF1EA; --c-accent-bg-deep: #FFEADF;
    --c-green: #2FBF71; --c-green-bg: #EEFBF3; --c-yellow: #D89D11; --c-yellow-bg: #FFF7E1;
    --c-red: #DC3545; --c-red-bg: #FFF0F0; --c-blue: #2C6BED; --c-blue-bg: #EFF5FF;
    --radius-sm: 12px; --radius-md: 18px; --radius-lg: 24px; --radius-xl: 30px;
    --shadow-card: 0 2px 14px rgba(45,41,38,0.05), 0 1px 4px rgba(45,41,38,0.05);
    --shadow-card-hover: 0 10px 30px rgba(45,41,38,0.08), 0 2px 6px rgba(45,41,38,0.06);
    --shadow-section: 0 6px 24px rgba(45,41,38,0.04);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .oc-guide { font-family: var(--font-body); background: radial-gradient(circle at top right, #FFF2EA 0%, rgba(255,242,234,0) 28%), var(--c-bg); color: var(--c-text); line-height: 1.72; -webkit-font-smoothing: antialiased; }
  .oc-guide h1,.oc-guide h2,.oc-guide h3,.oc-guide h4 { font-family: var(--font-display); line-height: 1.18; }
  .oc-guide pre,.oc-guide code { font-family: var(--font-mono); }
  .oc-card { transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
  .oc-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-card-hover); border-color: var(--c-border-accent); }
  .oc-nav-link { transition: all .18s ease; }
  .oc-nav-link:hover,.oc-nav-link.active { background: var(--c-accent-bg) !important; color: var(--c-accent) !important; border-color: var(--c-accent-bright) !important; }
  .oc-code { overflow-x: auto; scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.16) transparent; }
  .oc-code::-webkit-scrollbar { height: 6px; }
  .oc-code::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.16); border-radius: 999px; }
  .oc-grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
  .oc-grid-3 { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .oc-fade { animation: fadeUp .35s ease both; }
  @media (max-width: 900px) { .oc-hide-mobile { display: none !important; } }
  @media (max-width: 768px) { .oc-guide { font-size: 15px; } }
  .oc-collapsible-content { overflow: hidden; transition: max-height .3s ease; }
`;

const s = {
  body: { fontSize: ".87rem", lineHeight: 1.76, color: "var(--c-text-secondary)" },
  bodySmall: { fontSize: ".82rem", lineHeight: 1.72, color: "var(--c-text-secondary)" },
  eyebrow: { fontSize: 10, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--c-accent)" },
  eyebrowMuted: { fontSize: 10, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--c-text-muted)" },
  h3: { fontSize: "1rem", fontWeight: 650, color: "var(--c-text)" },
  h4: { fontSize: ".95rem", fontWeight: 650, color: "var(--c-text)" },
  inlineNote: { padding: "9px 12px", borderRadius: 12, background: "var(--c-bg-soft)", border: "1px solid var(--c-border-light)", fontSize: ".8rem", lineHeight: 1.6, color: "var(--c-text-muted)", fontWeight: 600 },
};

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────

function Section({ id, title, icon, children }) {
  return (
    <section id={id} className="oc-fade" style={{ borderRadius: "var(--radius-xl)", border: "1px solid var(--c-border)", background: "linear-gradient(180deg, var(--c-bg-card-soft) 0%, var(--c-bg-card) 100%)", padding: "28px 24px", boxShadow: "var(--shadow-section)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <IconBubble name={icon} size="lg" />
        <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)", fontWeight: 650, letterSpacing: "-0.01em" }}>{title}</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>{children}</div>
    </section>
  );
}

function SectionIntro({ children }) {
  return <p style={{ ...s.body, maxWidth: 860, fontSize: "0.95rem" }}>{children}</p>;
}

function Card({ children, soft = false, style: extraStyle = {} }) {
  return (
    <div className="oc-card" style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--c-border)", background: soft ? "linear-gradient(180deg, var(--c-bg-card-soft) 0%, var(--c-bg-card) 100%)" : "var(--c-bg-card)", padding: "20px 22px", boxShadow: "var(--shadow-card)", ...extraStyle }}>
      {children}
    </div>
  );
}

function HeaderRow({ icon, title, subtitle }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <IconBubble name={icon} />
      <div>
        {subtitle && <div style={s.eyebrowMuted}>{subtitle}</div>}
        <h3 style={s.h3}>{title}</h3>
      </div>
    </div>
  );
}

function IconBubble({ name, size = "md" }) {
  const dim = size === "lg" ? 40 : 32;
  const iconSize = size === "lg" ? 19 : 16;
  return (
    <div style={{ width: dim, height: dim, borderRadius: "var(--radius-sm)", background: "var(--c-accent-bg-deep)", color: "var(--c-accent-bright)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon name={name} size={iconSize} />
    </div>
  );
}

function BulletList({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div style={{ width: 6, height: 6, borderRadius: 999, background: "var(--c-accent-bright)", marginTop: 9, flexShrink: 0 }} />
          <p style={s.body}>{item}</p>
        </div>
      ))}
    </div>
  );
}

function NumberedList({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div style={{ width: 24, height: 24, borderRadius: 999, background: "var(--c-accent-bg)", color: "var(--c-accent)", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
          <p style={s.body}>{item}</p>
        </div>
      ))}
    </div>
  );
}

function MiniList({ title, items }) {
  return (
    <div style={{ marginTop: 12 }}>
      <div style={s.eyebrow}>{title}</div>
      <BulletList items={items} />
    </div>
  );
}

function CodeBlock({ children }) {
  const text = typeof children === "string" ? children : "";
  return (
    <div style={{ position: "relative", marginTop: 12 }}>
      <pre className="oc-code" style={{ borderRadius: "var(--radius-sm)", border: "1px solid #2B2F3A", background: "var(--c-bg-code)", color: "var(--c-text-code)", padding: "14px 16px", paddingRight: 50, fontSize: ".78rem", lineHeight: 1.82, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        <code>{text}</code>
      </pre>
      <div style={{ position: "absolute", top: 8, right: 8 }}><CopyButton text={text} /></div>
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => { try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch {} };
  return (
    <button onClick={onCopy} title="Copy" style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid rgba(255,255,255,.14)", background: copied ? "rgba(47,191,113,.18)" : "rgba(255,255,255,.06)", color: copied ? "#2FBF71" : "rgba(255,255,255,.64)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
      <Icon name={copied ? "check" : "copy"} size={14} />
    </button>
  );
}

function Callout({ icon, type, title, children, compact = false }) {
  const palette = { best: { bg: "var(--c-green-bg)", border: "#BCE7CB", text: "#1E6A3F", accent: "var(--c-green)" }, warning: { bg: "var(--c-red-bg)", border: "#F6C9CC", text: "#8C212B", accent: "var(--c-red)" }, tip: { bg: "var(--c-yellow-bg)", border: "#F3DE99", text: "#8B6914", accent: "var(--c-yellow)" }, info: { bg: "var(--c-blue-bg)", border: "#B3CDFA", text: "#1A4494", accent: "var(--c-blue)" } }[type || "tip"];
  return (
    <div style={{ marginTop: 12, borderRadius: compact ? 14 : 18, border: `1px solid ${palette.border}`, background: palette.bg, padding: compact ? "10px 14px" : "14px 18px", display: "flex", gap: 10, alignItems: "flex-start" }}>
      <div style={{ color: palette.accent, marginTop: 2, flexShrink: 0 }}><Icon name={icon} size={compact ? 16 : 18} /></div>
      <div>
        {title && <div style={{ fontSize: compact ? ".8rem" : ".86rem", fontWeight: 800, color: palette.text, marginBottom: 4 }}>{title}</div>}
        <div style={{ fontSize: compact ? ".8rem" : ".84rem", lineHeight: 1.72, color: palette.text }}>{children}</div>
      </div>
    </div>
  );
}

function SimpleTable({ headers, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 6px" }}>
        <thead>
          <tr>{headers.map((h) => <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: ".78rem", fontWeight: 800, color: "var(--c-text)", borderBottom: "2px solid var(--c-border)" }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "10px 12px", fontSize: ".82rem", lineHeight: 1.55, color: j === 0 ? "var(--c-text)" : "var(--c-text-secondary)", fontWeight: j === 0 ? 700 : 500, background: i % 2 === 0 ? "var(--c-bg-card)" : "var(--c-bg-card-soft)", borderTop: "1px solid var(--c-border-light)", borderBottom: "1px solid var(--c-border-light)", ...(j === 0 ? { borderLeft: "1px solid var(--c-border-light)", borderRadius: "12px 0 0 12px" } : {}), ...(j === row.length - 1 ? { borderRight: "1px solid var(--c-border-light)", borderRadius: "0 12px 12px 0" } : {}) }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CommandRow({ cmd, desc }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "start", padding: "10px 14px", borderRadius: 14, background: "var(--c-bg-soft)", border: "1px solid var(--c-border-light)" }}>
      <div>
        <code style={{ fontSize: ".8rem", fontWeight: 500 }}>{cmd}</code>
        <p style={{ marginTop: 3, fontSize: ".76rem", lineHeight: 1.5, color: "var(--c-text-muted)" }}>{desc}</p>
      </div>
      <CopyButton text={cmd} />
    </div>
  );
}

function RiskMeter({ value }) {
  const tone = value < 40 ? { bg: "var(--c-green-bg)", fill: "var(--c-green)", label: "Lower risk" } : value < 70 ? { bg: "var(--c-yellow-bg)", fill: "var(--c-yellow)", label: "Moderate risk" } : { bg: "var(--c-red-bg)", fill: "var(--c-red)", label: "Higher risk" };
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={s.eyebrowMuted}>Risk posture</span>
        <span style={{ fontSize: ".78rem", fontWeight: 700, color: "var(--c-text-secondary)" }}>{tone.label}</span>
      </div>
      <div style={{ width: "100%", height: 10, borderRadius: 999, background: tone.bg, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: tone.fill, borderRadius: 999 }} />
      </div>
    </div>
  );
}

function Checklist({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "12px 14px", borderRadius: 16, background: i % 2 === 0 ? "var(--c-bg-card)" : "var(--c-bg-card-soft)", border: "1px solid var(--c-border-light)" }}>
          <Icon name="checkCircle" size={18} style={{ color: "var(--c-green)", marginTop: 2, flexShrink: 0 }} />
          <p style={s.body}>{item}</p>
        </div>
      ))}
    </div>
  );
}

function DualList({ pros, cons }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }}>
      <div>
        <div style={{ ...s.eyebrow, color: "var(--c-green)" }}>Pros</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
          {pros.map((item) => <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}><Icon name="check" size={14} style={{ color: "var(--c-green)", marginTop: 4, flexShrink: 0 }} /><span style={s.bodySmall}>{item}</span></div>)}
        </div>
      </div>
      <div>
        <div style={{ ...s.eyebrow, color: "var(--c-yellow)" }}>Watch-outs</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
          {cons.map((item) => <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}><Icon name="alertTriangle" size={14} style={{ color: "var(--c-yellow)", marginTop: 4, flexShrink: 0 }} /><span style={s.bodySmall}>{item}</span></div>)}
        </div>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--c-accent-bright)", padding: "0 2px", flexShrink: 0 }}><Icon name="arrowRight" size={18} /></div>;
}

function MiniStat({ label, value }) {
  return (
    <div style={{ borderRadius: 14, border: "1px solid var(--c-border-light)", background: "var(--c-bg-card-soft)", padding: "10px 12px" }}>
      <div style={s.eyebrowMuted}>{label}</div>
      <div style={{ marginTop: 4, fontSize: ".85rem", fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function HeroBadge({ icon, label }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 14px", borderRadius: 999, border: "1px solid var(--c-border-accent)", background: "rgba(255,255,255,.9)", fontSize: ".82rem", fontWeight: 700, color: "var(--c-accent)" }}>
      <Icon name={icon} size={14} />{label}
    </span>
  );
}

// ─── DIAGRAM COMPONENTS ───────────────────────────────────────────────────────

function TopologyDiagram() {
  const box = (title, sub, desc, active = false) => (
    <div style={{ flex: "1 1 200px", minWidth: 0, padding: "16px 18px", borderRadius: 18, border: active ? "1.5px solid var(--c-accent-bright)" : "1px solid var(--c-border)", background: active ? "linear-gradient(180deg, #FFF3EC 0%, white 100%)" : "white", boxShadow: active ? "0 8px 24px rgba(209,74,34,0.08)" : "none" }}>
      <div style={s.eyebrow}>{title}</div>
      <div style={s.h4}>{sub}</div>
      <p style={s.bodySmall}>{desc}</p>
    </div>
  );
  return (
    <div>
      <div style={s.eyebrowMuted}>Three topologies</div>
      <div style={{ display: "flex", gap: 8, alignItems: "stretch", flexWrap: "wrap", marginTop: 12 }}>
        {box("Local", "One machine", "Gateway, browser, channels, and dashboard together. Easiest learning path.")}
        <ArrowIcon />
        {box("VPS", "Gateway on server", "Best for uptime. Needs secure remote access. Often needs nodes for local actions.", true)}
        <ArrowIcon />
        {box("Hybrid", "Server + local node", "Always-on Gateway with browser/desktop actions on your own device.")}
      </div>
    </div>
  );
}

function LayerDiagram({ layers }) {
  return (
    <div>
      <div style={s.eyebrowMuted}>OpenClaw stack</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
        {layers.map((layer, i) => (
          <React.Fragment key={layer.title}>
            <div style={{ flex: "1 1 200px", minWidth: 0, padding: "14px 16px", borderRadius: 18, border: layer.emphasis ? "1.5px solid var(--c-accent-bright)" : "1px solid var(--c-border)", background: layer.emphasis ? "linear-gradient(180deg, #FFF4ED 0%, white 100%)" : "white", boxShadow: layer.emphasis ? "0 8px 20px rgba(209,74,34,0.08)" : "none" }}>
              <div style={s.eyebrowMuted}>{layer.title}</div>
              <div style={{ marginTop: 6, fontSize: ".82rem", lineHeight: 1.6, color: "var(--c-text-secondary)" }}>{layer.sub}</div>
            </div>
            {i < layers.length - 1 && <ArrowIcon />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function OpenClawGuide() {
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -60% 0px", threshold: 0.12 }
    );
    sections.forEach((sec) => observerRef.current.observe(sec));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div className="oc-guide" style={{ minHeight: "100vh" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 16px 64px" }}>

          {/* ── HERO ────────────────────────────────────────────────── */}
          <header className="oc-fade" style={{ borderRadius: "var(--radius-xl)", border: "1px solid var(--c-border)", background: "linear-gradient(135deg, #FFFBF7 0%, #FFF3EB 52%, #FFF9F3 100%)", boxShadow: "0 14px 50px rgba(209,74,34,0.07)", overflow: "hidden" }}>
            <div style={{ padding: "38px 28px 42px" }}>
              <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 700, letterSpacing: "-0.03em" }}>OpenClaw Guide</h1>
              <p style={{ marginTop: 16, fontSize: "1.06rem", lineHeight: 1.82, color: "var(--c-text-secondary)", maxWidth: 780 }}>
                The complete guide to your self-hosted AI assistant. From first install to remote hosting, multi-agent routing, browser automation, 50+ integrations, and security posture.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
                <HeroBadge icon="bookOpen" label="Beginner to expert" />
                <HeroBadge icon="compass" label="Visual decision paths" />
                <HeroBadge icon="shieldCheck" label="Security-first" />
                <HeroBadge icon="workflow" label="Gateway-first model" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginTop: 24, maxWidth: 600 }}>
                <MiniStat label="First test" value="Local dashboard" />
                <MiniStat label="First live channel" value="One DM" />
                <MiniStat label="Beginner rule" value="One provider" />
                <MiniStat label="Security habit" value="Audit early" />
              </div>
            </div>
          </header>

          {/* ── NAV ─────────────────────────────────────────────────── */}
          <nav style={{ position: "sticky", top: 0, zIndex: 50, marginTop: 20, borderRadius: "var(--radius-md)", border: "1px solid var(--c-border-light)", background: "rgba(252,250,247,0.92)", backdropFilter: "blur(14px)", padding: "10px 14px" }}>
            <button onClick={() => setMobileNavOpen((v) => !v)} style={{ display: "none", width: "100%", padding: "8px 12px", border: "1px solid var(--c-border)", borderRadius: "var(--radius-sm)", background: "white", color: "var(--c-text)", fontFamily: "var(--font-body)", fontWeight: 600, cursor: "pointer", alignItems: "center", gap: 8, textAlign: "left" }} className="oc-mobile-toggle">
              <Icon name="menu" size={16} />
              <span>{NAV_ITEMS.find((i) => i.id === activeSection)?.label || "Navigate"}</span>
            </button>
            <style>{`@media(max-width:920px){.oc-mobile-toggle{display:flex!important}.oc-nav-wrap{display:${mobileNavOpen?"flex":"none"}!important;flex-direction:column!important;margin-top:8px}}`}</style>
            <div className="oc-nav-wrap" style={{ display: "flex", gap: 5, overflowX: "auto", scrollbarWidth: "none" }}>
              {NAV_ITEMS.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={() => setMobileNavOpen(false)} className={`oc-nav-link ${activeSection === item.id ? "active" : ""}`} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 999, border: "1px solid var(--c-border-light)", color: activeSection === item.id ? "var(--c-accent)" : "var(--c-text-secondary)", background: activeSection === item.id ? "var(--c-accent-bg)" : "rgba(255,255,255,0.9)", whiteSpace: "nowrap", textDecoration: "none", fontSize: 12, fontWeight: activeSection === item.id ? 700 : 600 }}>
                  <Icon name={item.icon} size={13} />{item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* ── SECTIONS ────────────────────────────────────────────── */}
          <main style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 28 }}>

            {/* OVERVIEW */}
            <Section id="overview" title="What OpenClaw Is" icon="sparkles">
              <SectionIntro>OpenClaw is a self-hosted Gateway that connects AI agents to the chat apps you already use. It manages channels, sessions, providers, tools, memory, and security in one operational stack. Built by Peter Steinberger and the open-source community.</SectionIntro>
              <div className="oc-grid">{WHAT_IT_IS.map((item) => <Card key={item.title}><HeaderRow icon={item.icon} title={item.title} /><p style={s.body}>{item.body}</p></Card>)}</div>
              <h3 style={{ ...s.h3, marginTop: 6 }}>Who this guide is for</h3>
              <div className="oc-grid">{AUDIENCE_TIERS.map((tier) => (
                <Card key={tier.title} soft>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <IconBubble name={tier.icon} />
                    <div><div style={s.eyebrow}>{tier.tier}</div><h3 style={s.h3}>{tier.title}</h3></div>
                  </div>
                  <p style={s.body}>{tier.body}</p>
                  <div style={{ ...s.inlineNote, marginTop: 10 }}>Path: {tier.path}</div>
                </Card>
              ))}</div>
            </Section>

            {/* START PATHS */}
            <Section id="paths" title="Choose Your Starting Path" icon="compass">
              <SectionIntro>The fastest route for a local beginner differs from a VPS operator or multi-agent setup. Pick the path that matches your situation.</SectionIntro>
              <div className="oc-grid">{START_PATHS.map((path) => <Card key={path.title}><HeaderRow icon={path.icon} title={path.title} subtitle={path.audience} /><NumberedList items={path.steps} /></Card>)}</div>
            </Section>

            {/* INSTALL */}
            <Section id="install" title="Installation and Hosting" icon="server">
              <SectionIntro>Understand the difference between where the Gateway runs, where the browser runs, and where you interact. That distinction prevents most setup confusion.</SectionIntro>
              <Card><TopologyDiagram /></Card>
              <div className="oc-grid">{INSTALL_MODES.map((mode) => (
                <Card key={mode.title}>
                  <HeaderRow icon={mode.icon} title={mode.title} />
                  <p style={s.body}>{mode.summary}</p>
                  <MiniList title="Best for" items={mode.goodFor} />
                  <Callout icon="alertTriangle" type="warning" title="Watch out" compact>{mode.caution}</Callout>
                  <CodeBlock>{mode.commands.join("\n")}</CodeBlock>
                </Card>
              ))}</div>
              <Callout icon="lightbulb" type="tip" title="Minimum requirements">2GB RAM and 2 CPU cores for basic chat. 4GB if you want browser automation. A $5/month VPS handles this. Raspberry Pi works too.</Callout>
            </Section>

            {/* ARCHITECTURE */}
            <Section id="architecture" title="Architecture" icon="workflow">
              <SectionIntro>When something breaks, it belongs to a specific layer. Name the layer correctly and you can debug faster.</SectionIntro>
              <Card><LayerDiagram layers={ARCHITECTURE_LAYERS} /></Card>
              <div className="oc-grid">
                <Card soft>
                  <h3 style={s.h3}>Why layers matter</h3>
                  <BulletList items={["Changing a model provider is not the same as changing the chat channel.", "Changing a channel is not the same as changing the agent workspace.", "A remote Gateway does not give you local browser control without a node.", "Security policy applies at multiple layers: network, channel, agent, tool, device."]} />
                </Card>
                <Card soft>
                  <h3 style={s.h3}>Debug order</h3>
                  <NumberedList items={["Gateway up or down?", "Provider auth healthy?", "Channel configured correctly?", "Pairing / allowlist blocking?", "Tool policy or sandbox blocking?", "Memory missing or stale?"]} />
                </Card>
              </div>
            </Section>

            {/* CONFIG */}
            <Section id="config" title="Configuration" icon="wrench">
              <SectionIntro>OpenClaw is feature-rich enough that a guide must teach config structure, not just one-off commands.</SectionIntro>
              <div className="oc-grid">{CONFIG_BLOCKS.map((block) => (
                <Card key={block.title}>
                  <h3 style={s.h3}>{block.title}</h3>
                  {block.items ? <BulletList items={block.items} /> : <CodeBlock>{block.code}</CodeBlock>}
                </Card>
              ))}</div>
              <Callout icon="lightbulb" type="info" title="Environment variables">OPENCLAW_HOME, OPENCLAW_STATE_DIR, and OPENCLAW_CONFIG_PATH let you customize paths for service accounts or non-standard setups.</Callout>
            </Section>

            {/* PROVIDERS */}
            <Section id="providers" title="Models and Providers" icon="brain">
              <SectionIntro>OpenClaw supports 13+ model providers. Start with one provider, one auth path, one default model. Add complexity after the base path is proven.</SectionIntro>
              <Card><SimpleTable headers={PROVIDER_TABLE.headers} rows={PROVIDER_TABLE.rows} /></Card>
              <div className="oc-grid">
                <Card>
                  <HeaderRow icon="lock" title="API key flow" />
                  <p style={s.body}>Most predictable for always-on hosts. Clear billing, explicit secrets, easy debugging.</p>
                  <DualList pros={["Predictable for 24/7 runtime", "No browser callback needed", "Easy to rotate"]} cons={["Must protect secrets carefully", "Keys can leak via bad config handling"]} />
                  <CodeBlock>{"openclaw onboard --provider openai\nopenclaw onboard --provider anthropic\nopenclaw models auth status"}</CodeBlock>
                </Card>
                <Card>
                  <HeaderRow icon="plug" title="Subscription auth (OAuth)" />
                  <p style={s.body}>Use your existing Claude Pro/Max or ChatGPT/Codex subscription. No separate API billing.</p>
                  <DualList pros={["No manual API key copy", "Uses existing subscription", "Provider-native login flow"]} cons={["More moving parts", "Awkward in Docker or headless setups", "Token refresh edge cases"]} />
                  <CodeBlock>{"openclaw onboard --auth-choice openai-codex\nopenclaw models auth login --provider openai-codex\nopenclaw plugins enable google-gemini-cli-auth"}</CodeBlock>
                </Card>
              </div>
            </Section>

            {/* CHANNELS */}
            <Section id="channels" title="Channels" icon="messageSquare">
              <SectionIntro>Not all channels use the same setup flow. WhatsApp uses QR login. Telegram and Discord use bot tokens. Know which pattern applies before you start.</SectionIntro>
              <Card><SimpleTable headers={CHANNEL_TABLE.headers} rows={CHANNEL_TABLE.rows} /></Card>
              <Callout icon="checkCircle" type="best" title="Correct patterns">WhatsApp → channels login (QR). Telegram/Discord → channels add or config with bot token. Do not confuse the two flows.</Callout>
              <div className="oc-grid">
                <Card>
                  <HeaderRow icon="messageSquare" title="WhatsApp" />
                  <p style={s.body}>Interactive QR login via Baileys (WhatsApp Web protocol). Best starter live channel for many users.</p>
                  <CodeBlock>{"openclaw channels login --channel whatsapp"}</CodeBlock>
                  <div style={{ ...s.inlineNote, marginTop: 10 }}>Start with a DM, not a group. Prove it works before scaling.</div>
                </Card>
                <Card>
                  <HeaderRow icon="messageSquare" title="Telegram" />
                  <p style={s.body}>Bot token via BotFather. Use numeric user IDs for allowlists. Decide privacy vs. admin mode for groups.</p>
                  <CodeBlock>{"openclaw channels add --channel telegram --token $TELEGRAM_BOT_TOKEN"}</CodeBlock>
                </Card>
                <Card>
                  <HeaderRow icon="messageSquare" title="Discord" />
                  <p style={s.body}>Bot token plus server permissions. Lock permissions at the Discord layer first, then narrow OpenClaw policy.</p>
                  <CodeBlock>{"openclaw channels add --channel discord --token $DISCORD_BOT_TOKEN"}</CodeBlock>
                </Card>
              </div>
            </Section>

            {/* COMPANION APPS */}
            <Section id="apps" title="Companion Apps" icon="smartphone">
              <SectionIntro>The Gateway alone delivers a great experience. Companion apps add menu bar control, voice, camera, Canvas, and mobile node capabilities.</SectionIntro>
              <div className="oc-grid">{COMPANION_APPS.map((app) => (
                <Card key={app.title}>
                  <HeaderRow icon={app.icon} title={app.title} />
                  <p style={s.body}>{app.desc}</p>
                  <div style={{ ...s.inlineNote, marginTop: 10 }}>{app.note}</div>
                </Card>
              ))}</div>
              <Callout icon="lightbulb" type="info" title="Mobile access without apps">You can chat via WhatsApp, Telegram, or any connected channel from your phone. No app install needed. The companion apps add extra features like Canvas, camera, and voice.</Callout>
            </Section>

            {/* PAIRING & NODES */}
            <Section id="pairing" title="Pairing and Nodes" icon="link">
              <SectionIntro>Pairing governs trust at the DM and device level. Nodes matter whenever your Gateway is somewhere different from the machine performing the action.</SectionIntro>
              <div className="oc-grid">{PAIRING_AND_NODES.map((item) => (
                <Card key={item.title}>
                  <HeaderRow icon={item.icon} title={item.title} />
                  <p style={s.body}>{item.body}</p>
                  {item.commands && <CodeBlock>{item.commands.join("\n")}</CodeBlock>}
                </Card>
              ))}</div>
            </Section>

            {/* BROWSER */}
            <Section id="browser" title="Browser and Web Tools" icon="globe">
              <SectionIntro>Browser automation has multiple control modes with different risk levels. Prefer lighter web tools before heavier browser automation.</SectionIntro>
              <div className="oc-grid">{BROWSER_MODES.map((mode) => (
                <Card key={mode.title}>
                  <HeaderRow icon={mode.icon} title={mode.title} />
                  <RiskMeter value={mode.risk} />
                  <p style={s.body}>{mode.summary}</p>
                  <CodeBlock>{mode.commands.join("\n")}</CodeBlock>
                </Card>
              ))}</div>
              <Card soft>
                <h3 style={s.h3}>Prefer lighter tools first</h3>
                <BulletList items={["web_search is lighter and safer than full browser automation for many tasks.", "web_fetch grabs content without full UI interaction.", "Canvas provides a visual workspace for rich interactions on companion apps.", "Escalate to browser control only when necessary."]} />
              </Card>
            </Section>

            {/* MEMORY */}
            <Section id="memory" title="Memory, Workspace, Skills, and Plugins" icon="database">
              <SectionIntro>These are distinct concepts. Memory is persistent context, workspace files shape agent behavior, skills are capability units, and plugins extend the platform.</SectionIntro>
              <div className="oc-grid">{MEMORY_AND_SKILLS.map((item) => (
                <Card key={item.title}>
                  <HeaderRow icon={item.icon} title={item.title} />
                  <p style={s.body}>{item.body}</p>
                  <CodeBlock>{item.commands.join("\n")}</CodeBlock>
                </Card>
              ))}</div>
              <Callout icon="shieldCheck" type="best" title="ClawHub + VirusTotal">Browse and install community skills from ClawHub (clawhub.ai). Skills are scanned via the VirusTotal partnership for known threats.</Callout>
            </Section>

            {/* AUTOMATION */}
            <Section id="automation" title="Automation" icon="clock">
              <SectionIntro>Four automation triggers: cron for schedules, hooks for lifecycle events, webhooks for external triggers, and heartbeats for proactive check-ins.</SectionIntro>
              <Card>
                <div style={s.eyebrowMuted}>When to use what</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginTop: 12 }}>
                  {[
                    { icon: "clock", label: "Cron", when: "Time matters exactly" },
                    { icon: "workflow", label: "Hooks", when: "An event triggers behavior" },
                    { icon: "zap", label: "Webhooks", when: "External service calls in" },
                    { icon: "heart", label: "Heartbeats", when: "Agent wakes proactively" },
                  ].map((t) => (
                    <div key={t.label} style={{ borderRadius: 16, border: "1px solid var(--c-border)", background: "white", padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}><IconBubble name={t.icon} /><div style={s.h4}>{t.label}</div></div>
                      <p style={{ ...s.bodySmall, marginTop: 8 }}>{t.when}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <div className="oc-grid">{AUTOMATION_CARDS.map((card) => (
                <Card key={card.title}>
                  <HeaderRow icon={card.icon} title={card.title} />
                  <p style={s.body}>{card.desc}</p>
                  {card.commands && <CodeBlock>{card.commands.join("\n")}</CodeBlock>}
                </Card>
              ))}</div>
            </Section>

            {/* MULTI-AGENT */}
            <Section id="agents" title="Multi-Agent Routing" icon="route">
              <SectionIntro>Multi-agent is where OpenClaw becomes a serious operating model. It is both a productivity feature and a risk-segmentation feature.</SectionIntro>
              <Card>
                <div style={s.eyebrowMuted}>Routing priority (most specific wins)</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                  {["1. Exact peer", "2. Channel + account", "3. Channel fallback", "4. Default agent"].map((label, i) => (
                    <React.Fragment key={label}>
                      <div style={{ flex: "1 1 160px", minWidth: 0, padding: "14px 16px", borderRadius: 18, border: i === 0 ? "1.5px solid var(--c-accent-bright)" : "1px solid var(--c-border)", background: i === 0 ? "linear-gradient(180deg, #FFF4ED 0%, white 100%)" : "white" }}>
                        <div style={s.h4}>{label}</div>
                      </div>
                      {i < 3 && <ArrowIcon />}
                    </React.Fragment>
                  ))}
                </div>
              </Card>
              <div className="oc-grid">{MULTI_AGENT_CARDS.map((item) => (
                <Card key={item.title}>
                  <HeaderRow icon={item.icon} title={item.title} />
                  <p style={s.body}>{item.body}</p>
                  {item.examples && <MiniList title="Examples" items={item.examples} />}
                  {item.commands && <CodeBlock>{item.commands.join("\n")}</CodeBlock>}
                </Card>
              ))}</div>
            </Section>

            {/* INTEGRATIONS */}
            <Section id="integrations" title="Integration Ecosystem" icon="grid">
              <SectionIntro>OpenClaw connects to 50+ apps and services. The agent can also build new integrations on the fly by writing custom skills.</SectionIntro>
              <div className="oc-grid">{INTEGRATION_CATEGORIES.map((cat) => (
                <Card key={cat.title}>
                  <HeaderRow icon={cat.icon} title={cat.title} />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                    {cat.items.map((item) => <span key={item} style={{ padding: "4px 12px", borderRadius: 999, border: "1px solid var(--c-border-light)", background: "var(--c-bg-soft)", fontSize: ".8rem", fontWeight: 600, color: "var(--c-text-secondary)" }}>{item}</span>)}
                  </div>
                </Card>
              ))}</div>
              <Callout icon="externalLink" type="info" title="Full list">Browse all integrations at openclaw.ai/integrations and community skills at clawhub.ai.</Callout>
            </Section>

            {/* SECURITY */}
            <Section id="security" title="Security" icon="shieldCheck">
              <SectionIntro>A guide that does not teach risk properly is not complete. The goal is operational clarity, not paranoia.</SectionIntro>
              <div className="oc-grid">{SECURITY_SECTIONS.map((sec) => (
                <Card key={sec.title}>
                  <HeaderRow icon={sec.icon} title={sec.title} />
                  <RiskMeter value={sec.risk} />
                  <BulletList items={sec.items} />
                </Card>
              ))}</div>
              <Card>
                <h3 style={s.h3}>Essential security commands</h3>
                <CodeBlock>{"openclaw security audit\nopenclaw security audit --deep\nopenclaw sandbox explain\nopenclaw status --usage"}</CodeBlock>
              </Card>
            </Section>

            {/* TROUBLESHOOTING */}
            <Section id="troubleshooting" title="Troubleshooting" icon="search">
              <SectionIntro>Layered troubleshooting beats vague "check your config" advice. Start from the Gateway and work outward.</SectionIntro>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {TROUBLESHOOTING.map((item) => (
                  <Card key={item.problem}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 12, background: "var(--c-red-bg)", color: "var(--c-red)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="alertTriangle" size={16} /></div>
                      <h3 style={s.h3}>{item.problem}</h3>
                    </div>
                    <NumberedList items={item.steps} />
                  </Card>
                ))}
              </div>
            </Section>

            {/* COMMANDS */}
            <Section id="commands" title="Command Reference" icon="terminal">
              <SectionIntro>Organized by task, not by CLI namespace. Only commands you will use repeatedly.</SectionIntro>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {COMMAND_GROUPS.map((group) => (
                  <Card key={group.group}>
                    <h3 style={s.h3}>{group.group}</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                      {group.commands.map(([cmd, desc]) => <CommandRow key={cmd} cmd={cmd} desc={desc} />)}
                    </div>
                  </Card>
                ))}
              </div>
            </Section>

            {/* CHECKLIST */}
            <Section id="checklist" title="Launch Checklist" icon="checkCircle">
              <SectionIntro>Use this as the editorial QA sheet. It keeps the guide aligned with how OpenClaw actually works now.</SectionIntro>
              <Card><Checklist items={LAUNCH_CHECKLIST} /></Card>
            </Section>

          </main>

          {/* ── FOOTER ──────────────────────────────────────────────── */}
          <footer style={{ marginTop: 48, padding: "28px 24px", borderRadius: "var(--radius-xl)", border: "1px solid var(--c-border-light)", background: "var(--c-bg-card-soft)", textAlign: "center" }}>
            <p style={{ fontSize: ".85rem", color: "var(--c-text-muted)", lineHeight: 1.8 }}>
              OpenClaw Guide<br />
              © 2026 EugeneYip.com All Rights Reserved.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
