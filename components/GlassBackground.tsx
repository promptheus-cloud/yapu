// Seeded random for deterministic output (no layout shift between renders)
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

interface Panel {
  w: string;
  h: number;
  top: number;
  left?: string;
  right?: string;
}

function generatePanels(): Panel[] {
  const rand = seededRandom(42);
  const panels: Panel[] = [];
  const pageHeight = 3200;
  const count = 100;

  for (let i = 0; i < count; i++) {
    const side = i % 2 === 0 ? "left" : "right";

    // Width: 30-70vw
    const w = 30 + rand() * 40;

    // Height: 200-700px
    const h = 200 + rand() * 500;

    // Vertical position spread across page
    const top = rand() * pageHeight;

    // Edge bias: most panels start far off-screen, few reach center
    // Exponential distribution — heavily weighted toward edges
    const edgePush = 15 + rand() * rand() * 30;

    const pos = `-${edgePush.toFixed(0)}vw`;

    if (side === "left") {
      panels.push({ w: `${w.toFixed(0)}vw`, h: Math.round(h), top: Math.round(top), left: pos });
    } else {
      panels.push({ w: `${w.toFixed(0)}vw`, h: Math.round(h), top: Math.round(top), right: pos });
    }
  }

  return panels;
}

const panels = generatePanels();

export default function GlassBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <div
          key={i}
          className="glass-bg-panel absolute"
          style={{
            width: p.w,
            height: p.h,
            top: p.top,
            left: p.left,
            right: p.right,
          }}
        />
      ))}
    </div>
  );
}
