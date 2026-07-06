import { NavLink } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import Logo from "./Logo";

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
    <footer className="border-t border-border bg-surface text-text">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <Logo variant="onDark" className="h-8" />
          <p className="mt-4 max-w-xs text-sm text-text-muted">{t.footer.tagline}</p>
        </div>

        <div>
          <h3 className="label-mono">{t.footer.quickLinks}</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className="text-sm text-text-muted hover:text-text">
                  {t.nav[item.key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="label-mono">{t.footer.contactHeading}</h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-text-muted">
            <li>{t.contact.info.address}</li>
            <li>{t.contact.info.phone}</li>
            <li>{t.contact.info.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5">
        <p className="container-page text-center font-mono text-xs text-text-muted">
          {t.footer.copyright.replace("{year}", String(year))}
        </p>
      </div>
    </footer>
  );
}
