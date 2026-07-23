# Structure notes

## Folder layout (App Router)

```
app/
  layout.tsx              → wraps every page with <Header /> and <Footer />
  page.tsx                → homepage
  globals.css
  contact/page.tsx        → /contact (create this next)
  date-converter/page.tsx → /date-converter
  sip-calculator/page.tsx → /sip-calculator
  mileage-calculator/page.tsx
  emi-calculator/page.tsx
  grade-converter-gpa-percentage/page.tsx
  category/
    [category]/page.tsx   → /category/civic-guide, /category/blogs, etc.
  [slug]/page.tsx         → /esewa-vs-khalti, /how-to-download-enid, etc.
                             (catch-all for single blog posts, matches your
                             current WordPress URL style with no /blog/ prefix)
components/
  Header.tsx
  Footer.tsx
```

Next.js matches the **most specific route first** — so `/contact` and
`/date-converter` will always resolve to their own named folders, and only
URLs that don't match any static folder fall through to `[slug]/page.tsx`.
That's why static pages (contact, each calculator) need their own folder
even though `[slug]` technically could catch them.

## Still to build
- `app/[slug]/page.tsx` — fetches a single post by slug from your CMS
- `app/category/[category]/page.tsx` — fetches posts filtered by category
- Sanity (or your chosen CMS) client setup in `lib/sanity.ts`
- Each calculator page (pure component logic, no CMS needed)
- `app/contact/page.tsx` with a form wired to an API route

## Colors / type reference
- `paper` #FAF7F1 background, `ink` #1C1B19 text
- `marigold` #E8A33D and `vermilion` #A13D2C accents
- `indigo` #2B3A55 for secondary/data accents
- Display: Space Grotesk · Body: Source Serif 4 · Data/mono: JetBrains Mono
