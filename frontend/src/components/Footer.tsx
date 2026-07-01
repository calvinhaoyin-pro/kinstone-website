import { NavLink } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";

const NAV_ITEMS = [
  { to: "/", key: "home" as const },
  { to: "/products", key: "products" as const },
  { to: "/portfolio", key: "portfolio" as const },
  { to: "/about", key: "about" as const },
  { to: "/contact", key: "contact" as const },
];

export default function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-primary text-white">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">
              K
            </span>
            Kinstone
          </div>
          <p className="mt-3 max-w-xs text-sm text-white/70">{t.footer.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">
            {t.footer.quickLinks}
          </h3>
          <ul className="mt-3 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className="text-sm text-white/70 hover:text-white">
                  {t.nav[item.key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">
            {t.footer.contactHeading}
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-white/70">
            <li>{t.contact.info.address}</li>
            <li>{t.contact.info.phone}</li>
            <li>{t.contact.info.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <p className="container-page text-center text-xs text-white/60">
          {t.footer.copyright.replace("{year}", String(year))}
        </p>
      </div>
    </footer>
  );
}
