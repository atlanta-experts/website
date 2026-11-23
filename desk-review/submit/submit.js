(function () {
  var cfg = window.DR_CONFIG || {};
  var form = document.getElementById("dr-form");
  var errorBox = document.getElementById("dr-error");
  var buttons = form.querySelectorAll("button[type=submit]");
  var payment = "card";

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { payment = b.getAttribute("data-payment"); });
  });

  form.querySelectorAll("input, select, textarea").forEach(function (el) {
    el.addEventListener("input", function () {
      el.removeAttribute("aria-invalid");
      if (!errorBox.hidden) { errorBox.hidden = true; }
    });
  });

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.hidden = false;
    errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function setBusy(busy) {
    buttons.forEach(function (b) { b.disabled = busy; });
    document.getElementById("dr-pay").textContent = busy ? "Submitting..." : "Continue to payment";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.website.value) { return; } // spam trap

    var firstBad = null;
    form.querySelectorAll("[required]").forEach(function (el) {
      var ok = el.value.trim() !== "" && el.checkValidity();
      if (!ok) { el.setAttribute("aria-invalid", "true"); firstBad = firstBad || el; }
    });
    if (firstBad) {
      showError("Please complete the highlighted fields.");
      firstBad.focus();
      return;
    }

    var caseType = form.caseType.value;
    var data = {
      caseType: caseType,
      price: caseType === "commercial" ? 495 : 225,
      payment: payment,
      submitter: {
        name: form.name.value.trim(),
        firm: form.firm.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim()
      },
      caseName: form.caseName.value.trim(),
      propertyAddress: form.propertyAddress.value.trim(),
      statePending: form.statePending.value.trim(),
      source: form.source.value,
      description: form.description.value.trim(),
      submittedAt: new Date().toISOString()
    };

    setBusy(true);

    var send = cfg.FLOW4_URL
      ? fetch(cfg.FLOW4_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }).then(function (r) {
          if (!r.ok) { throw new Error("status " + r.status); }
          return r.json();
        })
      : Promise.resolve({ drNumber: "DR-0000", demo: true });

    send.then(function (res) {
      var dr = res.drNumber;
      try {
        sessionStorage.setItem("dr_number", dr);
        sessionStorage.setItem("dr_payment", payment);
      } catch (err) {}

      var link = cfg.STRIPE_LINKS && cfg.STRIPE_LINKS[caseType];
      if (payment === "card" && link && !res.demo) {
        window.location.href = link +
          "?client_reference_id=" + encodeURIComponent(dr) +
          "&prefilled_email=" + encodeURIComponent(data.submitter.email);
      } else {
        window.location.href = "/desk-review/thank-you/?dr=" + encodeURIComponent(dr) +
          (payment === "invoice" ? "&invoice=1" : "");
      }
    }).catch(function () {
      setBusy(false);
      showError("We couldn't submit your case. Please try again, or email " +
        (cfg.CONTACT_EMAIL || "info@atlantaexperts.com") + " and we'll set it up for you.");
    });
  });
})();
