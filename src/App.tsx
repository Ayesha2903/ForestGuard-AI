import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Zones, ZoneDetail } from "./pages/Zones";
import Surveys from "./pages/Surveys";
import { Analysis, Change } from "./pages/Analysis";
import MapPage from "./pages/MapPage";
import Aqi from "./pages/Aqi";
import { Alerts, AlertDetail } from "./pages/Alerts";
import { Reports, Trees, Officers, Settings } from "./pages/Misc";

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="zones" element={<Zones />} />
            <Route path="zones/:id" element={<ZoneDetail />} />
            <Route path="surveys" element={<Surveys />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="change" element={<Change />} />
            <Route path="map" element={<MapPage />} />
            <Route path="aqi" element={<Aqi />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="alerts/:id" element={<AlertDetail />} />
            <Route path="reports" element={<Reports />} />
            <Route path="trees" element={<Trees />} />
            <Route path="officers" element={<Officers />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
