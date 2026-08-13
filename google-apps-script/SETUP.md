# Connect Youth Connect form → Google Sheet

## 1. Create the Sheet
1. Open [Google Sheets](https://sheets.google.com) → **Blank spreadsheet**
2. Name it: `Youth Connect 3.0 Registrations`

## 2. Add Apps Script
1. In the Sheet: **Extensions → Apps Script**
2. Delete any default code
3. Copy everything from `google-apps-script/Code.gs` into `Code.gs`
4. Optional: **Project Settings → Show "appsscript.json" manifest** and paste `google-apps-script/appsscript.json`
5. Click **Save**

## 3. Create the sheet tab (once)
1. In Apps Script, select function `setupSheet`
2. Click **Run** → Allow permissions when asked
3. Back in the Sheet you should see a **Registrations** tab with headers

## 4. Deploy as Web App
1. **Deploy → New deployment**
2. Type: **Web app**
3. Description: `Youth Connect registrations`
4. Execute as: **Me**
5. Who has access: **Anyone**
6. **Deploy** → copy the **Web app URL** (`…/exec`)

## 5. Paste URL in the website
Open `config.js` and set:

```js
GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/XXXX/exec",
```

Save, then hard-refresh the landing page and submit a test registration.  
The row should appear in the **Registrations** sheet within a few seconds.

## After code changes
**Deploy → Manage deployments → Edit (pencil) → New version → Deploy**
