# TAKXILA marketing + React catalog integration

- The original marketing React/Vite project is preserved.
- Course catalog now supports the three screenshot-inspired views: banner cards, grouped expandable categories, and numbered compact tiles.
- Search, category filters, price/title sorting, pagination, responsive layout, persisted view preference and course details are functional.
- Grouped view searches across all matching courses and shows real covers, costs, and links to detail pages.
- The AI Calculator menu item routes to the project’s existing working 11-question AI score calculator and recommendations; the original AI Course Finder URL also works.
- Login and registration buttons now target the academy's conventional Moodle login and signup paths. Confirm the specific registration path and availability on your live academy before publishing.
- Enrollment CTAs use academy course URLs from the project data. Nothing processes payment or logs in locally.

## Run

`npm ci` then `npm run dev` for development or `npm run build` for a deployable `dist` directory.

## Note

This is a React + TypeScript + MUI marketing website (the uploaded marketing codebase), not a converted backend-free HTML-only site. After `npm run build` it deploys as static HTML/CSS/JS with no Python backend. Course information and prices are a snapshot; verify links and data before deployment.
