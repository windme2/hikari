export default function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path d="M1 7h11M7.5 2.5 12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
