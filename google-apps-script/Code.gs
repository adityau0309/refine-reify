/**
 * Google Apps Script Web App for Recify Website Form Submissions
 *
 * Destination Email: aditya.u0309@gmail.com
 * Destination Sheet: Active Spreadsheet (auto-configured)
 */

const RECIPIENT_EMAIL = "aditya.u0309@gmail.com";
const TIMEZONE = "Asia/Kolkata";
const RATE_LIMIT_SECONDS = 60; // Max 1 submission per email per 60 seconds

/**
 * Health check endpoint for testing Web App availability.
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "ok",
      message: "Recify Lead Webhook is active and listening for POST submissions.",
      timestamp: Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd HH:mm:ss 'IST'"),
    }),
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handles incoming POST submissions.
 * Using Content-Type: text/plain in the client fetch avoids browser CORS preflight (OPTIONS) requests.
 */
function doPost(e) {
  try {
    // 1. Verify request contents
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ status: "error", message: "No data payload received" });
    }

    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return jsonResponse({ status: "error", message: "Invalid JSON format" });
    }

    // 2. Spam Honeypot Check: silently discard bots if honeypot is filled
    if (data._hp || data.honeypot || data.website_hp) {
      return jsonResponse({ status: "ok", message: "Submission received" });
    }

    // 3. Meaningful field validation
    const name = data.fullName || data.name || "";
    const email = (data.email || "").toString().trim().toLowerCase();
    const phone = data.phone || "";
    const formName = data.formName || data.form_type || "Website Form";

    if (!email && !name && !phone) {
      return jsonResponse({
        status: "error",
        message:
          "Validation failed: at least one contact identifier (name, email, or phone) is required.",
      });
    }

    // 4. Basic rate limiting per email using CacheService
    if (email) {
      const cache = CacheService.getScriptCache();
      const cacheKey = "rate_limit_" + Utilities.base64Encode(email).substring(0, 32);
      if (cache.get(cacheKey)) {
        return jsonResponse({
          status: "error",
          message: "Please wait a moment before submitting again.",
        });
      }
      cache.put(cacheKey, "active", RATE_LIMIT_SECONDS);
    }

    // 5. Build standardized metadata
    const timestampIST = Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd HH:mm:ss 'IST'");
    const pageUrl = data.pageUrl || data.page_url || "Direct Submission";
    const userAgent = data.userAgent || data.user_agent || "Not provided";

    // Prepare cleaned fields dictionary for email & sheet (exclude honeypot)
    const cleanedFields = {};
    for (const key of Object.keys(data)) {
      if (key !== "_hp" && key !== "honeypot" && key !== "website_hp") {
        cleanedFields[key] = data[key];
      }
    }
    cleanedFields["Submitted At (IST)"] = timestampIST;

    // 6. Execute Email & Sheet in isolated try/catch blocks
    let emailSuccess = false;
    let sheetSuccess = false;
    let emailErrorMsg = "";
    let sheetErrorMsg = "";

    // A. Send Email to aditya.u0309@gmail.com
    try {
      sendLeadEmail({
        recipient: RECIPIENT_EMAIL,
        formName: formName,
        name: name,
        email: email,
        timestampIST: timestampIST,
        pageUrl: pageUrl,
        userAgent: userAgent,
        fields: cleanedFields,
      });
      emailSuccess = true;
    } catch (err) {
      emailErrorMsg = err.toString();
      Logger.log("Email sending error: " + emailErrorMsg);
    }

    // B. Save to Google Sheet (auto-creates headers, auto-appends new columns)
    try {
      saveToGoogleSheet(cleanedFields);
      sheetSuccess = true;
    } catch (err) {
      sheetErrorMsg = err.toString();
      Logger.log("Sheet appending error: " + sheetErrorMsg);
    }

    // If at least one channel succeeded, consider the submission successful
    if (emailSuccess || sheetSuccess) {
      return jsonResponse({
        status: "ok",
        message: "Lead processed successfully",
        emailSent: emailSuccess,
        sheetSaved: sheetSuccess,
      });
    } else {
      return jsonResponse({
        status: "error",
        message: "Failed to process lead: " + (emailErrorMsg || sheetErrorMsg),
      });
    }
  } catch (globalError) {
    Logger.log("Global doPost error: " + globalError.toString());
    return jsonResponse({
      status: "error",
      message: "Server exception: " + globalError.toString(),
    });
  }
}

/**
 * Builds and sends the HTML and plain-text notification email.
 */
function sendLeadEmail(params) {
  const leadIdentifier = params.name || params.email || "New Prospect";
  const subject =
    "New Lead: " + params.formName + " - " + leadIdentifier + " - " + params.timestampIST;

  // Build clean HTML table
  let tableRowsHtml = "";
  let plainTextBody = "NEW LEAD SUBMISSION - RECIFY\n";
  plainTextBody += "========================================\n\n";

  for (const [key, value] of Object.entries(params.fields)) {
    const formattedKey = formatLabel(key);
    const displayValue = formatValue(value);

    plainTextBody += formattedKey + ": " + displayValue + "\n";

    tableRowsHtml += `
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; width: 35%; background-color: #f8fafc; font-size: 13px;">
          ${escapeHtml(formattedKey)}
        </td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 13px;">
          ${escapeHtml(displayValue)}
        </td>
      </tr>
    `;
  }

  const htmlBody = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 24px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <div style="background-color: #0f172a; padding: 24px 28px; color: #ffffff;">
            <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; font-weight: 700;">
              RECIFY LEAD NOTIFICATION
            </p>
            <h1 style="margin: 6px 0 0 0; font-size: 22px; font-weight: 700; color: #f8fafc;">
              ${escapeHtml(params.formName)}
            </h1>
          </div>

          <!-- Metadata Pill Bar -->
          <div style="background-color: #f8fafc; padding: 12px 28px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            <strong>Submitted:</strong> ${params.timestampIST}
          </div>

          <!-- Fields Table -->
          <div style="padding: 24px 28px;">
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
              <tbody>
                ${tableRowsHtml}
              </tbody>
            </table>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 16px 28px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
            This lead was automatically captured from <a href="https://recify.in" style="color: #2563eb; text-decoration: none;">recify.in</a>.
          </div>

        </div>
      </body>
    </html>
  `;

  const emailOptions = {
    to: params.recipient,
    subject: subject,
    body: plainTextBody,
    htmlBody: htmlBody,
  };

  // Add replyTo if a valid email was supplied
  if (params.email && params.email.includes("@")) {
    emailOptions.replyTo = params.email;
  }

  MailApp.sendEmail(emailOptions);
}

/**
 * Appends the submission row to the active Google Sheet.
 * Automatically initializes headers on an empty sheet and dynamically adds new columns for new fields.
 */
function saveToGoogleSheet(fields) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();

  if (!sheet) {
    sheet = ss.insertSheet("Submissions");
  }

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  let existingHeaders = [];
  if (lastRow > 0 && lastCol > 0) {
    existingHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  }

  // If sheet is empty, establish primary headers
  if (existingHeaders.length === 0) {
    existingHeaders = [
      "Submitted At (IST)",
      "Form Name",
      "Full Name",
      "Email",
      "Company",
      "Phone",
      "Page URL",
    ];
    sheet.getRange(1, 1, 1, existingHeaders.length).setValues([existingHeaders]);
    sheet.getRange(1, 1, 1, existingHeaders.length).setFontWeight("bold").setBackground("#f1f5f9");
    sheet.setFrozenRows(1);
  }

  // Check for any new fields not present in existing headers, and dynamically append columns
  for (const key of Object.keys(fields)) {
    const headerLabel = formatLabel(key);
    if (!existingHeaders.includes(headerLabel)) {
      const newColIndex = sheet.getLastColumn() + 1;
      sheet
        .getRange(1, newColIndex)
        .setValue(headerLabel)
        .setFontWeight("bold")
        .setBackground("#f1f5f9");
      existingHeaders.push(headerLabel);
    }
  }

  // Construct row data matching header order
  const newRow = existingHeaders.map((header) => {
    // Check direct match or normalized key match
    if (fields[header] !== undefined) {
      return formatValue(fields[header]);
    }
    for (const [key, val] of Object.entries(fields)) {
      if (formatLabel(key) === header) {
        return formatValue(val);
      }
    }
    return "";
  });

  sheet.appendRow(newRow);
}

/**
 * Helper: Formats camelCase or snake_case keys into readable Title Case labels.
 */
function formatLabel(key) {
  if (!key) return "";
  if (key.includes(" ") || key.includes("(")) return key;

  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();
}

/**
 * Helper: Formats values (objects, arrays, booleans) into strings.
 */
function formatValue(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return value.toString();
}

/**
 * Helper: Escapes HTML special characters.
 */
function escapeHtml(text) {
  if (!text) return "";
  return text
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Helper: Standard JSON output with CORS headers.
 */
function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
