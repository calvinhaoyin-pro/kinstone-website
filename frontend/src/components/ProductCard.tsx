import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useLocale } from "../i18n/LocaleContext";
import Card from "./Card";
import PlaceholderImage from "./PlaceholderImage";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { locale, t } = useLocale();

  return (
    <Card>
      <PlaceholderImage className="aspect-[4/3] w-full" />
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          {product.category[locale]}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-primary">{product.name[locale]}</h3>
        <p className="mt-2 text-sm text-text-muted">{product.summary[locale]}</p>
        <Link
          to={`/contact?type=quote&product=${product.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-light"
        >
          {t.products.requestQuote}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Card>
  );
}
