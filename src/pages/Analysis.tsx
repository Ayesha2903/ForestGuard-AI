import { useNavigate } from "react-router-dom";
import { useApp } from "../context";
import FlowBar from "../components/FlowBar";
import ForestImage from "../components/ForestImage";
import StatCard from "../components/StatCard";

const FIELDS: [string, string][] = [["Model", "YOLO"], ["Objects Detected", "1,248"], ["Avg Confidence", "91.4%"], ["Vegetation Coverage", "78.6%"], ["Est. Tree Count", "1,248"], ["Status", "Analysis Complete"]];

export function Analysis() {
  const nav = useNavigate();
  const { toast } = useApp();
  return (
    <>
      <FlowBar active={2} />
      <div className="grid c121">
        <div className="card"><h3>Uploaded Image</h3><ForestImage seed={7} loss /></div>
        <div className="card"><h3>YOLO Detections</h3><ForestImage seed={7} loss boxes /></div>
        <div className="card">
          <h3>AI Analysis</h3>
          {FIELDS.map(([k, v]) => <div key={k} className="row" style={{ justifyContent: "space-between", margin: "6px 0" }}><span className="sub">{k}</span><b>{v}</b></div>)}
          <div className="row">
            <button onClick={() => toast("Analyzing")}>Analyze Image</button>
            <button className="s" onClick={() => nav("/change")}>Compare Survey</button>
            <button className="s" onClick={() => toast("Alert generated")}>Generate Alert</button>
          </div>
          <div className="sub">Detections are not proof of illegal activity.</div>
        </div>
      </div>
    </>
  );
}

export function Change() {
  return (
    <>
      <FlowBar active={3} />
      <div className="row"><span className="b high">POTENTIAL FOREST CHANGE</span><span className="warn">AI RESULT — REQUIRES OFFICER VERIFICATION</span></div>
      <div className="grid c2">
        <div className="card"><h3>Previous Survey · 12 Aug</h3><ForestImage seed={7} /></div>
        <div className="card"><h3>Current Survey · 29 Sep</h3><ForestImage seed={7} loss boxes /></div>
      </div>
      <div className="grid c21" style={{ marginTop: 14 }}>
        <div className="card">
          <h3>Comparison</h3>
          <div className="grid c4">
            <StatCard label="Previous cover" value="82.4%" /><StatCard label="Current cover" value="74.0%" />
            <StatCard label="Detected reduction" value="8.4%" /><StatCard label="Confidence" value="93.2%" />
          </div>
        </div>
        <div className="card">
          <h3>Severity</h3>
          {["Low", "Medium", "High", "Critical"].map((s) => (
            <span key={s} className={`b ${s.toLowerCase()}`} style={s === "High" ? { outline: "2px solid var(--tx)", marginRight: 4 } : { opacity: 0.5, marginRight: 4 }}>{s}</span>
          ))}
          <h3 style={{ marginTop: 12 }}>Timeline</h3>
          <div className="sub">14 Apr 83.4% · 28 Jun 83.0% · 12 Aug 82.4% · 29 Sep 74.0%</div>
        </div>
      </div>
    </>
  );
}
