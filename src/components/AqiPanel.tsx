import { aqiCat } from "../utils";
const POLL: [string, number][] = [["PM2.5", 64], ["PM10", 118], ["NO2", 31], ["SO2", 12], ["O3", 44], ["CO", 1.1]];
export default function AqiPanel() {
  const v = 118, [cat, color] = aqiCat(v);
  return (
    <>
      <div className="row"><span className="demo">DEMO / SAMPLE DATA</span></div>
      <div className="big" style={{ color }}>{v} <span style={{ fontSize: 14 }}>{cat}</span></div>
      <div className="grid c3" style={{ gap: 6, marginTop: 8 }}>
        {POLL.map(([n, val]) => <div className="sub" key={n}>{n}<br /><b style={{ color: "var(--tx)" }}>{val}</b></div>)}
      </div>
    </>
  );
}
