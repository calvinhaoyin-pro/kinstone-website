import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import SectionHeading from "../components/SectionHeading";
import ProductCard from "../components/ProductCard";
import PortfolioCard from "../components/PortfolioCard";
import { useLocale } from "../i18n/LocaleContext";
import products from "../data/products.json";
import portfolio from "../data/portfolio.json";
import type { Product, PortfolioProject } from "../types";

const productList = products as Product[];
const portfolioList = portfolio as PortfolioProject[];

export default function HomePage() {
  const { t } = useLocale();

  return (
    <div>
      <Hero
        eyebrow={t.home.hero.eyebrow}
        title={t.home.hero.title}
        subtitle={t.home.hero.subtitle}
      >
        <Link
          to="/products"
          className="bg-accent px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-light"
        >
          {t.home.hero.ctaPrimary}
        </Link>
        <Link
          to="/contact"
          className="border border-border px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-text transition-colors hover:border-text"
        >
          {t.home.hero.ctaSecondary}
        </Link>
      </Hero>

      <section className="border-b border-border py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading title={t.home.valueProps.title} align="center" />
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
            {t.home.valueProps.items.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-bg p-8"
              >
                <span className="label-mono text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface py-20 sm:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title={t.home.featuredProducts.title} />
            <Link
              to="/products"
              className="label-mono text-accent transition-colors hover:text-accent-light"
            >
              {t.home.featuredProducts.viewAll} →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productList.slice(0, 3).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="theme-light border-b border-border py-20 sm:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title={t.home.portfolioTeaser.title} />
            <Link
              to="/portfolio"
              className="label-mono text-accent transition-colors hover:text-accent-light"
            >
              {t.home.portfolioTeaser.viewAll} →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {portfolioList.slice(0, 2).map((project) => (
              <PortfolioCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]"
        />
        <div className="container-page relative flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            {t.home.ctaBanner.title}
          </h2>
          <p className="max-w-xl text-text-muted">{t.home.ctaBanner.subtitle}</p>
          <Link
            to="/contact"
            className="bg-accent px-7 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-light"
          >
            {t.home.ctaBanner.cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
