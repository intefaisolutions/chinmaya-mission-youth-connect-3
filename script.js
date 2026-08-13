(function () {
  const form = document.getElementById("lead-form");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("register-btn");
  const STORAGE_KEY = "youth_connect_lead_form";

  if (!form || !submitBtn) {
    console.error("Form or register button not found");
    return;
  }

  form.setAttribute("action", "javascript:void(0)");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    startRegistration();
  });

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    startRegistration();
  });

  restoreForm();
  form.addEventListener("input", persistForm);
  form.addEventListener("change", persistForm);

  function cfg() {
    return window.YOUTH_CONNECT_CONFIG || {};
  }

  function setStatus(message, isError) {
    if (!statusEl) return;
    statusEl.hidden = false;
    statusEl.textContent = message;
    statusEl.style.color = isError ? "#b71c1c" : "#6b1e1e";
  }

  function setLoading(loading) {
    submitBtn.disabled = loading;
    submitBtn.textContent = loading
      ? "Submitting…"
      : "Register for Youth Connect 3.0";
  }

  function persistForm() {
    const data = Object.fromEntries(new FormData(form).entries());
    data.consent = Boolean(form.consent && form.consent.checked);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      sessionStorage.setItem(
        "youth_connect_lead",
        JSON.stringify({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          whatsapp: data.whatsapp || "",
        })
      );
    } catch (err) {
      console.warn(err);
    }
  }

  function restoreForm() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      [
        "firstName",
        "lastName",
        "age",
        "gender",
        "whatsapp",
        "email",
        "city",
        "occupation",
        "emergencyContact",
        "motivation",
      ].forEach(function (name) {
        if (form.elements[name] && data[name]) {
          form.elements[name].value = data[name];
        }
      });
      if (form.consent) form.consent.checked = Boolean(data.consent);
    } catch (err) {
      console.warn(err);
    }
  }

  function validateAge(ageValue) {
    const age = Number(ageValue);
    return Number.isInteger(age) && age >= 18 && age <= 32;
  }

  function normalizeWhatsapp(value) {
    const digits = String(value || "").replace(/\D/g, "");
    if (!digits) return "";
    if (digits.length === 10) return digits;
    if (digits.length === 12 && digits.indexOf("91") === 0) return digits.slice(2);
    return digits;
  }

  async function saveRegistration(payload) {
    const url = cfg().GOOGLE_SCRIPT_URL;
    if (!url) {
      throw new Error(
        "Google Sheet not connected yet. Paste Web App URL in config.js (see google-apps-script/SETUP.md)."
      );
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (err) {
      throw new Error(
        "Server response invalid. Redeploy Apps Script as Web app (Anyone)."
      );
    }
    if (!result || result.success === false) {
      throw new Error((result && result.error) || "Registration failed.");
    }
    return result;
  }

  async function startRegistration() {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    if (!validateAge(data.age)) {
      setStatus("Age must be between 18 and 32 years.", true);
      return;
    }

    const whatsapp = normalizeWhatsapp(data.whatsapp);
    if (whatsapp.length !== 10) {
      setStatus("Please enter a valid 10-digit WhatsApp number.", true);
      return;
    }

    if (!form.consent || !form.consent.checked) {
      setStatus("Please confirm the age and attendance consent.", true);
      return;
    }

    persistForm();

    const payload = {
      ...data,
      whatsapp: whatsapp,
      consent: true,
      eventName: cfg().EVENT_NAME || "Youth Connect 3.0",
      amount: "1100",
      source: "Youth Connect Landing Page",
      submittedAt: new Date().toISOString(),
    };

    setLoading(true);
    setStatus("Saving your registration…");

    try {
      await saveRegistration(payload);
      const successUrl = cfg().SUCCESS_URL || "registration-success.html";
      window.location.href = successUrl;
    } catch (err) {
      console.error(err);
      setStatus(err.message || "Something went wrong. Please try again.", true);
      setLoading(false);
    }
  }
})();
