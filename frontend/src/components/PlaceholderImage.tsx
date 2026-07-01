import { useLocale } from "../i18n/LocaleContext";

interface PlaceholderImageProps {
  className?: string;
  label?: string;
}

export default function PlaceholderImage({ className = "", label }: PlaceholderImageProps) {
  const { t } = useLocale();

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-border/60 text-text-muted ${className}`}
      role="img"
      aria-label={label ?? t.common.placeholder}
    >
      <svg
        className="h-8 w-8 opacity-60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span className="text-xs font-medium uppercase tracking-wide">
        {label ?? t.common.placeholder}
      </span>
    </div>
  );
}
