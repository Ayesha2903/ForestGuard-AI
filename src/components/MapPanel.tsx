import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CENTER, POLY, ZONES } from "../data";
import { aqiCat, statusColor } from "../utils";
import StatusBadge from "./StatusBadge";

const LAYERS: [string, string][] = [["z", "Forest Zones"], ["c", "Potential Forest Change"], ["a", "Alerts"], ["q", "AQI"], ["t", "Monitored Trees"]];
const LEG: [string, string][] = [["Good", "#3f9a62"], ["Satisfactory", "#9cc65a"], ["Moderately Polluted", "#d9a441"], ["Poor", "#e08a4a"], ["Very Poor", "#d4574b"], ["Severe", "#8a2a2a"]];

/** Schematic GIS panel. Swap for Leaflet + OpenStreetMap when the real map is wired in. */
export default function MapPanel({ initial }: { initial?: string }) {
  const nav = useNavigate();
  const [sel, setSel] = useState<string | undefined>(initial);
  const [lay, setLay] = useState<Record<string, boolean>>({ z: true, c: true, a: true, q: true, t: false });
  const z = ZONES.find((x) => x.id === sel);
  return (
    <>
      <div className="mapw">
        <svg viewBox="0 0 800 400">
          <rect width="800" height="400" fill="#0d1410" />
          <path d="M0 300 C200 250 300 350 520 280 S760 250 800 270" stroke="#1f4a5c" strokeWidth="10" fill="none" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <line key={i} x1="0" x2="800" y1={i * 50} y2={i * 50} stroke="#151d18" />)}
          {lay.z && ZONES.map((zn) => (
            <polygon key={zn.id} points={POLY[zn.id]} fill={statusColor(zn.status)} fillOpacity=".28"
              stroke={sel === zn.id ? "#fff" : statusColor(zn.status)} strokeWidth={sel === zn.id ? 3 : 1.5}
              style={{ cursor: "pointer" }} onClick={() => setSel(zn.id)} />
          ))}
          {ZONES.map((zn) => {
            const [cx, cy] = CENTER[zn.id];
            return (
              <g key={zn.id}>
                {lay.z && <text x={cx - 14} y={cy} fill="#ece7dc" fontSize="13" pointerEvents="none">{zn.id}</text>}
                {lay.c && zn.change > 2 && <rect x={cx - 20} y={cy + 10} width={zn.change * 4 + 20} height="30" fill="#d4574b" fillOpacity=".5" stroke="#e77c71" strokeDasharray="4 2" />}
                {lay.a && zn.change > 1 && <g><circle cx={cx + 30} cy={cy - 25} r="8" fill="#d4574b" stroke="#fff" /><text x={cx + 27} y={cy - 21} fontSize="11" fill="#fff">!</text></g>}
                {lay.q && <circle cx={cx - 40} cy={cy - 25} r="7" fill={aqiCat(zn.aqi)[1]} stroke="#000" />}
                {lay.t && <path d={`M${cx + 45} ${cy + 30}l5-10h-10z`} fill="#e6e0cf" />}
              </g>
            );
          })}
        </svg>
        <div className="ov">
          <b>Layers</b>
          {LAYERS.map(([k, n]) => (
            <label key={k}><input type="checkbox" checked={lay[k]} onChange={() => setLay({ ...lay, [k]: !lay[k] })} /> {n}</label>
          ))}
        </div>
      </div>
      <div className="leg">{LEG.map(([n, c]) => <span key={n}><i style={{ background: c }} />{n}</span>)}</div>
      {z && (
        <div className="card" style={{ marginTop: 10 }}>
          <b>{z.id} — {z.name}</b> <StatusBadge label={z.status} />
          <div className="sub">{z.area} ha · Cover {z.cover}% · Change {z.change}% · AQI {z.aqi} (sample)</div>
          <button className="s" onClick={() => nav(`/zones/${z.id}`)}>Open zone</button>
        </div>
      )}
    </>
  );
}
