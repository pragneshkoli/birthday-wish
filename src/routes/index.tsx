import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday Palak 💖" },
      { name: "description", content: "A little surprise made with love, just for Palak." },
      { property: "og:title", content: "Happy Birthday Palak 💖" },
      { property: "og:description", content: "A little surprise made with love, just for Palak." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const REASONS = [
  "Your smile makes my whole day 🌸",
  "You laugh at my terrible jokes 😂",
  "You make ordinary days feel magical ✨",
  "You're the first person I want to talk to 🌷",
  "Home is wherever you are 🏡",
  "You believe in me, always 💪",
];

const BALLOON_COLORS = ["oklch(0.72 0.19 355)", "oklch(0.86 0.14 85)", "oklch(0.75 0.15 20)", "oklch(0.8 0.12 300)", "oklch(0.8 0.13 200)"];

/* ---------- Fireworks canvas ---------- */
function Fireworks({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!active) return;
    const c = ref.current!; const ctx = c.getContext("2d")!;
    let w = (c.width = innerWidth), h = (c.height = innerHeight);
    const onR = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    addEventListener("resize", onR);
    type P = { x: number; y: number; vx: number; vy: number; life: number; hue: number };
    let ps: P[] = [];
    const burst = (x: number, y: number) => {
      const hue = Math.random() * 360;
      for (let i = 0; i < 70; i++) {
        const a = Math.random() * Math.PI * 2, s = Math.random() * 5 + 1;
        ps.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, hue: hue + Math.random() * 40 });
      }
    };
    const iv = setInterval(() => burst(Math.random() * w, Math.random() * h * 0.5 + 40), 700);
    let raf = 0;
    const loop = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ps = ps.filter((p) => p.life > 0);
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.life -= 0.012;
        ctx.fillStyle = `hsla(${p.hue},100%,65%,${p.life})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, 7); ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { clearInterval(iv); cancelAnimationFrame(raf); removeEventListener("resize", onR); };
  }, [active]);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" />;
}

/* ---------- Confetti ---------- */
function Confetti() {
  const [pieces] = useState(() => Array.from({ length: 80 }, (_, i) => ({
    left: Math.random() * 100, delay: Math.random() * 3, dur: 3 + Math.random() * 3,
    color: BALLOON_COLORS[i % BALLOON_COLORS.length], size: 6 + Math.random() * 6,
  })));
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {pieces.map((p, i) => (
        <span key={i} className="absolute top-0 rounded-sm" style={{
          left: `${p.left}%`, width: p.size, height: p.size * 0.5, background: p.color,
          animation: `floatUp ${p.dur}s linear ${p.delay}s infinite reverse`,
        }} />
      ))}
    </div>
  );
}

/* ---------- Balloons ---------- */
function Balloons() {
  const [items, setItems] = useState(() => Array.from({ length: 14 }, (_, i) => ({
    id: i, left: Math.random() * 92, dur: 9 + Math.random() * 8, delay: Math.random() * 8,
    color: BALLOON_COLORS[i % BALLOON_COLORS.length], popped: false,
  })));
  const pop = (id: number) => setItems((s) => s.map((b) => (b.id === id ? { ...b, popped: true } : b)));
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {items.map((b) => !b.popped && (
        <button key={b.id} onClick={() => pop(b.id)} aria-label="Pop balloon"
          className="animate-float-up pointer-events-auto absolute bottom-0"
          style={{ left: `${b.left}%`, animationDuration: `${b.dur}s`, animationDelay: `-${b.delay}s` }}>
          <div className="h-16 w-12 rounded-[50%]" style={{ background: `radial-gradient(circle at 30% 30%, oklch(1 0 0 / .6), ${b.color} 40%)` }} />
          <div className="mx-auto h-14 w-px bg-foreground/40" />
        </button>
      ))}
    </div>
  );
}

function Stars() {
  const [s] = useState(() => Array.from({ length: 60 }, () => ({ l: Math.random() * 100, t: Math.random() * 100, d: Math.random() * 3 })));
  return <div className="pointer-events-none fixed inset-0">{s.map((x, i) => (
    <span key={i} className="animate-twinkle absolute h-1 w-1 rounded-full bg-foreground" style={{ left: `${x.l}%`, top: `${x.t}%`, animationDelay: `${x.d}s` }} />
  ))}</div>;
}

/* ---------- Cake ---------- */
function Cake({ onBlown }: { onBlown: () => void }) {
  const [lit, setLit] = useState([true, true, true, true, true]);
  const blow = (i: number) => {
    const n = lit.map((v, j) => (j === i ? false : v));
    setLit(n);
    if (n.every((v) => !v)) setTimeout(onBlown, 400);
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4">
        {lit.map((on, i) => (
          <button key={i} onClick={() => blow(i)} className="flex flex-col items-center" aria-label="Blow candle">
            <div className={`h-6 w-3 rounded-full ${on ? "animate-flicker bg-gold shadow-[0_0_18px_6px_var(--gold)]" : "opacity-0"}`} />
            <div className="h-10 w-2.5 rounded-sm bg-[repeating-linear-gradient(45deg,var(--primary)_0_4px,var(--foreground)_4px_8px)]" />
          </button>
        ))}
      </div>
      <div className="h-16 w-64 rounded-t-2xl bg-primary shadow-lg relative">
        <div className="absolute inset-x-0 top-0 h-5 rounded-t-2xl bg-foreground/90" style={{ clipPath: "polygon(0 0,100% 0,100% 60%,90% 100%,80% 60%,70% 100%,60% 60%,50% 100%,40% 60%,30% 100%,20% 60%,10% 100%,0 60%)" }} />
      </div>
      <div className="h-16 w-80 rounded-t-xl bg-accent flex items-center justify-center font-display text-2xl text-background">Palak</div>
      <div className="h-3 w-96 max-w-[90vw] rounded-full bg-foreground/80" />
      <p className="mt-4 text-sm text-muted-foreground">Tap each candle to blow it out & make a wish 🕯️</p>
    </div>
  );
}

/* ---------- Typewriter ---------- */
function Typewriter({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => { if (n < text.length) { const t = setTimeout(() => setN(n + 1), 45); return () => clearTimeout(t); } return undefined; }, [n, text]);
  return <p className="whitespace-pre-line text-lg leading-relaxed">{text.slice(0, n)}<span className="animate-twinkle">|</span></p>;
}

const LETTER = `My dearest Palak,

Of all the days I've ever had, the ones with you are my favourites.

Thank you for every smile, every hug, every late-night talk. You make my life brighter than the stars.

Here's to another year of us. I love you endlessly. 💖

— Yours forever, Pragnesh`;

function Index() {
  const [stage, setStage] = useState(0); // 0 intro,1 cake,2 party
  const [flipped, setFlipped] = useState<number[]>([]);
  const [letter, setLetter] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const spawnHeart = (e: React.MouseEvent) => {
    const id = Date.now() + Math.random();
    setHearts((h) => [...h, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setHearts((h) => h.filter((x) => x.id !== id)), 1000);
  };

  const reset = () => {
    setStage(0);
    setFlipped([]);
    setLetter(false);
    setHearts([]);
    scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main onClick={spawnHeart} className="relative min-h-screen">
      <Stars />
      <Fireworks active={stage === 2} />
      {stage >= 1 && <Balloons />}
      {stage === 2 && <Confetti />}
      {hearts.map((h) => (
        <span key={h.id} className="pointer-events-none fixed z-50 text-2xl animate-pop" style={{ left: h.x - 12, top: h.y - 12 }}>💖</span>
      ))}

      {stage > 0 && (
        <button onClick={(e) => { e.stopPropagation(); reset(); }} aria-label="Replay from the beginning"
          className="glass fixed right-4 top-4 z-40 rounded-full px-4 py-2 text-sm font-semibold transition hover:scale-105">
          🔄 Replay
        </button>
      )}

      {stage === 0 && (
        <section className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="animate-heartbeat text-7xl">🎁</div>
          <h1 className="animate-fade-up mt-6 font-display text-5xl text-glow md:text-7xl">Hey Palak…</h1>
          <p className="animate-fade-up mt-4 max-w-md text-muted-foreground" style={{ animationDelay: ".4s" }}>
            Someone who loves you very much made something special. Ready?
          </p>
          <button onClick={(e) => { e.stopPropagation(); setStage(1); }}
            className="animate-fade-up mt-10 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-[0_0_30px_var(--primary)] transition hover:scale-105"
            style={{ animationDelay: ".8s" }}>
            Open your surprise 💌
          </button>
        </section>
      )}

      {stage === 1 && (
        <section className="relative z-20 flex min-h-screen flex-col items-center justify-center gap-10 px-6 text-center">
          <h2 className="animate-fade-up font-display text-4xl md:text-6xl">Make a wish, my love ✨</h2>
          <div className="animate-pop"><Cake onBlown={() => setStage(2)} /></div>
        </section>
      )}

      {stage === 2 && (
        <div className="relative z-20 px-6 pb-24">
          <section className="flex min-h-screen flex-col items-center justify-center text-center">
            <p className="animate-fade-up text-xl text-muted-foreground">🎉 Yay! Your wish is on its way 🎉</p>
            <h1 className="animate-pop mt-4 font-display text-6xl text-glow md:text-8xl">Happy Birthday<br />Palak!</h1>
            <p className="animate-fade-up mt-6 max-w-lg text-lg" style={{ animationDelay: ".6s" }}>
              To the girl who turns my ordinary days into something worth celebrating ❤️
            </p>
            <p className="mt-12 animate-twinkle text-sm text-muted-foreground">scroll down ↓ · pop the balloons · tap anywhere</p>
          </section>

          <section className="mx-auto max-w-4xl py-16 text-center">
            <h2 className="font-display text-4xl md:text-5xl">Reasons I love you</h2>
            <p className="mt-2 text-muted-foreground">Tap a card to reveal 💝</p>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
              {REASONS.map((r, i) => {
                const open = flipped.includes(i);
                return (
                  <button key={i} onClick={(e) => { e.stopPropagation(); setFlipped((f) => open ? f.filter((x) => x !== i) : [...f, i]); }}
                    className="glass flex h-36 items-center justify-center rounded-2xl p-4 transition hover:scale-105">
                    {open ? <span className="animate-pop font-semibold">{r}</span> : <span className="animate-heartbeat text-4xl">💗</span>}
                  </button>
                );
              })}
            </div>
            {flipped.length === REASONS.length && (
              <p className="animate-pop mt-8 font-display text-3xl text-gold">…and a million more reasons 🥰</p>
            )}
          </section>

          <section className="mx-auto max-w-2xl py-16 text-center">
            <h2 className="font-display text-4xl md:text-5xl">A letter for you</h2>
            {!letter ? (
              <button onClick={(e) => { e.stopPropagation(); setLetter(true); }} className="mt-8 animate-heartbeat text-8xl" aria-label="Open letter">💌</button>
            ) : (
              <div className="glass animate-pop mt-8 rounded-3xl p-8 text-left"><Typewriter text={LETTER} /></div>
            )}
          </section>

          <section className="py-16 text-center">
            <button onClick={(e) => { e.stopPropagation(); reset(); }}
              className="rounded-full border px-6 py-3 transition hover:bg-card">Celebrate again 🎂</button>
          </section>
        </div>
      )}
    </main>
  );
}
