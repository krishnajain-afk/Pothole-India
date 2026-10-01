/**
 * Cars24 Patch: receives sign-ups from the website and appends them to a Google Sheet.
 *
 * Setup (about two minutes):
 *   1. Open the "Pothole India email list" sheet, then Extensions > Apps Script.
 *   2. Delete whatever is in the editor, paste this whole file, and click Save.
 *   3. Click Deploy > New deployment > the gear icon > Web app.
 *        Execute as:      Me
 *        Who has access:  Anyone
 *   4. Click Deploy, approve the permission prompt (Advanced > Go to project), and copy the
 *      "Web app URL". It ends in /exec.
 *   5. Paste that URL into the site's CONFIG.endpoint.
 *
 * If you edit this script later, use Deploy > Manage deployments > Edit > New version, so the URL stays the same.
 */

var SHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';
var HEADERS = ['Timestamp', 'Email', 'Source', 'Page'];
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var body = {};
    try { body = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { return reply({ ok: false, error: 'bad json' }); }

    var email = String(body.email || '').trim().toLowerCase();
    // A leading = + - @ would be run as a formula by Sheets, so refuse those outright.
    if (email.length > 254 || !EMAIL_RE.test(email) || /^[=+\-@]/.test(email)) return reply({ ok: false, error: 'invalid email' });

    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    var last = sheet.getLastRow();
    if (last > 1) {
      var existing = sheet.getRange(2, 2, last - 1, 1).getValues();
      for (var i = 0; i < existing.length; i++) {
        if (String(existing[i][0]).toLowerCase() === email) return reply({ ok: true, duplicate: true });
      }
    }

    sheet.appendRow([new Date(), email, safe(body.source, 40), safe(body.page, 300)]);
    return reply({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// Opening the Web app URL in a browser just confirms it is live. It never exposes the list.
function doGet() {
  return reply({ ok: true, service: 'pothole-india-signups' });
}

function safe(value, max) {
  var s = String(value || '').slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
