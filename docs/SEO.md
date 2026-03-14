# SEO System Documentation

Production-grade SEO implementation for VillaAquamare / StayKorčula.

## Folder Structure

```
app/
├── layout.tsx              # Root metadata (title template, defaults)
├── robots.ts               # robots.txt generation
├── sitemap.ts              # sitemap.xml generation
└── [locale]/
    └── lib/
        └── seo/
            ├── index.ts        # Central exports
            ├── metadata.ts     # Metadata generator
            ├── schema.ts       # JSON-LD schemas (breadcrumb, etc.)
            ├── utils.ts        # URL helpers
            ├── constants.ts    # Defaults
            └── types.ts        # TypeScript types
```

## Features & SEO Impact

| Feature | File | SEO Benefit |
|---------|------|-------------|
| **Dynamic meta titles** | metadata.ts | Unique, keyword-rich titles per page improve CTR in SERPs |
| **Canonical URLs** | metadata.ts, utils.ts | Prevents duplicate content issues; absolute URLs for proper indexing |
| **Open Graph** | metadata.ts | Rich previews on Facebook, LinkedIn, WhatsApp |
| **Twitter Cards** | metadata.ts | Optimized previews on Twitter/X |
| **Robots meta** | metadata.ts, constants.ts | Controls indexing; googleBot hints for rich snippets |
| **JSON-LD schemas** | schema.ts, schema/*.ts | Rich results: sitelinks, breadcrumbs, Knowledge Graph |
| **Sitemap** | sitemap.ts | Faster discovery of all pages by crawlers |
| **robots.txt** | robots.ts | Crawl budget control; sitemap reference |
| **hreflang** | metadata.ts alternates | Correct language version in search results |
| **Title template** | layout.tsx | Consistent branding: "Page | Site" |

## Usage Examples

### Page with generateMetadata (dynamic)

```tsx
// app/[locale]/(site)/accommodations/[slug]/page.tsx
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale(params.locale);
  const property = getPropertyBySlug(params.slug);
  if (!property) return {};

  return generatePropertyMetadata(property, locale);
}
```

### Listing page (central module)

```tsx
// app/[locale]/(site)/accommodations/page.tsx
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale(params.locale);
  const { generateListingMetadata } = await import('../../lib/seo');
  return generateListingMetadata(locale, 'accommodations');
}
```

### Custom metadata (override)

```tsx
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

return generateSEOMetadata({
  locale: 'hr',
  title: 'Custom Page Title',
  description: 'Custom description',
  path: 'custom-path',
  image: '/images/custom-og.jpg',
  noIndex: false,
});
```

### Breadcrumb schema (property/service pages)

```tsx
import { generateBreadcrumbSchema, getPropertyBreadcrumbItems } from '@/lib/seo';

<SchemaScript
  schema={generateBreadcrumbSchema(
    getPropertyBreadcrumbItems(locale, propertyName, slug),
    locale
  )}
  id="breadcrumb-schema"
/>
```

## Automatic Features

- **Canonical URL**: Built from `path` + locale; always absolute
- **OG image fallback**: Uses `/images/dron.jpg` when not provided
- **hreflang**: Generated for hr/en on all pages
- **robots.txt**: Allows `/`, disallows `/api/`, `/_next/`; references sitemap

## Performance SEO

- **Image alt**: Pass `imageAlt` to metadata for OG images
- **Lazy loading**: Next.js Image component used throughout
- **Semantic HTML**: Section, nav, main, article where appropriate
- **Heading structure**: h1 per page, logical h2/h3 hierarchy

## Adding a New Page

1. Add route to `sitemap.ts` if needed
2. Call `generateMetadata()` or `generateListingMetadata()` in page
3. Add breadcrumb schema if it's a detail page (e.g. `/services/[slug]`)
4. Ensure unique title and description
