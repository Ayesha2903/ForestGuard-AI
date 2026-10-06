export default function EmptyState({ text }: { text: string }) {
  return <div className="card sub" style={{ textAlign: "center", padding: 30 }}>{text}</div>;
}
