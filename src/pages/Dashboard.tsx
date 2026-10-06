import { useNavigate } from "react-router-dom";
import { ALERTS, ZONES } from "../data";
import { useApp } from "../context";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import LineChart from "../components/LineChart";
import FlowBar from "../components/FlowBar";
import MapPanel from "../components/MapPanel";
import AqiPanel from "../components/AqiPanel";
import StatusBadge from "../components/StatusBadge";

const CHANGES: [string, string, string][] = [["A03", "8.4%", "High"], ["B01", "3.1%", "Medium"], ["A02", "1.2%", "Low"]];

function AdminDash() {
  return (
    <>
      <FlowBar active={3} />
      <div className="grid c4">
        <StatCard label="Total Forest Zones" value={5} sub="2,042 ha monitored" />
        <StatCard label="Active Surveys" value={3} sub="2 in processing" />
        <StatCard label="AI Alerts" value={4} sub="3 new" />
        <StatCard label="Pending Verification" value={3} sub="Officer action" />
      </div>
      <div className="grid c21" style={{ marginTop: 14 }}>
        <ChartCard title="GIS Forest Monitoring Map"><MapPanel /></ChartCard>
        <div className="grid">
          <ChartCard title="Potential Forest Change">
            {CHANGES.map(([z, p, s]) => (
              <div key={z} className="row" style={{ justifyContent: "space-between", margin: "6px 0" }}>
                <span>Zone {z} — {p} vegetation reduction</span><StatusBadge label={s} />
              </div>
            ))}
            <div className="warn">Requires Officer Verification</div>
          </ChartCard>
          <ChartCard title="AQI & Environment"><AqiPanel /></ChartCard>
        </div>
      </div>
      <div className="grid c3" style={{ marginTop: 14 }}>
        <ChartCard title="Forest Cover Overview">
          <div className="big">81.2%</div><div className="sub">Previous 83.0% → Current 81.2%</div>
          <LineChart data={[83.4, 83.0, 82.6, 82.4, 81.9, 81.2]} />
        </ChartCard>
        <ChartCard title="AI Detection Summary">
          <div className="grid c2" style={{ gap: 6 }}>
            {([["486", "Images analyzed"], ["6,912", "Detections"], ["91.4%", "Avg confidence"], ["3", "Zones to review"]] as const).map(([v, l]) => (
              <div key={l}><div className="big">{v}</div><div className="sub">{l}</div></div>
            ))}
          </div>
        </ChartCard>
        <ChartCard title="Vegetation Trend by Zone">
          {ZONES.map((z) => (<div key={z.id}><div className="sub">{z.id} {z.cover}%</div><div className="bar"><i style={{ width: `${z.cover}%` }} /></div></div>))}
        </ChartCard>
      </div>
    </>
  );
}

function OfficerDash() {
  const nav = useNavigate();
  return (
    <>
      <div className="warn" style={{ marginBottom: 14, background: "var(--p)", borderColor: "var(--bd)", color: "var(--mu)" }}>REVIEW → VERIFY → RESPOND</div>
      <div className="grid c4">
        <StatCard label="My Assigned Zones" value={2} sub="A01, A03" />
        <StatCard label="Pending AI Alerts" value={2} sub="Require verification" />
        <StatCard label="Surveys to Review" value={1} />
        <StatCard label="AQI Alerts" value={1} sub="sample data" />
      </div>
      <div className="grid c21" style={{ marginTop: 14 }}>
        <ChartCard title="GIS Map — My Zones"><MapPanel /></ChartCard>
        <ChartCard title="Pending Alerts">
          {ALERTS.slice(0, 3).map((a) => (
            <div key={a.id} style={{ marginBottom: 10 }}>
              <b>{a.id}</b> · {a.zone} <StatusBadge label={a.severity} />
              <div className="warn" style={{ margin: "6px 0" }}>AI DETECTED — HUMAN VERIFICATION REQUIRED</div>
              <button onClick={() => nav(`/alerts/${a.id}`)}>Review</button>
            </div>
          ))}
          <h3 style={{ marginTop: 14 }}>Recent Field Observations</h3>
          <div className="sub">28 Sep — A01: canopy intact, no felling signs.<br />24 Sep — A03: partial clearing near trail, photos logged.</div>
        </ChartCard>
      </div>
    </>
  );
}

export default function Dashboard() {
  return useApp().role === "Officer" ? <OfficerDash /> : <AdminDash />;
}
