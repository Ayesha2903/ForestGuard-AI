export default function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="card">
      <div className="sub">{label}</div>
      <div className="big">{value}</div>
      <div className="sub">{sub}</div>
    </div>
  );
}
