import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

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
    `relative font-mono text-xs uppercase tracking-[0.14em] transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-accent after:transition-all after:duration-300 ${
      isActive
        ? "text-text after:w-full"
        : "text-text-muted hover:text-text after:w-0 hover:after:w-full"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <nav className="container-page flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center" aria-label="Kinstone home">
          <Logo className="h-9" />
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
            className="bg-accent px-5 py-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-light"
          >
            {t.nav.cta}
          </NavLink>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-border text-text md:hidden"
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
        <div className="border-t border-border bg-bg px-6 py-4 md:hidden">
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
              className="w-fit bg-accent px-5 py-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-white"
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
