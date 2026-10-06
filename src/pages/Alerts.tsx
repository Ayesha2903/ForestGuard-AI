import { useNavigate, useParams } from "react-router-dom";
import { ALERTS } from "../data";
import { useApp } from "../context";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import FlowBar from "../components/FlowBar";
import ForestImage from "../components/ForestImage";

export function Alerts() {
  const nav = useNavigate();
  return (
    <div className="card">
      <h3>Alerts</h3>
      <DataTable
        headers={["ID", "Zone", "Type", "Severity", "Date", "AI Conf.", "Status", "Officer"]}
        rows={ALERTS.map((a) => [a.id, a.zone, a.type, <StatusBadge label={a.severity} />, a.date, a.conf ? `${a.conf}%` : "—", <StatusBadge label={a.status} />, a.officer])}
        onRowClick={(i) => nav(`/alerts/${ALERTS[i].id}`)}
      />
      <div className="warn" style={{ marginTop: 10 }}>AI DETECTED — HUMAN VERIFICATION REQUIRED (forest-change alerts)</div>
    </div>
  );
}

/** Officer verification panel. Buttons are UI-only. */
export function AlertDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { toast } = useApp();
  const a = ALERTS.find((x) => x.id === id) ?? ALERTS[0];
  return (
    <>
      <FlowBar active={5} />
      <button className="s" onClick={() => nav("/alerts")}>← Alerts</button>
      <div className="row" style={{ marginTop: 10 }}><h2>Verify {a.id} — Zone {a.zone}</h2><StatusBadge label={a.severity} /></div>
      <div className="warn" style={{ marginBottom: 12 }}>AI DETECTED — HUMAN VERIFICATION REQUIRED</div>
      <div className="grid c121">
        <div className="card"><h3>Previous Image</h3><ForestImage seed={7} /></div>
        <div className="card"><h3>Current Image · AI Detection</h3><ForestImage seed={7} loss boxes /></div>
        <div className="card"><h3>Details</h3><div className="sub">Survey SV-318 · Change 8.4% · Confidence {a.conf}%<br />GIS: 21.04°N, 79.12°E (demo)</div></div>
      </div>
      <div className="card" style={{ marginTop: 14 }}>
        <h3>Officer Observation</h3>
        <textarea rows={4} placeholder="Field observation..." />
        <div className="row" style={{ marginTop: 10 }}>
          <select><option>Verified</option><option>Rejected</option><option>Requires Field Inspection</option></select>
          <button onClick={() => toast("Change verified")}>Verify Change</button>
          <button className="d" onClick={() => toast("Detection rejected")}>Reject Detection</button>
          <button className="s" onClick={() => toast("Marked for inspection")}>Field Inspection</button>
          <button className="s" onClick={() => toast("Alert resolved")}>Resolve Alert</button>
        </div>
      </div>
    </>
  );
}
