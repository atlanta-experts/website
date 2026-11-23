# atlantaexperts.com (new site, draft)

Plain HTML. Each page is a folder with an index.html.

- /desk-review/                  Desk review home (ad landing page)
- /desk-review/submit/           Submit a case (form)
- /desk-review/thank-you/        Shown after submit or payment
- /desk-review/after-the-review/ What happens after the review
- /desk-review/faq/              FAQ
- /desk-review/articles/         Articles
- /services/, /team/             Atlanta Experts firm pages (draft)

Settings to fill in before launch: desk-review/dr-config.js
(Flow 4 URL and the two Stripe Payment Links). While FLOW4_URL is empty
the form runs in demo mode and shows DR-0000.

Draft-only files to remove at go-live: _headers (noindex), _redirects (home redirect).
