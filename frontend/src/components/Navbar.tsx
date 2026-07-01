import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_ITEMS = [
  { to: "/", key: "home" as const },
  { to: "/products", key: "products" as const },
  { to: "/portfolio", key: "portfolio" as const },
  { to: "/about", key: "about" as const },
];

export default function Navbar() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-accent" : "text-text hover:text-primary"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-display text-lg font-bold text-primary">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            K
          </span>
          Kinstone
        </NavLink>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === "/"}>
              {t.nav[item.key]}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher />
          <NavLink
            to="/contact"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-light"
          >
            {t.nav.cta}
          </NavLink>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border bg-surface px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
              >
                {t.nav[item.key]}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="w-fit rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white"
            >
              {t.nav.cta}
            </NavLink>
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
