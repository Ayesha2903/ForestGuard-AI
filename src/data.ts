export type ZoneStatus = "Healthy" | "Monitoring" | "Change Detected" | "Requires Verification";
export interface Zone { id: string; name: string; area: number; cover: number; survey: string; change: number; aqi: number; status: ZoneStatus; officer: string }
export interface Alert { id: string; zone: string; type: string; severity: string; date: string; conf: number; status: string; officer: string }

export const ZONES: Zone[] = [
  { id: "A01", name: "North Forest", area: 412, cover: 84.1, survey: "28 Sep 2026", change: 0.4, aqi: 62, status: "Healthy", officer: "R. Mehta" },
  { id: "A02", name: "East Forest", area: 365, cover: 81.7, survey: "27 Sep 2026", change: 1.2, aqi: 74, status: "Monitoring", officer: "S. Iyer" },
  { id: "A03", name: "Central Forest", area: 520, cover: 74.0, survey: "29 Sep 2026", change: 8.4, aqi: 118, status: "Requires Verification", officer: "R. Mehta" },
  { id: "B01", name: "Riverside Forest", area: 298, cover: 79.3, survey: "26 Sep 2026", change: 3.1, aqi: 96, status: "Change Detected", officer: "A. Khan" },
  { id: "B02", name: "Hill Forest", area: 447, cover: 86.5, survey: "25 Sep 2026", change: 0.2, aqi: 48, status: "Healthy", officer: "A. Khan" },
];
export const POLY: Record<string, string> = {
  A01: "60,40 260,30 300,150 150,190 50,140", A02: "270,30 470,50 480,170 310,160",
  A03: "160,200 310,170 490,185 470,330 230,350 140,290", B01: "490,60 740,40 760,190 500,175", B02: "510,200 760,205 740,370 490,340",
};
export const CENTER: Record<string, [number, number]> = { A01: [160, 110], A02: [380, 100], A03: [320, 270], B01: [620, 120], B02: [620, 280] };
export const ALERTS: Alert[] = [
  { id: "AL-2041", zone: "A03", type: "Potential Forest Change", severity: "High", date: "29 Sep 2026", conf: 93.2, status: "New", officer: "R. Mehta" },
  { id: "AL-2040", zone: "B01", type: "Vegetation Reduction", severity: "Medium", date: "26 Sep 2026", conf: 88.7, status: "Under Review", officer: "A. Khan" },
  { id: "AL-2038", zone: "A03", type: "AI Detection Review", severity: "High", date: "24 Sep 2026", conf: 91.0, status: "New", officer: "R. Mehta" },
  { id: "AL-2035", zone: "A02", type: "AQI Alert", severity: "Medium", date: "23 Sep 2026", conf: 0, status: "Under Review", officer: "S. Iyer" },
  { id: "AL-2031", zone: "B02", type: "Survey Required", severity: "Low", date: "20 Sep 2026", conf: 0, status: "Resolved", officer: "A. Khan" },
  { id: "AL-2027", zone: "A02", type: "Potential Forest Change", severity: "Low", date: "18 Sep 2026", conf: 84.5, status: "Rejected", officer: "S. Iyer" },
];
export const NAV: [string, string][] = [
  ["dashboard", "Dashboard"], ["zones", "Forest Zones"], ["surveys", "Forest Surveys"], ["analysis", "AI Analysis"], ["change", "Forest Change"],
  ["map", "GIS Map"], ["aqi", "AQI & Environment"], ["alerts", "Alerts"], ["reports", "Reports"], ["trees", "Monitored Trees"], ["officers", "Officers"], ["settings", "Settings"],
];
