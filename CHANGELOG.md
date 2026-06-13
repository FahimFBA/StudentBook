# Changelog

All notable changes to StudentBook are documented in this file.

This project follows a Keep a Changelog-style format. Add a new `## [x.y.z] - YYYY-MM-DD` section at the top when preparing a release. The release workflow publishes a GitHub Release for the newest changelog version if one does not already exist.

## [2.6.0] - 2026-06-13

### Added

- Added Docker Compose support for running the MySQL database, Express API, and Vite frontend together.
- Added production Dockerfiles for the API and main client.
- Added nginx configuration for serving the built client, proxying `/api`, and serving uploaded files from `/upload`.
- Added Docker documentation to the README, including startup, health check, reset, and upload volume notes.

### Changed

- Updated the API to support environment-based port, CORS origins, and upload directory configuration.
- Updated the API startup path to create the configured upload directory automatically.
- Added an `/api/health` endpoint for container and deployment checks.
- Updated release documentation to use the new `2.6.0` Docker release version.

### Verified

- `npm run build` passes in `client`.
- `node --check api\index.js` passes.
- `docker compose config` passes.
- `docker compose build` passes.
- `docker compose up -d db` initializes the MySQL schema and reaches healthy status.

## [2.5.0] - 2026-06-13

### Added

- Added DB-backed Video Portal support in the main app through `/api/videos`.
- Added authenticated video create, list, and delete API endpoints.
- Added a `videotable` schema definition and `schema/add_videotable.sql` migration for existing databases.
- Added a main app video submission form for user-posted YouTube videos.
- Added README documentation for the completed DB-backed Video Portal and existing-database migration path.

### Changed

- Updated the integrated `/videos` page to load videos from the app API/database instead of a static hardcoded list.
- Kept the static demo video portal browser-local so GitHub Pages builds still work without a database.
- Updated the static demo storage key so demo video seed data refreshes.
- Updated release documentation to use the new `2.5.0` Video Portal release version.

### Verified

- `npm run lint` passes in `client`.
- `npm run build` passes in `client`.
- `npm run build:demo` passes in `client`.
- `VITE_BASE_PATH=/StudentBook/ npm run build:demo` passes in `client`.
- `node --check api\controllers\video.js` passes.
- `node --check api\routes\videos.js` passes.
- `node --check api\index.js` passes.

## [2.3.1] - 2026-06-13

### Changed

- Updated the integrated demo Video Portal to feature recent videos from the Fahim Amin YouTube channel.
- Updated the standalone `client/VideoPortal` prototype to use the same Fahim Amin video list, thumbnails, embeds, and watch routes.
- Refreshed the static demo storage key so stale demo browser data is cleared.

### Fixed

- Fixed the demo-student cover image by replacing the broken seed cover URL.

### Verified

- `npm run lint` passes in `client`.
- `npm run build:demo` passes in `client`.
- `VITE_BASE_PATH=/StudentBook/ npm run build:demo` passes in `client`.
- `npm run build` passes in `client/VideoPortal`.

## [2.3.0] - 2026-06-13

### Added

- Added refreshed static demo seed data with American student, faculty, staff, and alumni profiles.
- Added richer demo content, including 18 posts, 10 articles, 10 jobs, 6 announcements, likes, comments, and relationships.
- Added role-specific demo login hints for student, faculty, and staff accounts.
- Added browser-local image persistence for static demo uploads by converting uploaded images to cached data URLs.

### Changed

- Updated the static demo storage key so old demo users and old seed data are replaced by the refreshed demo dataset.
- Updated demo images to load from remote Unsplash image URLs instead of the old local upload filenames.
- Updated demo login so seeded role accounts use the visible demo credentials while locally registered demo accounts remain browser-only.

### Verified

- `npm run lint` passes in `client`.
- `npm run build:demo` passes in `client`.
- `VITE_BASE_PATH=/StudentBook/ npm run build:demo` passes in `client`.

## [2.2.0] - 2026-06-13

### Added

- Added a GitHub Pages workflow that builds and deploys the StudentBook client as a static demo site.
- Added a Vite demo build mode with mocked browser-local data for profiles, posts, likes, comments, articles, jobs, announcements, and search.
- Added static demo account credentials on the demo login screen.
- Added static demo publishing instructions to the README.

### Changed

- Switched demo builds to hash routing so static GitHub Pages URLs work without server rewrites.
- Updated public upload image URL handling so assets resolve correctly under a GitHub Pages repository subpath.
- Updated demo signup so it creates a browser-local account and signs the visitor in.
- Kept normal local builds connected to the Express API while demo builds run without MySQL or the backend.

### Fixed

- Fixed the StudentBook heading on login and signup pages so it stays inside the auth column on narrower screens.
- Fixed case-sensitive SCSS imports that failed on Linux GitHub Actions runners.

### Verified

- `npm run lint` passes in `client`.
- `npm run build:demo` passes in `client`.
- `VITE_BASE_PATH=/StudentBook/ npm run build:demo` passes in `client`.

## [2.1.1] - 2026-06-13

### Changed

- Reworked mobile logout into a dedicated mobile navigation action and normalized logout colors for light and dark themes.
- Updated the navbar search experience from a passive datalist to an in-app student result dropdown that links directly to profiles.
- Improved student search matching to support fullname, username, and CGPA substring searches.

### Fixed

- Fixed navbar/search overlap on narrower screens.
- Fixed post like, comment, and share buttons so their spacing, states, and mobile layout are consistent.
- Fixed login and signup cards so they remain vertically centered on mobile screens.
- Fixed search result avatars so large uploaded profile images cannot expand and break the UI.
- Fixed logout state handling so the client user is cleared after a successful logout.

### Verified

- `npm run lint` passes in `client`.
- `npm run build` passes in `client`.
- `node --check api\controllers\search.js` passes.

## [2.1.0] - 2026-06-13

### Added

- Added a redesigned in-app Video Portal at `/videos` in the main StudentBook client.
- Added a mobile primary navigation bar for Home, Articles, Notices, Jobs, Videos, and Profile.
- Added route-level lazy loading for main client pages to reduce the initial production bundle.

### Changed

- Redesigned the main StudentBook UI with a consistent card-based layout, updated navigation, improved feed surfaces, modern auth screens, responsive profile details, and refreshed article, announcement, job, and campus hub pages.
- Updated dark mode coverage for auth routes, forms, cards, modal surfaces, and the profile update workflow.
- Reworked the profile header actions, replaced the legacy Twitter icon with the current X icon, and grouped profile controls more cleanly.
- Updated the standalone `client/VideoPortal` Vite app with responsive styled-components layouts, modern cards, and improved video page structure.
- Improved mobile responsiveness across auth, feed, profile, article, job, video, and standalone video portal layouts.

### Fixed

- Fixed mobile auth layout overlap on narrow screens.
- Fixed mobile long-form pages where fixed navigation could cover form fields.
- Fixed the profile follow button label so it reflects the current follow state.
- Fixed the profile update form so text fields are saved as strings instead of arrays.

### Verified

- `npm run lint` passes in `client`.
- `npm run build` passes in `client` and `client/VideoPortal`.
- Headless Edge responsive checks pass at 390px width for login, register, home, articles, jobs, and videos with no horizontal overflow.
- Headless Edge desktop verification passes for the integrated Video Portal with no horizontal overflow.

## [2.0.0] - 2026-06-12

### Added

- Added a GitHub Actions release workflow that creates a GitHub Release from the newest `CHANGELOG.md` version section.
- Added API environment configuration through `api/.env.example`.
- Added an ESLint flat config for the upgraded React client.

### Changed

- Upgraded the API dependency stack, including Express 5, Multer 2, bcrypt 6, and Nodemon 3.
- Replaced the unmaintained `mysql` package with `mysql2` and switched the API database client to a connection pool.
- Upgraded the main client to React 19, React Router 7, React Query 5, MUI 9, Vite 8, Tailwind CSS 4, and ESLint 10.
- Replaced the stale `react-search-box` dependency with a native search input and datalist.
- Migrated the video portal from Create React App and `react-scripts` to Vite.
- Updated React usage for React 19 patterns, including context reads and context providers.
- Migrated Sass from deprecated `@import` and global map functions to the module API.

### Removed

- Removed unused frontend dependencies including `react-select`, frontend `multer`, video portal test packages, and `web-vitals`.
- Removed the stale `client/VideoPortal/yarn.lock`; npm lockfiles are now the package-manager source of truth.

### Verified

- `npm audit` reports zero vulnerabilities in `api`, `client`, and `client/VideoPortal`.
- `npm outdated --json` reports no outdated direct dependencies in `api`, `client`, and `client/VideoPortal`.
- `npm run lint` passes in `client`.
- `npm run build` passes in `client` and `client/VideoPortal`.
