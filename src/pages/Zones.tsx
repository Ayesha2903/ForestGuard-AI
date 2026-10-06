import { useNavigate, useParams } from "react-router-dom";
import { ZONES } from "../data";
import DataTable from "../components/DataTable";
import FilterBar from "../components/FilterBar";
import StatusBadge from "../components/StatusBadge";
import MapPanel from "../components/MapPanel";
import LineChart from "../components/LineChart";
import EmptyState from "../components/EmptyState";

export function Zones() {
  const nav = useNavigate();
  return (
    <>
      <FilterBar>
        <input placeholder="Search zones" />
        <select><option>All statuses</option>{["Healthy", "Monitoring", "Change Detected", "Requires Verification"].map((s) => <option key={s}>{s}</option>)}</select>
      </FilterBar>
      <div className="card">
        <DataTable
          headers={["ID", "Name", "Area (ha)", "Cover", "Latest Survey", "Change", "AQI", "Status", "Officer"]}
          rows={ZONES.map((z) => [z.id, z.name, z.area, `${z.cover}%`, z.survey, `${z.change}%`, z.aqi, <StatusBadge label={z.status} />, z.officer])}
          onRowClick={(i) => nav(`/zones/${ZONES[i].id}`)}
        />
      </div>
    </>
  );
}

export function ZoneDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const z = ZONES.find((x) => x.id === id);
  if (!z) return <EmptyState text="Zone not found" />;
  return (
    <>
      <button className="s" onClick={() => nav("/zones")}>← Zones</button>
      <div className="row" style={{ marginTop: 10 }}><h2>{z.id} — {z.name}</h2><StatusBadge label={z.status} /></div>
      <div className="grid c21">
        <div className="card"><h3>Geographic Map</h3><MapPanel initial={z.id} /></div>
        <div className="card">
          <h3>Zone Information</h3>
          <div className="sub">Area {z.area} ha · Cover {z.cover}% · Officer {z.officer}<br />AQI {z.aqi} (sample)</div>
          <h3 style={{ marginTop: 12 }}>Forest-change trend</h3>
          <LineChart data={[0.1, 0.2, 0.2, z.change / 3, z.change / 2, z.change]} color="#d9a441" />
          <h3>Survey history</h3>
          <div className="sub">{z.survey} · 12 Aug · 28 Jun · 14 Apr</div>
          {z.change > 2 && <div className="warn" style={{ marginTop: 10 }}>AI DETECTED — HUMAN VERIFICATION REQUIRED</div>}
        </div>
      </div>
    </>
  );
}
