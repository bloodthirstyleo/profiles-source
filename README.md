# Personal Portfolio – Reconstructed Next.js Project

This is the **reconstructed source code** for the Personal Portfolio of Phat Nguyen Tan, reverse-engineered from a production Next.js static export.

## Architecture

| Folder            | Purpose                                                   |
|-------------------|-----------------------------------------------------------|
| `app/`            | Next.js App Router root (`layout.tsx`, `page.tsx`)        |
| `components/`     | Reusable UI pieces (`SectionTitle`, `Popup`, `SkinStylesheet`) |
| `contexts/`       | React Context provider with reducer for global state      |
| `data/`           | Static data layer (personal info, skills, experience, blog) |
| `sections/`       | Page-level section components (`Hero`, `About`, `Portfolio`, `Blog`, `Contact`) |
| `public/assets/`  | CSS skins, images, CV files, external data JSON             |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for static export
npm run build
```

## Project Structure Details

- **Framework**: Next.js 14 (App Router) with React 18 + TypeScript
- **Styling**: Tailwind CSS 3 + custom global CSS (`app/globals.css`)
- **State**: React Context + `useReducer` for navigation, theme, popup, and dark mode
- **Fonts**: Poppins + Open Sans via Google Fonts
- **Icons**: FontAwesome (loaded via CDN in `globals.css` or externally)

## Sections Recovered

1. **Hero** – Full-screen landing with background image
2. **About** – Personal info, statistics, tech stack, skills (circle bars), experience timeline, education timeline
3. **Portfolio** – Category-filterable work grid with hover overlays
4. **Blog** – Paginated post cards with overlay previews
5. **Contact** – Contact details + functional form

## Assumptions / Reconstruction Notes

- Variant blog posts were present in minified data but truncated; reconstructed with placeholder Lorem text per original template.
- Tailwind custom classes (`text-fs-*`, `bg-black-3`, etc.) were mapped from minified bundle references into `tailwind.config.ts`.
- Circle progress bars (`c100`) are CSS-only pie charts reconstructed from the compiled stylesheet.
- Portfolio work items (images/links) were inferred from experience entries.
- EmailJS and external animation libraries were omitted; form is client-side only with success feedback.
- The original project used a third-party template (likely "Tunis"); styling semantics were preserved as closely as possible.

## Notes for Extension

- Add EmailJS integration in `ContactSection.tsx` for real form delivery.
- Add `framer-motion` or `gsap` for scroll animations matching the original.
- Add SASS compilation if migrating away from Tailwind utility classes.
