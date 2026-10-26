# Vietlook Travel – Frontend

Bilingual (English / 简体中文) multi-page website for Vietlook Travel Operators.
Phase 1 of the project: frontend only. The backend, CMS and email come later.

Stack: React 19, TypeScript, Vite 6, Tailwind CSS 4, React Router 7, React Hook Form, Lucide icons.

## Run

```bash
npm install
npm run dev        # http://localhost:5173  → redirects to /en
npm run build      # type-check + production build (dist/, incl. sitemap.xml + robots.txt)
npm run preview    # serve dist/ on http://localhost:4173
```

`.npmrc` puts the npm cache on drive D (`D:/TaiLieu/Code/Intern/VietlookTravel/.npm-cache`). Edit that path on another machine.

Environment variables (`.env.example`):

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Public URL used for canonical, hreflang, Open Graph and sitemap.xml |
| `VITE_API_URL` | Backend base URL. Leave it empty for **demo mode**: form submissions are saved in the browser's localStorage and every form shows a demo-mode notice. When it is set, forms POST to `${VITE_API_URL}/api/requests/:kind` and expect `{ reference }` back. |

## Routes (each one exists under `/en/...` and `/zh/...`)

| Route | Page |
| --- | --- |
| `/` | Home |
| `/tours`, `/tours/:slug` | Tour listing (search, filters, sort, pagination), tour detail |
| `/destinations`, `/destinations/:slug` | Regions + 13 destinations |
| `/tour-themes`, `/tour-themes/:slug` | 8 themes |
| `/group-tailor-made-tours` | Group & Tailor-made Tours service page |
| `/tailor-made-tour` | Five-step tailor-made form |
| `/booking/:tourSlug` | Booking request form |
| `/private-car`, `/private-car/quote` | Car hire page, car quote form |
| `/visa-fast-track` | Visa & fast-track page and request form |
| `/travel-guide`, `/travel-guide/:slug` | Blog index; `:slug` resolves to a category first, then an article |
| `/about-us`, `/contact`, `/travel-trade-partners` | About, contact, B2B partnership |
| `/payment-policy`, `/cancellation-policy`, `/privacy-policy`, `/terms` | Policy pages |
| `/request-received/:reference` | Confirmation page (shown only after the request has been saved) |
| `*` | 404 |

## Structure

```
src/
  data/          content records (tours, destinations, themes, posts, vehicles, visa, home, site)
  i18n/          en.ts / zh.ts dictionaries + provider (locale comes from the URL)
  services/api.ts  form submission (API or demo localStorage), spam / duplicate guards
  hooks/useSubmit.ts
  lib/tourFilters.ts  filter / sort logic, synced with the URL query string
  components/{layout,ui,forms,tour,home,guide,sections}
  pages/         one file per route, lazy-loaded
```

`src/data/*` is shaped like the future CMS records, so pages render the same once the data comes from the API.

## Demo data and data still needed

- **16 tours and 14 articles are samples.** They are flagged `isDemo` and labelled "Sample itinerary" / "Sample article" in the UI.
- **Tour prices are illustrative.** They exist only so the price display, price filter and booking estimate can be tested. Each one is labelled "Sample price". Replace them with real rates before publishing. A tour with `priceFrom: null` shows "Price on request".
- **Guest reviews:** `data/home.ts → reviews` is intentionally empty. Add only real Google / TripAdvisor reviews.
- **Not supplied yet:** email, WeChat ID or QR code, TripAdvisor URL (`data/site.ts`); visa processing times and service fees, fast-track fees per airport (`data/visa.ts`); vehicle models and luggage capacity; tour videos (`video`), fixed departure dates (`departures`) and child rates by age.
