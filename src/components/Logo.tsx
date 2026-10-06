export default function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M4 20C4 11 10 4 21 4c0 10-6 16-15 16z" fill="#3f9a62" />
      <path d="M4 20L15 9" stroke="#0b1a10" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}
