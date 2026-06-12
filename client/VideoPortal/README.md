# StudentBook Video Portal

This is the standalone video portal prototype for StudentBook. It was migrated from Create React App to Vite and now uses the same modern React generation as the main frontend.

The main StudentBook app also includes an integrated Video Portal at `/videos`. Use this standalone app when you want to iterate on the video experience independently from the main social client.

## Features

- Responsive video home grid.
- Responsive video watch page with recommendations and comments.
- Sign-in/register mock screen.
- Dark and light theme support through styled-components.
- Route-level lazy loading for standalone pages.

## Tech Stack

- React 19
- Vite 8
- React Router 7
- MUI 9
- styled-components 6

## Commands

```powershell
npm ci
npm run dev
npm run build
npm run preview
```

The development server uses Vite's default port selection. Check the terminal output for the exact local URL.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Video home grid |
| `/video/:id` | Video watch page |
| `/signin` | Auth mock screen |
