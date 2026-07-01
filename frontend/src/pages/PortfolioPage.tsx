import SectionHeading from "../components/SectionHeading";
import PortfolioCard from "../components/PortfolioCard";
import { useLocale } from "../i18n/LocaleContext";
import portfolio from "../data/portfolio.json";
import type { PortfolioProject } from "../types";

const portfolioList = portfolio as PortfolioProject[];

export default function PortfolioPage() {
  const { t } = useLocale();

  return (
    <div className="container-page py-16 sm:py-20">
      <SectionHeading title={t.portfolio.title} subtitle={t.portfolio.subtitle} />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {portfolioList.map((project) => (
          <PortfolioCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
