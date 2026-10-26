import { QRCodeSVG } from 'qrcode.react';
import { cn } from '../../lib/format';

interface QrPassProps {
  value: string;
  name: string;
  size?: number;
  showCode?: boolean;
  className?: string;
}

/** The patient's QR on its card. Used on the landing page and inside the app, so both tell the same story. */
export function QrPass({ value, name, size = 220, showCode = true, className }: QrPassProps) {
  return (
    <figure
      className={cn(
        'inline-flex flex-col gap-5 rounded-surface bg-surface p-6 shadow-[0_1px_0_rgb(255_255_255/0.7)_inset,0_0_0_1px_rgb(43_26_19/0.1),0_24px_48px_-24px_rgb(43_26_19/0.35)]',
        className,
      )}
    >
      <div className="rounded-control bg-white p-3">
        <QRCodeSVG value={value} size={size} level="H" fgColor="#2b1a13" bgColor="#ffffff" marginSize={0} role="img" aria-label={`QR code de ${name}`} />
      </div>
      <figcaption className="flex items-end justify-between gap-4">
        <span className="flex flex-col">
          <span className="text-small text-ink-3">Titulaire</span>
          <span className="font-display text-xl font-medium leading-tight">{name}</span>
        </span>
        {showCode && <span className="font-mono text-label tracking-wider text-ink-2">{value}</span>}
      </figcaption>
    </figure>
  );
}
