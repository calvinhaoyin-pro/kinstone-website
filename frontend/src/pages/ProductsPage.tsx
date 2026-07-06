import { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { useLocale } from "../i18n/LocaleContext";
import products from "../data/products.json";
import type { Product } from "../types";

const productList = products as Product[];

export default function ProductsPage() {
  const { t, locale } = useLocale();

  // Derive unique categories in order of first appearance
  const categories: string[] = [];
  for (const p of productList) {
    if (!categories.includes(p.category[locale])) {
      categories.push(p.category[locale]);
    }
  }

  const [active, setActive] = useState<string | null>(null);

  const filtered = active ? productList.filter((p) => p.category[locale] === active) : productList;

  return (
    <div className="container-page py-16 sm:py-20">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">

        {/* ── Sidebar ─────────────────────────────────────── */}
        <aside className="w-full shrink-0 lg:w-56">
          <p className="label-mono mb-4">{t.products.category}</p>
          <nav>
            <ul className="flex flex-row flex-wrap gap-1 lg:flex-col lg:gap-0">
              {/* "All" entry */}
              <li>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className={`w-full border-l-2 px-4 py-2.5 text-left font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                    active === null
                      ? "border-accent text-text"
                      : "border-transparent text-text-muted hover:border-border hover:text-text"
                  }`}
                >
                  {t.products.allCategories}
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => setActive(cat)}
                    className={`w-full border-l-2 px-4 py-2.5 text-left font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                      active === cat
                        ? "border-accent text-text"
                        : "border-transparent text-text-muted hover:border-border hover:text-text"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* ── Product grid ─────────────────────────────────── */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-4">
            <h1 className="text-2xl font-extrabold tracking-tight text-primary">
              {active ?? t.products.title}
            </h1>
            <span className="label-mono">
              {filtered.length} {filtered.length === 1 ? "item" : "items"}
            </span>
          </div>

          <motion.div
            key={active ?? "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
