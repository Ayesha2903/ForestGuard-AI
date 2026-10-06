import { useApp } from "../context";
import DataTable from "../components/DataTable";
import FilterBar from "../components/FilterBar";
import StatCard from "../components/StatCard";

export function Reports() {
  const { toast } = useApp();
  const dl = <button className="s" onClick={() => toast("Download")}>Download</button>;
  return (
    <>
      <div className="grid c4">
        <StatCard label="Forest Monitoring Reports" value={9} sub="This quarter" />
        <StatCard label="AI Analysis Reports" value={7} sub="This quarter" />
        <StatCard label="Forest Change Reports" value={5} sub="This quarter" />
        <StatCard label="AQI Reports" value={6} sub="This quarter" />
      </div>
      <div className="card" style={{ marginTop: 14 }}>
        <FilterBar><select><option>Last 30 days</option></select><select><option>All zones</option></select><button onClick={() => toast("Report generated")}>Generate Report</button></FilterBar>
        <DataTable headers={["ID", "Report", "Zone", "Date", "Action"]} rows={[
          ["RP-112", "Forest Change Report", "A03", "30 Sep", dl], ["RP-111", "AI Analysis Report", "B01", "27 Sep", dl], ["RP-110", "Officer Verification Report", "A02", "21 Sep", dl],
        ]} />
      </div>
    </>
  );
}

export function Trees() {
  const rows: string[][] = [
    ["T-001", "Teak", "A01", "21.04, 79.11", "Protected", "Healthy", "E200-3412", "▦"], ["T-014", "Sal", "B02", "21.01, 79.18", "Research", "Monitoring", "E200-3420", "▦"],
    ["T-027", "Neem", "A02", "21.06, 79.14", "Plantation", "Healthy", "E200-3433", "▦"], ["T-031", "Bamboo", "B01", "21.02, 79.16", "Special Monitoring", "Monitoring", "E200-3447", "▦"],
  ];
  return (
    <>
      <div className="sub" style={{ marginBottom: 10 }}>Selected monitored trees only — not every tree in the forest.</div>
      <div className="card"><DataTable headers={["Tree ID", "Species", "Zone", "Coordinates", "Type", "Health", "RFID", "QR"]} rows={rows} /></div>
    </>
  );
}

export function Officers() {
  return (
    <div className="card">
      <DataTable headers={["Name", "Email", "Zones", "Active Alerts", "Verification", "Last Activity"]} rows={[
        ["R. Mehta", "r.mehta@demo.test", "A01, A03", 2, "1 pending", "Today 09:12"], ["A. Khan", "a.khan@demo.test", "B01, B02", 1, "Up to date", "Yesterday"], ["S. Iyer", "s.iyer@demo.test", "A02", 1, "1 pending", "2 days ago"],
      ]} />
    </div>
  );
}

export function Settings() {
  return <div className="card"><h3>Settings</h3><div className="sub">Prototype placeholder.</div></div>;
}
