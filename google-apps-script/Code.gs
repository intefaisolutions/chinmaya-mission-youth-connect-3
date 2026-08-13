/**
 * Youth Connect 3.0 — Google Apps Script
 * --------------------------------------
 * Saves landing-page registrations into the bound Google Sheet.
 *
 * SETUP:
 *   1. Create a Google Sheet (e.g. "Youth Connect 3.0 Registrations")
 *   2. Extensions → Apps Script
 *   3. Paste this Code.gs (replace default code)
 *   4. File → Project settings → check "Show appsscript.json"
 *      OR add appsscript.json from this folder
 *   5. Deploy → New deployment → Web app
 *        Execute as: Me
 *        Who has access: Anyone
 *   6. Copy the Web app URL → paste into config.js → GOOGLE_SCRIPT_URL
 *   7. After any Code.gs change: Deploy → Manage deployments → Edit → New version → Deploy
 */

const SHEET_NAME = "Registrations";
const EVENT_NAME = "Youth Connect 3.0";
const DEFAULT_AMOUNT = "1100";

const HEADERS = [
  "Timestamp",
  "First Name",
  "Last Name",
  "Age",
  "Gender",
  "WhatsApp",
  "Email",
  "City",
  "College / Occupation",
  "Emergency Contact",
  "Motivation",
  "Consent",
  "Event",
  "Amount (INR)",
  "Status",
  "Source",
];

function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) || "{}";
    const data = JSON.parse(raw);
    return handleRegistration_(data);
  } catch (err) {
    return json_({ success: false, error: String(err) });
  }
}

function doGet() {
  return json_({
    ok: true,
    version: "youth-connect-v1",
    message: "Youth Connect 3.0 registration endpoint.",
    event: EVENT_NAME,
  });
}

function handleRegistration_(data) {
  const sheet = getOrCreateSheet_();

  const email = String(data.email || "")
    .trim()
    .toLowerCase();
  const phone = normalizePhone_(data.whatsapp || "");
  const firstName = String(data.firstName || "").trim();
  const lastName = String(data.lastName || "").trim();
  const age = String(data.age || "").trim();

  if (!firstName) {
    return json_({ success: false, error: "First name is required." });
  }
  if (!email) {
    return json_({ success: false, error: "Email is required." });
  }
  if (!phone) {
    return json_({ success: false, error: "WhatsApp number is required." });
  }

  const ageNum = Number(age);
  if (!Number.isInteger(ageNum) || ageNum < 18 || ageNum > 32) {
    return json_({ success: false, error: "Age must be between 18 and 32." });
  }

  const consent =
    data.consent === true ||
    data.consent === "on" ||
    data.consent === "true" ||
    data.consent === "Yes"
      ? "Yes"
      : "No";

  sheet.appendRow([
    new Date(),
    firstName,
    lastName,
    age,
    data.gender || "",
    phone,
    email,
    data.city || "",
    data.occupation || "",
    data.emergencyContact || "",
    data.motivation || "",
    consent,
    data.eventName || data.event || EVENT_NAME,
    String(data.amount || DEFAULT_AMOUNT),
    "Registered — Payment Pending",
    data.source || "Youth Connect Landing Page",
  ]);

  return json_({
    success: true,
    message: "Registration saved.",
  });
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error(
      "No spreadsheet bound. Open Apps Script from the Google Sheet (Extensions → Apps Script)."
    );
  }

  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, HEADERS.length);
  } else {
    const lastCol = sheet.getLastColumn();
    if (lastCol < HEADERS.length) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    }
  }

  return sheet;
}

function normalizePhone_(value) {
  let digits = String(value || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) digits = "91" + digits;
  if (digits.length === 11 && digits.charAt(0) === "0") {
    digits = "91" + digits.slice(1);
  }
  return digits;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * Run once from the Apps Script editor to verify sheet headers are created.
 */
function setupSheet() {
  getOrCreateSheet_();
  Logger.log("Sheet ready: " + SHEET_NAME);
}
