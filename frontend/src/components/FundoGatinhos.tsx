export default function FundoGatinhos() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="gatinhos-fofos" width="220" height="220" patternUnits="userSpaceOnUse">
            {/* rosto de gatinho */}
            <g fill="#B57AD4" opacity="0.42">
              <ellipse cx="48" cy="52" rx="22" ry="18" />
              <path d="M30 42 L34 22 L44 40 Z" />
              <path d="M66 42 L62 22 L52 40 Z" />
              <circle cx="40" cy="50" r="2.2" fill="#7B1FA2" opacity="0.55" />
              <circle cx="56" cy="50" r="2.2" fill="#7B1FA2" opacity="0.55" />
              <ellipse cx="48" cy="57" rx="3" ry="2" fill="#7B1FA2" opacity="0.4" />
            </g>

            {/* gatinho sentado */}
            <g fill="#C9A0E3" opacity="0.46" transform="translate(140 28)">
              <ellipse cx="24" cy="48" rx="16" ry="20" />
              <circle cx="24" cy="22" r="13" />
              <path d="M12 16 L15 2 L22 14 Z" />
              <path d="M36 16 L33 2 L26 14 Z" />
              <ellipse cx="10" cy="62" rx="7" ry="5" />
              <ellipse cx="38" cy="62" rx="7" ry="5" />
              <path d="M38 48 Q58 42 56 68" fill="none" stroke="#C9A0E3" strokeWidth="5" strokeLinecap="round" />
            </g>

            {/* patinhas */}
            <g fill="#B57AD4" opacity="0.34" transform="translate(20 140)">
              <circle cx="16" cy="10" r="6" />
              <circle cx="6" cy="4" r="3.2" />
              <circle cx="16" cy="1" r="3.2" />
              <circle cx="26" cy="4" r="3.2" />
            </g>
            <g fill="#C9A0E3" opacity="0.34" transform="translate(150 150) rotate(25)">
              <circle cx="16" cy="10" r="6" />
              <circle cx="6" cy="4" r="3.2" />
              <circle cx="16" cy="1" r="3.2" />
              <circle cx="26" cy="4" r="3.2" />
            </g>

            {/* gatinho deitado */}
            <g fill="#A56BC8" opacity="0.32" transform="translate(90 120)">
              <ellipse cx="36" cy="28" rx="28" ry="12" />
              <circle cx="12" cy="22" r="10" />
              <path d="M4 18 L6 8 L12 16 Z" />
              <path d="M20 18 L18 8 L12 16 Z" />
              <path d="M60 28 Q78 18 74 40" fill="none" stroke="#A56BC8" strokeWidth="4" strokeLinecap="round" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#E4C8F2" />
        <rect width="100%" height="100%" fill="url(#gatinhos-fofos)" />
      </svg>
    </div>
  );
}
