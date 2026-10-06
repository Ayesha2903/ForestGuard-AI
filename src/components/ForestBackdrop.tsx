import { useMemo } from "react";
import { rnd } from "../utils";

/** Placeholder drawn forest for the login screen. Replace with a real photo via the --photo CSS variable. */
function build(): string {
  const r = rnd(11), R = (a: number, b: number) => a + r() * (b - a);
  const tr = (n: number, w0: number, w1: number, c: string, op: number, f?: string) => {
    let t = `<g fill="${c}" opacity="${op}" ${f ? `filter="url(#${f})"` : ""}>`;
    for (let i = 0; i < n; i++) { const x = R(-40, 1600), w = R(w0, w1); t += `<polygon points="${x | 0},0 ${(x + w) | 0},0 ${(x + w * 0.88) | 0},900 ${(x + w * 0.12) | 0},900"/>`; }
    return t + "</g>";
  };
  const fo = (n: number, y0: number, y1: number, op: number) => {
    let t = `<g filter="url(#b3)" opacity="${op}">`;
    for (let i = 0; i < n; i++) t += `<circle cx="${R(0, 1600) | 0}" cy="${R(y0, y1) | 0}" r="${R(60, 170) | 0}" fill="hsl(${R(100, 140) | 0},${R(35, 55) | 0}%,${R(14, 30) | 0}%)"/>`;
    return t + "</g>";
  };
  let o = `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#35663f"/><stop offset=".55" stop-color="#173322"/><stop offset="1" stop-color="#07100a"/></linearGradient><radialGradient id="sn" cx=".68" cy="0" r=".75"><stop offset="0" stop-color="#f0e9b0" stop-opacity=".6"/><stop offset="1" stop-color="#f0e9b0" stop-opacity="0"/></radialGradient><filter id="b1" x="-20%" width="140%"><feGaussianBlur stdDeviation="9"/></filter><filter id="b2" x="-20%" width="140%"><feGaussianBlur stdDeviation="3.5"/></filter><filter id="b3"><feGaussianBlur stdDeviation="24"/></filter></defs><rect width="1600" height="900" fill="url(#sk)"/><rect width="1600" height="900" fill="url(#sn)"/>`;
  o += tr(30, 10, 22, "#244b31", 0.5, "b1") + fo(26, 0, 160, 0.8);
  o += `<g fill="#f3eec2" opacity=".09" filter="url(#b1)">${[0, 1, 2, 3, 4, 5].map((i) => `<polygon points="${820 + i * 110},0 ${900 + i * 110},0 ${620 + i * 140},900 ${470 + i * 140},900"/>`).join("")}</g>`;
  o += tr(14, 22, 40, "#132a1b", 0.75, "b2") + tr(6, 52, 92, "#060b08", 0.96) + fo(22, -20, 120, 0.9);
  return o + `<rect y="640" width="1600" height="260" fill="#0a1a10" opacity=".55" filter="url(#b3)"/></svg>`;
}
export default function ForestBackdrop() {
  const html = useMemo(build, []);
  return <div className="lbg" dangerouslySetInnerHTML={{ __html: html }} />;
}
