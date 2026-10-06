import type { ReactNode } from "react";
interface Props { headers: string[]; rows: ReactNode[][]; onRowClick?: (index: number) => void }
export default function DataTable({ headers, rows, onRowClick }: Props) {
  return (
    <div className="tw">
      <table>
        <thead><tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={onRowClick ? "k" : ""} onClick={() => onRowClick?.(i)}>
              {r.map((c, j) => <td key={j}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
