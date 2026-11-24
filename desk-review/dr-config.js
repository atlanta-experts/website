// Desk review settings. Fill these in once Flow 4 and Stripe are set up.
// While FLOW4_URL is empty, the form runs in demo mode: it shows a sample
// DR number and skips payment, so the pages can be reviewed safely.
window.DR_CONFIG = {
  // Power Automate Flow 4 "When an HTTP request is received" URL
  FLOW4_URL: "https://default7da7294e3755478e876a3ff83260db.38.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/18/workflows/72377b630e084076b5d285ec961e9bb7/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2NNuX8NZzgIW4u1jmRMP4iYvTbjN6vlW9CEVjLsmnXs",
  // Stripe Payment Links, one per case type
  STRIPE_LINKS: {
    residential: "",
    commercial: ""
  },
  // Where clients can write if something goes wrong
  CONTACT_EMAIL: "info@atlantaexperts.com"
};
