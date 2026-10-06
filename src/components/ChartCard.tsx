import type { ReactNode } from "react";
export default function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return <div className="card"><h3>{title}</h3>{children}</div>;
}
