import FilterBar from "../components/FilterBar";
import MapPanel from "../components/MapPanel";
export default function MapPage() {
  return (
    <div className="card">
      <h3>GIS Monitoring Map</h3>
      <FilterBar><input placeholder="Search location" /><select><option>All zones</option></select></FilterBar>
      <MapPanel />
      <div className="sub">Schematic map — Leaflet + OpenStreetMap in the full build.</div>
    </div>
  );
}
