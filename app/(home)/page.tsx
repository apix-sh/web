import Link from "next/link";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { Cards, Card } from "fumadocs-ui/components/card";
import { Steps, Step } from "fumadocs-ui/components/steps";
import { Accordions, Accordion } from "fumadocs-ui/components/accordion";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { TerminalDemo } from "@/components/terminal-demo";
import {
  Terminal,
  Search,
  Eye,
  Zap,
  HardDrive,
  Bot,
  Layers,
  ExternalLink,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-24 pb-16 max-w-3xl mx-auto gap-6">
        <pre className="font-mono leading-none select-none" aria-hidden>
          {`
 █████╗ ██████╗ ██╗██╗  ██╗
██╔══██╗██╔══██╗██║╚██╗██╔╝
███████║██████╔╝██║ ╚███╔╝ 
██╔══██║██╔═══╝ ██║ ██╔██╗ 
██║  ██║██║     ██║██╔╝ ██╗
╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝
`}
        </pre>
        <h1 className="sr-only text-5xl sm:text-6xl font-bold tracking-tight">
          apix
        </h1>
        <p className="text-xl sm:text-2xl font-medium text-fd-foreground">
          API Explorer for Agents (and Humans)
        </p>
        <p className="text-fd-muted-foreground text-base max-w-xl">
          Local-first, progressive disclosure API discovery and browsing CLI for
          the agentic era.
        </p>

        <div className="flex flex-row gap-3 mt-2">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground hover:bg-fd-primary/90 transition-colors"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/apix-sh/cli"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-5 py-2.5 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors"
          >
            GitHub
            <ExternalLink className="size-3.5" />
          </a>
        </div>

        <div className="mt-4 w-full max-w-lg text-left">
          <DynamicCodeBlock
            lang="bash"
            code="curl -fsSL https://apix.sh/install | sh"
            codeblock={{
              title: "Quick install",
              icon: <Terminal className="size-4" />,
            }}
          />
        </div>
      </section>

      {/* Install */}
      <section className="w-full max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Install</h2>
        <Tabs items={["curl", "Homebrew", "Build from source"]}>
          <Tab value="curl">
            <div className="flex flex-col gap-4 text-sm">
              <div>
                <p className="mb-2 text-fd-muted-foreground">Latest release:</p>
                <DynamicCodeBlock
                  lang="bash"
                  code="curl -fsSL https://apix.sh/install | sh"
                />
              </div>
              <div>
                <p className="mb-2 text-fd-muted-foreground">
                  Pin a specific version:
                </p>
                <DynamicCodeBlock
                  lang="bash"
                  code="curl -fsSL https://apix.sh/install | sh -s -- --version v0.1.0"
                />
              </div>
            </div>
          </Tab>
          <Tab value="Homebrew">
            <div className="flex flex-col gap-4 text-sm">
              <DynamicCodeBlock
                lang="bash"
                code="brew install apix-sh/apix/apix"
              />
              <p className="text-fd-muted-foreground">
                Or tap first, then install:
              </p>
              <DynamicCodeBlock
                lang="bash"
                code={`brew tap apix-sh/apix\nbrew install apix`}
              />
            </div>
          </Tab>
          <Tab value="Build from source">
            <div className="flex flex-col gap-4 text-sm">
              <p className="text-fd-muted-foreground">
                Requires the Rust toolchain (rustup, cargo).
              </p>
              <DynamicCodeBlock lang="bash" code="cargo install apix-cli" />
              <p className="text-fd-muted-foreground">
                Or clone and build manually:
              </p>
              <DynamicCodeBlock
                lang="bash"
                code={`git clone https://github.com/apix-sh/cli.git\ncd cli\ncargo build --release`}
              />
            </div>
          </Tab>
        </Tabs>
        <p className="text-sm text-fd-muted-foreground mt-4 text-center">
          Verify your install:{" "}
          <code className="bg-fd-secondary px-1.5 py-0.5 rounded">
            apix --version
          </code>
        </p>

        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4 text-center">
            Install Agent Skill
          </h3>
          <p className="text-fd-muted-foreground text-center mb-6 text-sm">
            Give your AI coding agents the ability to use apix directly in your
            workspace.
          </p>
          <Tabs items={["skills.sh", "OpenClaw"]}>
            <Tab value="skills.sh">
              <div className="flex flex-col gap-2 text-sm">
                <p className="text-fd-muted-foreground">
                  Works with Cursor, Claude Code, Codex CLI, and more via{" "}
                  <a
                    href="https://skills.sh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-fd-foreground transition-colors"
                  >
                    skills.sh
                  </a>
                  :
                </p>
                <DynamicCodeBlock
                  lang="bash"
                  code="npx skills add apix-sh/cli"
                />
              </div>
            </Tab>
            <Tab value="OpenClaw">
              <div className="flex flex-col gap-2 text-sm">
                <p className="text-fd-muted-foreground">
                  Install via{" "}
                  <a
                    href="https://clawhub.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-fd-foreground transition-colors"
                  >
                    ClawHub
                  </a>
                  :
                </p>
                <DynamicCodeBlock
                  lang="bash"
                  code="npx clawhub@latest install apix"
                />
              </div>
            </Tab>
          </Tabs>
        </div>
      </section>

      {/* Why */}
      <section className="w-full max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-3 text-center">Why apix?</h2>
        <p className="text-fd-muted-foreground text-center mb-8 max-w-xl mx-auto">
          API docs today are built for humans browsing the web — not for agents
          operating in a terminal. Raw OpenAPI specs are massive JSON blobs that
          flood token windows, and web-based docs require agents to scrape and
          parse HTML. apix eliminates both obstacles.
        </p>
        <Cards>
          <Card
            icon={<Layers className="size-5" />}
            title="Progressive Disclosure"
            description="Only fetch what you need. Search → peek → show → call. No wasted tokens."
          />
          <Card
            icon={<HardDrive className="size-5" />}
            title="Local-First"
            description="Git-backed vaults stored on your filesystem. Works offline with no cloud dependency."
          />
          <Card
            icon={<Bot className="size-5" />}
            title="Agent-Native"
            description="Plain markdown files on disk — no web browsing required. Agents use standard file and shell tools; no browser needed."
          />
          <Card
            icon={<Zap className="size-5" />}
            title="Blazing Fast"
            description="Written in Rust. Near-instant startup, ripgrep-powered search, sparse Git checkout."
          />
        </Cards>
      </section>

      {/* How It Works */}
      <section className="w-full max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-3 text-center">How It Works</h2>
        <p className="text-fd-muted-foreground text-center mb-8 max-w-xl mx-auto">
          The progressive discovery loop lets agents (and humans) gather context
          efficiently before executing API calls.
        </p>
        <TerminalDemo />
        <div className="mt-12" />
        <Steps>
          <Step>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Search className="size-4" />
              Discover
            </h3>
            <p className="text-fd-muted-foreground text-sm mb-3">
              Search the registry for APIs matching your needs.
            </p>
            <DynamicCodeBlock
              lang="bash"
              code='apix search "audio generation"'
            />
          </Step>
          <Step>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <HardDrive className="size-4" />
              Pull
            </h3>
            <p className="text-fd-muted-foreground text-sm mb-3">
              Sparse-checkout only the API you need into your local vault.
            </p>
            <DynamicCodeBlock lang="bash" code="apix pull openai" />
          </Step>
          <Step>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Search className="size-4" />
              Grep, Peek &amp; Show
            </h3>
            <p className="text-fd-muted-foreground text-sm mb-3">
              Grep to locate endpoints by keyword, peek for a quick summary of
              required parameters, or show for the full documentation —
              progressive detail on demand.
            </p>
            <DynamicCodeBlock
              lang="bash"
              code={`# find endpoints matching a keyword\napix grep openai completions\n\n# condensed view — required params only\napix peek openai/v1/chat/completions/POST\n\n# full documentation\napix show openai/v1/chat/completions/POST`}
            />
            <p className="text-fd-muted-foreground text-xs mt-3">
              Since the vault is just local files, agents can also use native
              Unix tools (
              <code className="bg-fd-secondary px-1 py-0.5 rounded">ls</code>,{" "}
              <code className="bg-fd-secondary px-1 py-0.5 rounded">find</code>,{" "}
              <code className="bg-fd-secondary px-1 py-0.5 rounded">grep</code>,{" "}
              etc.) to explore the vault directly.
            </p>
          </Step>
          <Step>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Zap className="size-4" />
              Call
            </h3>
            <p className="text-fd-muted-foreground text-sm mb-3">
              Execute the HTTP call directly from the route (with
              cURL-compatible arguments).
            </p>
            <DynamicCodeBlock
              lang="bash"
              code={`apix call openai/v1/chat/completions/POST \\\n  -H "Authorization: Bearer $OPENAI_API_KEY" \\\n  -d '{"model":"gpt-4","messages":[...]}'`}
            />
          </Step>
        </Steps>
        <p className="text-center mt-8">
          <Link
            href="/docs/commands"
            className="text-sm font-medium text-fd-foreground underline underline-offset-4 hover:text-fd-muted-foreground transition-colors"
          >
            Command reference →
          </Link>
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="w-full max-w-3xl mx-auto px-6 py-12 pb-24">
        <h2 className="text-2xl font-bold mb-8 text-center">FAQ</h2>
        <Accordions type="single">
          <Accordion title="What is apix?">
            apix is a Rust CLI that converts monolithic OpenAPI specs into a
            file-system-native markdown vault. It lets you discover, browse,
            search, and call APIs from your terminal, and is designed for both
            AI agents and humans.
          </Accordion>
          <Accordion title="How is this different from just reading OpenAPI specs?">
            Raw OpenAPI JSON/YAML files are often thousands of lines long. They
            flood LLM context windows and degrade reasoning quality. apix breaks
            specs into individual, token-optimized markdown files with
            progressive disclosure — agents only load what they need.
          </Accordion>
          <Accordion title="Does apix work with any API?">
            apix supports OpenAPI 3.0 and 3.1 specifications. You can import any
            conforming spec with{" "}
            <code className="bg-fd-secondary px-1.5 py-0.5 rounded text-sm">
              apix import
            </code>
            . The public registry ships with curated specs for popular APIs like
            Stripe, OpenAI, GitHub, and more.
          </Accordion>
          <Accordion title="Can I use apix with AI agents like Claude or GPT?">
            Yes. apix is specifically designed for agent-native workflows. Piped
            output is raw markdown. Agents can use standard tool-use patterns:
            search → peek → call. The progressive disclosure loop keeps token
            usage minimal.
          </Accordion>
          <Accordion title="Is my API data sent anywhere?">
            No. apix is entirely local-first. Vault data lives on your
            filesystem at{" "}
            <code className="bg-fd-secondary px-1.5 py-0.5 rounded text-sm">
              ~/.apix/vaults/
            </code>
            . The only network calls are Git fetches from the registry and your
            own API calls via{" "}
            <code className="bg-fd-secondary px-1.5 py-0.5 rounded text-sm">
              apix call
            </code>
            .
          </Accordion>
          <Accordion title="How do I add my own API?">
            Use{" "}
            <code className="bg-fd-secondary px-1.5 py-0.5 rounded text-sm">
              apix import &lt;spec&gt; --name &lt;namespace&gt;
            </code>{" "}
            to ingest any OpenAPI spec file or URL. The generated vault is
            stored locally and immediately searchable. You can also contribute
            to the public registry.
          </Accordion>
          <Accordion title="Why does it not do X?">
            apix is in an early stage and actively evolving. We will keep
            iterating based on real-world usage. If you have suggestions or
            ideas, we welcome contributions and feedback from the community —
            open an issue or PR on{" "}
            <a
              href="https://github.com/apix-sh/cli"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-fd-foreground transition-colors"
            >
              GitHub
            </a>
            .
          </Accordion>
        </Accordions>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-fd-border py-8 text-center text-xs text-fd-muted-foreground">
        An{" "}
        <a
          href="https://github.com/apix-sh/cli"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-fd-foreground transition-colors"
        >
          open source
        </a>{" "}
        project by{" "}
        <a
          href="https://x.com/_andydeng"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-fd-foreground transition-colors"
        >
          Andy Deng
        </a>
        , built with love.
      </footer>
    </main>
  );
}
