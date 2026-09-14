# onuamo.com

Static site for Onuamo LLC. No build step, no dependencies. Drop the files in the repo
root and GitHub Pages serves them as-is.

## Files

| File | Purpose |
|---|---|
| `index.html` | Home — positioning and terms strip |
| `partners.html` | Brand Partners — commercial terms, brand protection, FAQ |
| `about.html` | Company and team |
| `categories.html` | Categories bought |
| `contact.html` | Contact details and the single inquiry form |
| `404.html` | Not-found page |
| `styles.css` | All styling |
| `favicon.svg` | Favicon |
| `robots.txt`, `sitemap.xml` | Crawling |

## Before launch

1. **Wire the form.** In `contact.html`, replace `REPLACE_WITH_FORM_ID` in the form
   `action` with a real Formspree ID (or swap to Netlify Forms). Then submit a test
   and confirm it arrives. A silently failing form is worse than no form.
2. **Create the inboxes.** `partnerships@onuamo.com` and `hello@onuamo.com`, monitored,
   set up so replies send *from* those addresses.
3. **Voicemail.** (831) 902-1564 needs a greeting that names Onuamo LLC.
4. **Email authentication.** onuamo.com currently has no SPF, DKIM, or DMARC record.
   Publish all three in Namecheap DNS before any outreach, or messages linking to this
   site will land in spam regardless of how good the site is.
5. **Verify the address.** Confirm what `4230 E. River Road, Moraine, OH 45439` returns
   in a public search.

## Deploying

```
git add .
git commit -m "Rebuild site: retailer positioning"
git push
```

GitHub Pages picks it up from the default branch. Confirm HTTPS is enforced and the
custom domain is set in repo Settings → Pages.

## Editing

Colors and type live in the `:root` block at the top of `styles.css`. Nav links are
hardcoded in each page's `<header>` — five files to update if you add a page.

## Fonts

Archivo and Source Serif 4 load from Google Fonts. If they fail to load, the site
falls back to Helvetica and Georgia and still reads correctly. To remove the
third-party dependency, self-host the two families and update the `<link>` in each
page's `<head>`.
