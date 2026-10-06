import { badgeClass } from "../utils";
export default function StatusBadge({ label }: { label: string }) {
  return <span className={`b ${badgeClass(label)}`}>{label}</span>;
}
