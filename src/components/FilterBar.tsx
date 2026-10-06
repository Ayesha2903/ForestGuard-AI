import type { ReactNode } from "react";
export default function FilterBar({ children }: { children: ReactNode }) {
  return <div className="row">{children}</div>;
}
