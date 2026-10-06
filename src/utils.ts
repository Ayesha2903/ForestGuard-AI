import type { ZoneStatus } from "./data";
export const rnd = (seed: number) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
export const aqiCat = (v: number): [string, string] =>
  v <= 50 ? ["Good", "#3f9a62"] : v <= 100 ? ["Satisfactory", "#9cc65a"] : v <= 200 ? ["Moderately Polluted", "#d9a441"] : v <= 300 ? ["Poor", "#e08a4a"] : ["Very Poor", "#d4574b"];
const CLS: Record<string, string> = { "Requires Verification": "requires", "Change Detected": "change", "Under Review": "under" };
export const badgeClass = (s: string) => CLS[s] ?? s.toLowerCase().split(" ")[0];
const SC: Record<ZoneStatus, string> = { Healthy: "#2f7d4f", Monitoring: "#4aa3a0", "Change Detected": "#d9a441", "Requires Verification": "#d4574b" };
export const statusColor = (s: ZoneStatus) => SC[s];
