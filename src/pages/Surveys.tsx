import { useNavigate } from "react-router-dom";
import { useApp } from "../context";
import { ZONES } from "../data";
import DataTable from "../components/DataTable";

export default function Surveys() {
  const nav = useNavigate();
  const { toast } = useApp();
  return (
    <div className="grid c21">
      <div className="card">
        <h3>Surveys</h3>
        <DataTable
          headers={["ID", "Zone", "Date", "Source", "Cover", "Veg %", "Est. Trees", "Model", "Conf.", "Status"]}
          rows={[
            ["SV-318", "A03", "29 Sep", "Aerial image", "74.0%", "78.6", "1,248", "YOLO", "91.4%", "Complete"],
            ["SV-317", "B01", "26 Sep", "Satellite", "79.3%", "80.1", "1,094", "YOLO", "89.8%", "Complete"],
            ["SV-316", "A02", "27 Sep", "Aerial image", "81.7%", "83.0", "1,310", "YOLO", "90.2%", "Processing"],
          ]}
          onRowClick={() => nav("/analysis")}
        />
      </div>
      <div className="card">
        <h3>Upload Survey</h3>
        <div style={{ border: "1px dashed var(--g)", borderRadius: 8, padding: 26, textAlign: "center", color: "var(--mu)" }}>Drop forest image / imagery file</div>
        <label className="sub">Zone</label>
        <select>{ZONES.map((z) => <option key={z.id}>{z.id} — {z.name}</option>)}</select>
        <label className="sub">Survey date</label>
        <select><option>06 Oct 2026</option></select>
        <br /><br />
        <button onClick={() => toast("Upload simulated")}>Upload Survey</button>
      </div>
    </div>
  );
}
