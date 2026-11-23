// Desk review settings. Fill these in once Flow 4 and Stripe are set up.
// While FLOW4_URL is empty, the form runs in demo mode: it shows a sample
// DR number and skips payment, so the pages can be reviewed safely.
window.DR_CONFIG = {
  // Power Automate Flow 4 "When an HTTP request is received" URL
  FLOW4_URL: "",
  // Stripe Payment Links, one per case type
  STRIPE_LINKS: {
    residential: "",
    commercial: ""
  },
  // Where clients can write if something goes wrong
  CONTACT_EMAIL: "info@atlantaexperts.com"
};
