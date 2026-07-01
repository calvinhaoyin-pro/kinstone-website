import { useLocale } from "../i18n/LocaleContext";
import type { Locale } from "../types";

const OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "zh", label: "中文" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center rounded-full border border-border bg-surface p-0.5 text-sm font-medium">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setLocale(option.value)}
          aria-pressed={locale === option.value}
          className={`rounded-full px-3 py-1 transition-colors ${
            locale === option.value
              ? "bg-primary text-white"
              : "text-text-muted hover:text-primary"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
