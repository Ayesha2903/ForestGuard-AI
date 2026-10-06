const STEPS = ["Zone", "Survey", "YOLO", "Compare", "Alert", "Officer verifies", "Report"];
export default function FlowBar({ active }: { active: number }) {
  return <div className="flow">{STEPS.map((s, i) => <span key={s} className={i === active ? "on" : ""}>{s}</span>)}</div>;
}
