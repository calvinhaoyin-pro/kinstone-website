# UI Design

## Visual Direction

The site should feel like a **modern international startup** — clean, confident, and forward-looking — not a traditional factory brochure. The design signals Kinstone's transition from a domestic manufacturer to a global steel company.

### Design Principles

- **Generous whitespace** — let content breathe; avoid cluttered layouts.
- **Bold typography** — large headings, clear hierarchy.
- **Restrained color palette** — steel-blue primary with a warm accent; dark text on light backgrounds.
- **Subtle motion** — fade-in on scroll, hover transitions on cards and buttons (Framer Motion).
- **Mobile-first** — responsive from 320px up.

## Design Tokens

### Colors

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#1e3a5f` | Headings, nav, primary buttons |
| `--color-primary-light` | `#2d5a8e` | Hover states |
| `--color-accent` | `#e67e22` | CTAs, highlights, links |
| `--color-accent-light` | `#f39c12` | Accent hover |
| `--color-bg` | `#fafafa` | Page background |
| `--color-surface` | `#ffffff` | Cards, sections |
| `--color-text` | `#1a1a2e` | Body text |
| `--color-text-muted` | `#64748b` | Secondary text |
| `--color-border` | `#e2e8f0` | Dividers, card borders |

### Typography

| Element | Font | Weight | Size |
|---|---|---|---|
| Display / Hero | Sora | 700 | 3rem–4.5rem |
| H1 | Sora | 700 | 2.5rem |
| H2 | Sora | 600 | 2rem |
| H3 | Sora | 600 | 1.5rem |
| Body | Inter | 400 | 1rem (16px) |
| Small / Caption | Inter | 400 | 0.875rem |

Fonts loaded via Google Fonts: `Sora` (headings), `Inter` (body).

### Spacing Scale

Tailwind default scale: `4, 8, 12, 16, 20, 24, 32, 48, 64, 96` (px).

### Border Radius

- Cards: `rounded-xl` (12px)
- Buttons: `rounded-lg` (8px)
- Inputs: `rounded-lg` (8px)

## Shared Components

| Component | Description |
|---|---|
| `Navbar` | Sticky top nav with logo, page links, language switcher (EN/ZH), mobile hamburger menu |
| `Footer` | Company info, quick links, copyright |
| `Hero` | Full-width hero section with headline, subtext, CTA button |
| `SectionHeading` | Reusable section title + optional subtitle |
| `Card` | Generic card with image placeholder, title, description, optional link |
| `ProductCard` | Card variant for product grid |
| `PortfolioCard` | Card variant for portfolio grid with project metadata |
| `ContactForm` | Inquiry form with type selector, fields, submit button |
| `LanguageSwitcher` | Toggle between EN and ZH |
| `PlaceholderImage` | Gray box with icon for missing images |

## Page Wireframes

### Home (`/`)

```
┌─────────────────────────────────────────────┐
│  Navbar                                     │
├─────────────────────────────────────────────┤
│  HERO                                       │
│  "Building the Future of Global Steel"      │
│  Subtext + [Explore Products] [Contact Us]  │
├─────────────────────────────────────────────┤
│  VALUE PROPS (3 columns)                    │
│  Quality | Global Reach | Innovation        │
├─────────────────────────────────────────────┤
│  FEATURED PRODUCTS (3-card grid)            │
│  [View All Products →]                      │
├─────────────────────────────────────────────┤
│  PORTFOLIO TEASER (2-card grid)             │
│  [View All Projects →]                      │
├─────────────────────────────────────────────┤
│  CTA BANNER                                 │
│  "Ready to work with us?" [Contact Us]      │
├─────────────────────────────────────────────┤
│  Footer                                     │
└─────────────────────────────────────────────┘
```

### Products (`/products`)

```
┌─────────────────────────────────────────────┐
│  Navbar                                     │
├─────────────────────────────────────────────┤
│  Page Header: "Our Products"              │
│  Subtitle about product range               │
├─────────────────────────────────────────────┤
│  PRODUCT GRID (responsive 1/2/3 columns)  │
│  Each card: image, name, category, summary  │
│  [Request Quote] link per card              │
├─────────────────────────────────────────────┤
│  Footer                                     │
└─────────────────────────────────────────────┘
```

### Portfolio (`/portfolio`)

```
┌─────────────────────────────────────────────┐
│  Navbar                                     │
├─────────────────────────────────────────────┤
│  Page Header: "Our Portfolio"               │
│  Subtitle about completed projects          │
├─────────────────────────────────────────────┤
│  PROJECT GRID (responsive 1/2 columns)      │
│  Each card: image, project name, location,  │
│  year, brief description                    │
├─────────────────────────────────────────────┤
│  Footer                                     │
└─────────────────────────────────────────────┘
```

### About (`/about`)

```
┌─────────────────────────────────────────────┐
│  Navbar                                     │
├─────────────────────────────────────────────┤
│  Page Header: "About Kinstone"              │
├─────────────────────────────────────────────┤
│  COMPANY STORY (2-column: text + image)     │
│  Transition narrative placeholder           │
├─────────────────────────────────────────────┤
│  TIMELINE (vertical, placeholder milestones)│
├─────────────────────────────────────────────┤
│  VALUES / MISSION (3 columns)               │
├─────────────────────────────────────────────┤
│  Footer                                     │
└─────────────────────────────────────────────┘
```

### Contact (`/contact`) — Primary Conversion Point

```
┌─────────────────────────────────────────────┐
│  Navbar                                     │
├─────────────────────────────────────────────┤
│  Page Header: "Contact Us"                  │
│  Subtitle: "Get in touch for quotes,        │
│  inventory checks, or general inquiries"    │
├─────────────────────────────────────────────┤
│  INQUIRY TYPE SELECTOR (3 tabs/buttons)     │
│  [General] [Request Quote] [Check Inventory]│
├─────────────────────────────────────────────┤
│  CONTACT FORM (2-column layout)             │
│  Left: form fields                          │
│    - Name, Company, Email, Phone            │
│    - Product Interest (optional)            │
│    - Message                                │
│    - [Submit] button                        │
│  Right: contact info + map placeholder      │
│    - Address, phone, email                  │
│    - Business hours                         │
│    - Map placeholder box                    │
├─────────────────────────────────────────────┤
│  Footer                                     │
└─────────────────────────────────────────────┘
```

## i18n Approach

- Default language: **English (`en`)**
- Secondary language: **Chinese (`zh`)**
- Language switcher in the Navbar toggles between EN/ZH.
- UI strings stored in `src/i18n/en.json` and `src/i18n/zh.json`.
- Static content (products, portfolio) uses locale-keyed fields in JSON data files:

```json
{
  "slug": "h-beam-steel",
  "name": { "en": "H-Beam Steel", "zh": "H型钢" },
  "summary": { "en": "...", "zh": "..." }
}
```

- Selected locale persisted in `localStorage` so it survives page reloads.

## Placeholder Conventions

All placeholder content is clearly marked so it can be replaced later:

- **Images:** gray boxes with a generic icon and "Placeholder" label.
- **Copy:** prefixed with `[TODO]` in source files where applicable.
- **Data files:** contain 3–4 sample entries with realistic but fictional content.
- **Map:** a styled gray box with "Map placeholder" text on the Contact page.

## Responsive Breakpoints

| Breakpoint | Tailwind prefix | Layout |
|---|---|---|
| < 640px | default | Single column, hamburger nav |
| 640px+ | `sm:` | 2-column grids where applicable |
| 768px+ | `md:` | Full nav bar, 2-column layouts |
| 1024px+ | `lg:` | 3-column product grid, wider containers |
| 1280px+ | `xl:` | Max-width container (1280px) |
