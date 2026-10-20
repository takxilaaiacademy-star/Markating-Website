# Takxila AI Academy – Marketing Website

A static marketing and lead-generation site for Takxila AI Academy. It has the same look, brand, courses and content as the main academy site, but no login, dashboard, backend or cart. Every Enroll, Register and Log in button opens the main academy site, and UTM tags are carried along.

Pages: Home, All courses (search and filter), course pages (`/course/:id`), AI course finder quiz with lead capture (`/ai-course-finder`), About, Contact, Policies and a 404 page.

## Run it

Needs Node 18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/ (+ sitemap.xml, robots.txt)
npm run preview    # serve the built dist/ locally
```

## What to change

| What | Where |
|---|---|
| Main academy URL (where buttons go) | `VITE_MAIN_SITE_URL` in `.env`, or `MAIN_SITE_URL` in `src/config/marketing.ts` |
| URL this marketing site is hosted at (canonical, OG, sitemap) | `VITE_SITE_URL` in `.env`, or `SITE_URL` in `src/config/marketing.ts` |
| Offer banner text, button, on/off, end date | `OFFER` in `src/config/marketing.ts` |
| Testimonials (samples now, replace with real reviews) | `TESTIMONIALS` in `src/config/marketing.ts` |
| Learner counter, social links, free roadmap | `src/config/marketing.ts` |
| Phone, WhatsApp, email, address, lead inbox | `SITE` in `src/config/site.ts` |
| Courses, prices, cover images | `src/data/courses.ts` |
| Google Analytics / Meta Pixel | `VITE_GA_ID`, `VITE_META_PIXEL_ID` in `.env` (loaded only when set) |

Copy `.env.example` to `.env` to set these. Rebuild after any change.

Course Enroll buttons open the course's academy page (`academyUrl` in the course data) when it has one, otherwise `MAIN_SITE_URL/course/<id>`. To always use the main site link, set `USE_ACADEMY_LINKS = false`.

## Leads

The contact form, the course-finder result form and the roadmap/newsletter forms email each lead to the academy inbox through the Google Apps Script web app (`tools/Code.gs`, URL in `src/config/site.ts` or `VITE_MAIL_WEBHOOK`). If that call fails, FormSubmit (formsubmit.co) is used as a fallback. Forms have validation and a hidden spam trap field.

## Deploy on Vercel

1. Push this folder to a Git repo and import it in Vercel (or run `npx vercel`).
2. Framework preset: Vite. Build command `npm run build`, output folder `dist`.
3. Add the `VITE_*` variables under Project Settings > Environment Variables if you need them.

`vercel.json` already rewrites every page URL to `index.html`, so links like `/courses` work on refresh.

## Deploy on Hostinger (or any shared hosting)

1. Set `VITE_SITE_URL` to your domain, then run `npm run build`.
2. Open hPanel > File Manager > `public_html` and upload everything inside `dist/` (including the hidden `.htaccess`).

The `.htaccess` file (from `public/`) forces HTTPS, sends every page URL to `index.html` and sets cache headers. A `_redirects` file is also included for Netlify.

## Project layout

```
public/          static files: covers, videos, logos, icons, .htaccess
src/config/      site + marketing settings
src/data/        courses, course content, quiz
src/components/  layout, cards, forms, shared UI
src/features/    AI course finder quiz
src/pages/       Home, Courses, Course, Quiz, About/Contact/Policies/404
src/utils/       links + UTM, leads, SEO, analytics
tools/           sitemap/robots generator, Apps Script mailer
```

## Notes

- The course page has three views (banner cards, grouped categories, numbered tiles) with search, filters, sorting and pagination.
- Login / Register / Enroll buttons open the academy's own pages. Confirm the exact registration path on the live academy before publishing. Nothing here processes payment or logs anyone in.
- Course information and prices are a snapshot. Check links and data before deploying.
- `/calculator` redirects to `/ai-course-finder` (one page, one menu item).

## Speed and safety

- Fonts load without blocking the first paint, and off-screen home sections are skipped until you scroll to them (`content-visibility`).
- The heavy course-content file loads only when a course page opens; the Courses and Course pages are fetched while the browser is idle.
- Background glow animation is off on phones, and respects "reduce motion".
- Vendor code is split into `react` and `mui` chunks, cached for a year; images and videos are cached for 30 days.
- A friendly "Reload page" screen replaces a blank page if a page file fails to load, and there is a "Skip to main content" link.
- Security headers are set in `vercel.json` and `public/.htaccess`.

