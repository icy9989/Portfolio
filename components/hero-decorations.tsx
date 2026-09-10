import { Sparkle } from "lucide-react";

const decorations = [
  { left: "6%", top: "16%", size: 12 },
  { left: "29%", top: "10%", size: 9 },
  { left: "58%", top: "22%", size: 14 },
  { left: "91%", top: "14%", size: 11 },
  { left: "96%", top: "46%", size: 14 },
  { left: "4%", top: "56%", size: 10 },
  { left: "49%", top: "65%", size: 12 },
  { left: "18%", top: "88%", size: 13 },
  { left: "73%", top: "91%", size: 10 },
  { left: "90%", top: "77%", size: 12 },
];

export function HeroDecorations() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {decorations.map(({ left, top, size }, index) => (
        <span
          key={index}
          className="hero-decoration absolute"
          style={{ left, top, animationDelay: `${-index * 0.7}s` }}
        >
          <Sparkle className="hero-star dark:hidden" strokeWidth={1.5} style={{ width: size, height: size }} />
          <span className="hero-code hidden font-mono font-semibold dark:block" style={{ fontSize: size + 4 }}>{"</>"}</span>
        </span>
      ))}
    </div>
  );
}
