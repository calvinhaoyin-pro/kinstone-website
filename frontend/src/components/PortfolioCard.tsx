import type { PortfolioProject } from "../types";
import { useLocale } from "../i18n/LocaleContext";
import Card from "./Card";
import PlaceholderImage from "./PlaceholderImage";

interface PortfolioCardProps {
  project: PortfolioProject;
}

export default function PortfolioCard({ project }: PortfolioCardProps) {
  const { locale } = useLocale();

  return (
    <Card>
      <PlaceholderImage className="aspect-[16/9] w-full" />
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-primary">{project.name[locale]}</h3>
          <span className="shrink-0 text-sm font-medium text-text-muted">{project.year}</span>
        </div>
        <p className="mt-1 text-sm font-medium text-accent">{project.location[locale]}</p>
        <p className="mt-2 text-sm text-text-muted">{project.description[locale]}</p>
      </div>
    </Card>
  );
}
