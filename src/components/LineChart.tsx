export default function LineChart({ data, color = "#3f9a62", height = 70 }: { data: number[]; color?: string; height?: number }) {
  const w = 300, mx = Math.max(...data), mn = Math.min(...data);
  const pts = data.map((v, i) => `${(i * w) / (data.length - 1)},${height - 6 - ((v - mn) / (mx - mn || 1)) * (height - 14)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth="2" points={pts} />
    </svg>
  );
}
