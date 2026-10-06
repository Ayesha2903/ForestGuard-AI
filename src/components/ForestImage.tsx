import { useMemo, type ReactElement } from "react";
import { rnd } from "../utils";
interface Props { seed: number; loss?: boolean; boxes?: boolean }
/** Mock forest image with optional YOLO-style boxes (visual only, no real detection). */
export default function ForestImage({ seed, loss = false, boxes = false }: Props) {
  const els = useMemo(() => {
    const r = rnd(seed);
    const out: ReactElement[] = [];
    for (let i = 0; i < 190; i++) {
      const x = r() * 400, y = r() * 260;
      if (loss && x > 230 && x < 340 && y > 70 && y < 170 && r() < 0.85) continue;
      out.push(<circle key={"c" + i} cx={Math.floor(x)} cy={Math.floor(y)} r={5 + Math.floor(r() * 7)}
        fill={`hsl(${120 + Math.floor(r() * 30)},${35 + Math.floor(r() * 20)}%,${14 + Math.floor(r() * 14)}%)`} />);
    }
    if (boxes) {
      for (let i = 0; i < 34; i++) {
        const x = r() * 370, y = r() * 230, w = 18 + r() * 16;
        out.push(<rect key={"b" + i} x={Math.floor(x)} y={Math.floor(y)} width={Math.floor(w)} height={Math.floor(w)} fill="none" stroke={i % 7 ? "#6fe39a" : "#e0b458"} strokeWidth="1" />);
      }
    }
    return out;
  }, [seed, loss, boxes]);
  return (
    <svg viewBox="0 0 400 260">
      <rect width="400" height="260" fill="#0f2417" />
      {els.filter((e) => String(e.key).startsWith("c"))}
      {loss && <rect x="230" y="70" width="110" height="100" fill="#5a4a35" opacity=".45" />}
      {els.filter((e) => String(e.key).startsWith("b"))}
      {loss && boxes && (
        <>
          <rect x="230" y="70" width="110" height="100" fill="none" stroke="#e77c71" strokeWidth="2" strokeDasharray="5 3" />
          <text x="234" y="64" fill="#e77c71" fontSize="10">potential change</text>
        </>
      )}
    </svg>
  );
}
