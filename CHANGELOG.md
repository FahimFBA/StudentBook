# Changelog

All notable changes to StudentBook are documented in this file.

This project follows a Keep a Changelog-style format. Add a new `## [x.y.z] - YYYY-MM-DD` section at the top when preparing a release. The release workflow publishes a GitHub Release for the newest changelog version if one does not already exist.

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
