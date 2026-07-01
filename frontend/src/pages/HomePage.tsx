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
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
        >
          {t.home.hero.ctaPrimary}
        </Link>
        <Link
          to="/contact"
          className="rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary"
        >
          {t.home.hero.ctaSecondary}
        </Link>
      </Hero>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading title={t.home.valueProps.title} align="center" />
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {t.home.valueProps.items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-xl border border-border bg-surface p-6 text-center"
            >
              <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title={t.home.featuredProducts.title} />
            <Link to="/products" className="text-sm font-semibold text-accent hover:text-accent-light">
              {t.home.featuredProducts.viewAll} →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productList.slice(0, 3).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title={t.home.portfolioTeaser.title} />
            <Link to="/portfolio" className="text-sm font-semibold text-accent hover:text-accent-light">
              {t.home.portfolioTeaser.viewAll} →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {portfolioList.slice(0, 2).map((project) => (
              <PortfolioCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-white sm:py-20">
        <div className="container-page flex flex-col items-center gap-5 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{t.home.ctaBanner.title}</h2>
          <p className="max-w-xl text-white/80">{t.home.ctaBanner.subtitle}</p>
          <Link
            to="/contact"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-light"
          >
            {t.home.ctaBanner.cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
