import { ZONES } from "../data";
import { aqiCat } from "../utils";
import AqiPanel from "../components/AqiPanel";
import LineChart from "../components/LineChart";
import StatusBadge from "../components/StatusBadge";

const CATS: [string, string][] = [["0–50", "Good"], ["51–100", "Satisfactory"], ["101–200", "Moderately Polluted"], ["201–300", "Poor"], ["301–400", "Very Poor"], ["401–500", "Severe"]];

export default function Aqi() {
  return (
    <div className="grid c21">
      <div className="card">
        <h3>Current Reading</h3><AqiPanel />
        <h3 style={{ marginTop: 12 }}>AQI trend (7 days)</h3>
        <LineChart data={[92, 101, 110, 98, 124, 118, 118]} color="#d9a441" height={90} />
      </div>
      <div className="card">
        <h3>Indian AQI Categories</h3>
        {CATS.map(([r, c]) => <div key={c} className="row" style={{ margin: "4px 0" }}><span className="sub" style={{ width: 60 }}>{r}</span><StatusBadge label={c} /></div>)}
        <h3 style={{ marginTop: 12 }}>By zone</h3>
        {ZONES.map((z) => <div key={z.id} className="row" style={{ justifyContent: "space-between", margin: "2px 0" }}><span>{z.id}</span><b style={{ color: aqiCat(z.aqi)[1] }}>{z.aqi}</b></div>)}
      </div>
    </div>
  );
}
