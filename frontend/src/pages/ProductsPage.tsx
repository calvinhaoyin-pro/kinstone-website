import SectionHeading from "../components/SectionHeading";
import ProductCard from "../components/ProductCard";
import { useLocale } from "../i18n/LocaleContext";
import products from "../data/products.json";
import type { Product } from "../types";

const productList = products as Product[];

export default function ProductsPage() {
  const { t } = useLocale();

  return (
    <div className="container-page py-16 sm:py-20">
      <SectionHeading title={t.products.title} subtitle={t.products.subtitle} />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productList.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
