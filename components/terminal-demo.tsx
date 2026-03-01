'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'info' | 'dim' | 'header' | 'blank';
}

interface TerminalStep {
  lines: TerminalLine[];
  pauseAfter: number;
}

const steps: TerminalStep[] = [
  {
    pauseAfter: 3000,
    lines: [
      { text: '$ apix search "chat completions"', type: 'input' },
      { text: '', type: 'blank' },
      {
        text: 'core       openai        OpenAI API                  v1       [ai,llm,chat]',
        type: 'output',
      },
      {
        text: 'core       anthropic     Anthropic Messages API      v1       [ai,llm,chat]',
        type: 'output',
      },
      {
        text: 'core       groq          Groq Inference API          v1       [ai,llm,chat]',
        type: 'output',
      },
    ],
  },
  {
    pauseAfter: 3000,
    lines: [
      { text: '$ apix pull openai', type: 'input' },
      {
        text: 'ℹ Pulled `core/openai`: 128 files, 0.84 MB',
        type: 'info',
      },
    ],
  },
  {
    pauseAfter: 3000,
    lines: [
      { text: '$ apix grep openai completions', type: 'input' },
      { text: '', type: 'blank' },
      {
        text: 'openai/v1/chat/completions/POST',
        type: 'output',
      },
      {
        text: '  Create a chat completion with the specified model',
        type: 'dim',
      },
    ],
  },
  {
    pauseAfter: 4000,
    lines: [
      { text: '$ apix peek openai/v1/chat/completions/POST', type: 'input' },
      { text: '', type: 'blank' },
      { text: '---', type: 'dim' },
      { text: 'method: POST', type: 'output' },
      { text: 'url: https://api.openai.com/v1/chat/completions', type: 'output' },
      { text: 'auth: Bearer', type: 'output' },
      { text: 'content_type: application/json', type: 'output' },
      { text: '---', type: 'dim' },
      { text: '', type: 'blank' },
      { text: '## Required Request Body Fields', type: 'header' },
      { text: '| Property   | Type     | Description              |', type: 'dim' },
      { text: '| model      | string   | Model ID (e.g. gpt-4o)   |', type: 'output' },
      { text: '| messages   | array    | List of message objects   |', type: 'output' },
    ],
  },
  {
    pauseAfter: 2000,
    lines: [
      {
        text: '$ apix call openai/v1/chat/completions/POST \\',
        type: 'input',
      },
      {
        text: '    -H "Authorization: Bearer $OPENAI_API_KEY" \\',
        type: 'input',
      },
      {
        text: '    -d \'{"model":"gpt-4o","messages":[{"role":"user","content":"hello"}]}\'',
        type: 'input',
      },
      { text: '', type: 'blank' },
      { text: '{', type: 'output' },
      { text: '  "id": "chatcmpl-abc123",', type: 'output' },
      { text: '  "object": "chat.completion",', type: 'output' },
      { text: '  "choices": [{', type: 'output' },
      { text: '    "message": {', type: 'output' },
      { text: '      "role": "assistant",', type: 'output' },
      { text: '      "content": "Hello! How can I help you today?"', type: 'output' },
      { text: '    }', type: 'output' },
      { text: '  }]', type: 'output' },
      { text: '}', type: 'output' },
    ],
  },
];

const TYPE_SPEED = 32;
const OUTPUT_LINE_DELAY = 50;
const RESTART_DELAY = 4000;

export function TerminalDemo() {
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isAtBottom = useCallback(() => {
    const el = containerRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 30;
  }, []);

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      shouldAutoScrollRef.current = true;
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      setShowScrollIndicator(false);
    }
  }, []);

  const shouldAutoScrollRef = useRef(true);
  const maybeScrollRef = useRef<() => void>(() => {});

  const maybeScroll = useCallback(() => {
    requestAnimationFrame(() => {
      if (shouldAutoScrollRef.current) {
        scrollToBottom();
      } else {
        const el = containerRef.current;
        if (el) {
          const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 30;
          setShowScrollIndicator(!atBottom && el.scrollHeight > el.clientHeight);
        }
      }
    });
  }, [scrollToBottom]);

  useEffect(() => {
    maybeScrollRef.current = maybeScroll;
  }, [maybeScroll]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function handleScroll() {
      const atBottom = el!.scrollHeight - el!.scrollTop - el!.clientHeight < 30;
      if (atBottom) {
        shouldAutoScrollRef.current = true;
        setShowScrollIndicator(false);
      } else {
        shouldAutoScrollRef.current = false;
        setShowScrollIndicator(true);
      }
    }

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function sleep(ms: number) {
      return new Promise((r) => setTimeout(r, ms));
    }

    const scroll = () => maybeScrollRef.current();

    async function typeInput(text: string): Promise<void> {
      setIsTyping(true);
      for (let i = 0; i <= text.length; i++) {
        if (cancelled) return;
        setTypingText(text.slice(0, i));
        scroll();
        await sleep(TYPE_SPEED);
      }
      if (cancelled) return;
      setIsTyping(false);
      setTypingText('');
      setDisplayedLines((prev) => [...prev, { text, type: 'input' }]);
      scroll();
    }

    async function showOutputLines(lines: TerminalLine[]): Promise<void> {
      for (const line of lines) {
        if (cancelled) return;
        setDisplayedLines((prev) => [...prev, line]);
        scroll();
        await sleep(OUTPUT_LINE_DELAY);
      }
    }

    async function runAnimation() {
      while (!cancelled) {
        if (cancelled) return;
        setDisplayedLines([]);
        setTypingText('');
        shouldAutoScrollRef.current = true;
        setShowScrollIndicator(false);

        for (const step of steps) {
          if (cancelled) return;

          const preInputBlanks: TerminalLine[] = [];
          for (const line of step.lines) {
            if (line.type === 'input') break;
            preInputBlanks.push(line);
          }

          if (preInputBlanks.length > 0) {
            await showOutputLines(preInputBlanks);
          }

          const inputLines = step.lines.filter((l) => l.type === 'input');
          const fullInputText = inputLines.map((l) => l.text).join('\n');
          await typeInput(fullInputText);

          const afterInput = step.lines.slice(
            step.lines.findIndex((l) => l.type === 'input')
          );
          const outputAfterInput = afterInput.filter((l) => l.type !== 'input');
          await showOutputLines(outputAfterInput);

          if (cancelled) return;
          setDisplayedLines((prev) => [...prev, { text: '', type: 'blank' }]);
          scroll();

          await sleep(step.pauseAfter);
        }

        if (cancelled) return;
        await sleep(RESTART_DELAY);
      }
    }

    runAnimation();

    return () => {
      cancelled = true;
    };
  }, []);

  const lineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'input':
        return 'text-[var(--term-green)]';
      case 'output':
        return 'text-[var(--term-fg)]';
      case 'info':
        return 'text-[var(--term-cyan)]';
      case 'dim':
        return 'text-[var(--term-dim)]';
      case 'header':
        return 'text-[var(--term-yellow)] font-semibold';
      case 'blank':
        return '';
      default:
        return 'text-[var(--term-fg)]';
    }
  };

  return (
    <div className="terminal-window w-full rounded-xl border border-fd-border overflow-hidden shadow-lg relative">
      <div className="terminal-titlebar flex items-center gap-2 px-4 py-2.5 border-b border-fd-border bg-fd-card">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-fd-muted-foreground">
          apix — ~/projects
        </span>
      </div>
      <div
        ref={containerRef}
        className="terminal-body bg-(--term-bg) p-4 pb-10 font-mono text-xs sm:text-sm leading-relaxed overflow-y-auto h-[420px]"
      >
        {displayedLines.map((line, i) => (
          <div key={i} className={`${lineColor(line.type)} whitespace-pre`}>
            {line.type === 'blank' ? '\u00A0' : line.text}
          </div>
        ))}
        {isTyping && (
          <div className={`${lineColor('input')} whitespace-pre`}>
            {typingText}
            <span
              className={`inline-block w-[0.55em] h-[1.1em] bg-(--term-green) align-text-bottom ml-px ${
                cursorVisible ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        )}
        {!isTyping && (
          <div className="whitespace-pre">
            <span className="text-(--term-dim)">$</span>
            <span
              className={`inline-block w-[0.55em] h-[1.1em] bg-(--term-fg) align-text-bottom ml-1 ${
                cursorVisible ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        )}
      </div>
      {showScrollIndicator && (
        <button
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-(--term-dim) p-1.5 text-(--term-bg) hover:bg-(--term-fg) transition-colors cursor-pointer"
        >
          <ChevronDown className="size-4" />
        </button>
      )}
    </div>
  );
}
