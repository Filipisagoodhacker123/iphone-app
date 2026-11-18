import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

/** Thin iOS-style back chevron. */
export function BackChevron(props: P) {
  return (
    <svg viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M10.2 1.6 1.8 10l8.4 8.4" />
    </svg>
  );
}

/** Generic stacked-cards wallet icon. */
export function WalletCardsIcon(props: P) {
  return (
    <svg viewBox="0 0 38 27" aria-hidden {...props}>
      <rect x="0" y="0" width="38" height="27" rx="4.5" className="fill-muted-foreground" />
      <rect x="3" y="3" width="32" height="5" rx="1.5" className="fill-doc-blue" />
      <rect x="3" y="6.5" width="32" height="5" rx="1.5" className="fill-chart-2" />
      <rect x="3" y="10" width="32" height="5" rx="1.5" className="fill-chart-4" />
      <rect x="3" y="13.5" width="32" height="5" rx="1.5" className="fill-doc-coral" />
      <path d="M0 16.5h11.5c1.6 0 2.4 3.5 7.5 3.5s5.9-3.5 7.5-3.5H38V22.5a4.5 4.5 0 0 1-4.5 4.5h-29A4.5 4.5 0 0 1 0 22.5z" className="fill-doc-avatar" />
    </svg>
  );
}

/** Outlined document with a PDF badge. */
export function PdfDocIcon(props: P) {
  return (
    <svg viewBox="0 0 20 27" fill="none" aria-hidden {...props}>
      <path d="M4 1h9.5L19 6.5V26H4z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M13.5 1v5.5H19" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
      <rect x="0.5" y="15" width="11" height="6" rx="0.8" fill="currentColor" />
      <text x="6" y="19.6" textAnchor="middle" fontSize="4.6" fontWeight="700" fontFamily="Roboto, sans-serif" className="fill-doc-paper">
        PDF
      </text>
    </svg>
  );
}

const modules: [number, number, number?, number?][] = [
  [8, 0], [10, 0, 2], [9, 2], [12, 2], [8, 4, 2], [11, 4], [10, 6],
  [0, 8, 2], [3, 8], [5, 8, 3], [9, 8], [11, 8, 2], [14, 8], [16, 8, 2], [19, 8, 2],
  [1, 10], [4, 10, 2], [8, 10, 2], [13, 10], [15, 10, 3], [20, 10],
  [0, 12, 3], [6, 12], [9, 12], [11, 12, 3], [17, 12], [19, 12],
  [8, 14], [10, 14, 2], [14, 14, 2], [18, 14, 3],
  [9, 16, 3], [13, 16], [16, 16], [19, 16],
  [8, 18, 2], [12, 18, 2], [15, 18, 3], [20, 18],
  [10, 20], [13, 20], [17, 20, 2], [20, 20],
];

function QrModules() {
  return (
    <>
      {(
        [
          [0, 0],
          [14, 0],
          [0, 14],
        ] as const
      ).map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <path d={`M${x} ${y}h7v7h-7z M${x + 1} ${y + 1}v5h5v-5z`} fillRule="evenodd" />
          <rect x={x + 2} y={y + 2} width="3" height="3" />
        </g>
      ))}
      {modules.map(([x, y, w = 1, h = 1]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} />
      ))}
    </>
  );
}

/** Solid pixel-style QR glyph: square modules with three finder patterns. */
export function QrSolidIcon(props: P) {
  return (
    <svg viewBox="0 0 21 21" fill="currentColor" shapeRendering="crispEdges" aria-hidden {...props}>
      <QrModules />
    </svg>
  );
}

/** QR code inside scan-frame corners. */
export function QrScanIcon(props: P) {
  return (
    <svg viewBox="0 0 30 30" fill="none" aria-hidden {...props}>
      <path d="M1 8V3a2 2 0 0 1 2-2h5M22 1h5a2 2 0 0 1 2 2v5M29 22v5a2 2 0 0 1-2 2h-5M8 29H3a2 2 0 0 1-2-2v-5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
      <g transform="translate(7.5 7.5) scale(0.714)" fill="currentColor" shapeRendering="crispEdges">
        <QrModules />
      </g>
    </svg>
  );
}

/** Decorative outlined fingerprint for the security-check screen. */
export function FingerprintIcon(props: P) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" aria-hidden {...props}>
      <path d="M8 26a26 26 0 0 1 46-12" />
      <path d="M57 21a26 26 0 0 1 2 10" />
      <path d="M13 44c-2-4-3-9-2-14a21 21 0 0 1 40-6" />
      <path d="M53 31c1 5 0 10-1 14" />
      <path d="M20 51c-2-5-3-10-2-16a14 14 0 0 1 27-3" />
      <path d="M46 37c0 6-1 12-3 17" />
      <path d="M27 57c-2-6-3-12-2-19a7 7 0 0 1 14 0c0 7-1 13-3 19" />
      <path d="M32 40c0 8-1 15-3 21" />
    </svg>
  );
}

/** Decorative face-scan glyph: scan-frame corners around a simple face. */
export function FaceScanIcon(props: P) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M3 18V10a7 7 0 0 1 7-7h8M46 3h8a7 7 0 0 1 7 7v8M61 46v8a7 7 0 0 1-7 7h-8M18 61h-8a7 7 0 0 1-7-7v-8" />
      <path d="M22 23v6M42 23v6" />
      <path d="M32 23v12c0 2-1 3-3.5 3" />
      <path d="M23 45c5 4.5 13 4.5 18 0" />
    </svg>
  );
}
