/** Tx, the Gen-Z AI buddy: a little robot face that blinks, glows and looks at your cursor. */
export default function TxBot({ size = 34, className = '' }: { size?: number; className?: string }) {
  return (
    <svg className={'txbot ' + className} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="txbot-head" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dfe3ff" />
        </linearGradient>
        <linearGradient id="txbot-visor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#141a3a" />
          <stop offset="1" stopColor="#2a1f5e" />
        </linearGradient>
      </defs>
      <line x1="32" y1="6" x2="32" y2="14" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <circle className="txbot-ant" cx="32" cy="6" r="4.2" fill="#ffd27a" />
      <rect x="4" y="27" width="6" height="14" rx="3" fill="#c7cdff" />
      <rect x="54" y="27" width="6" height="14" rx="3" fill="#c7cdff" />
      <rect x="9" y="14" width="46" height="40" rx="15" fill="url(#txbot-head)" />
      <rect x="14" y="21" width="36" height="24" rx="11" fill="url(#txbot-visor)" />
      <g className="txbot-eyes">
        <ellipse className="txbot-eye" cx="25" cy="32" rx="4" ry="5" fill="#5ef0ff" />
        <ellipse className="txbot-eye" cx="39" cy="32" rx="4" ry="5" fill="#5ef0ff" />
        <circle cx="26.3" cy="30.3" r="1.3" fill="#fff" />
        <circle cx="40.3" cy="30.3" r="1.3" fill="#fff" />
      </g>
      <path className="txbot-smile" d="M27 39.5q5 4 10 0" stroke="#5ef0ff" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="17.5" cy="41" r="2.4" fill="#f472b6" opacity=".55" />
      <circle cx="46.5" cy="41" r="2.4" fill="#f472b6" opacity=".55" />
    </svg>
  );
}
