
# Google Apps Script Setup Instructions

## Step 1: Create a Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Laboratory Management System"
3. Create the following sheets (tabs):
   - `Bookings` - for room bookings
   - `AccessRequests` - for door access requests
   - `Backups` - for backup records

## Step 2: Set up the sheets with headers

### Bookings Sheet Headers (Row 1):
| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Room | Date | Start Time | End Time | Purpose | Attendees | Booked By | Timestamp |

### AccessRequests Sheet Headers (Row 1):
| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Full Name | Student ID | Email | Department | Supervisor | Reason | Selected Areas | Timestamp | Status |

### Backups Sheet Headers (Row 1):
| A | B | C | D | E |
|---|---|---|---|---|
| File Name | Description | Size | Timestamp | Status |

## Step 3: Create Google Apps Script

1. In your Google Sheet, go to `Extensions > Apps Script`
2. Replace the default code with the following:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    const requestData = data.data;
    
    switch (action) {
      case 'createBooking':
        return createBooking(requestData);
      case 'getBookings':
        return getBookings();
      case 'createAccessRequest':
        return createAccessRequest(requestData);
      case 'getAccessRequests':
        return getAccessRequests();
      case 'createBackup':
        return createBackup(requestData);
      case 'getBackups':
        return getBackups();
      default:
        return ContentService
          .createTextOutput(JSON.stringify({ error: 'Unknown action' }))
          .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function createBooking(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bookings');
  sheet.appendRow([
    data.room,
    data.date,
    data.startTime,
    data.endTime,
    data.purpose,
    data.attendees,
    data.bookedBy,
    data.timestamp
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getBookings() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bookings');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const bookings = rows.map(row => {
    const booking = {};
    headers.forEach((header, index) => {
      booking[header] = row[index];
    });
    return booking;
  });
  
  return ContentService
    .createTextOutput(JSON.stringify({ bookings }))
    .setMimeType(ContentService.MimeType.JSON);
}

function createAccessRequest(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('AccessRequests');
  sheet.appendRow([
    data.fullName,
    data.studentId,
    data.email,
    data.department,
    data.supervisor,
    data.reason,
    data.selectedAreas.join(', '),
    data.timestamp,
    data.status
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getAccessRequests() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('AccessRequests');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const requests = rows.map(row => {
    const request = {};
    headers.forEach((header, index) => {
      request[header] = row[index];
    });
    return request;
  });
  
  return ContentService
    .createTextOutput(JSON.stringify({ requests }))
    .setMimeType(ContentService.MimeType.JSON);
}

function createBackup(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Backups');
  sheet.appendRow([
    data.fileName,
    data.description,
    data.size,
    data.timestamp,
    data.status
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getBackups() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Backups');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const backups = rows.map(row => {
    const backup = {};
    headers.forEach((header, index) => {
      backup[header] = row[index];
    });
    return backup;
  });
  
  return ContentService
    .createTextOutput(JSON.stringify({ backups }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Step 4: Deploy the Apps Script

1. Click on `Deploy > New deployment`
2. Choose type: `Web app`
3. Description: `Laboratory Management API`
4. Execute as: `Me`
5. Who has access: `Anyone` (or `Anyone with Google account` for more security)
6. Click `Deploy`
7. Copy the Web App URL

## Step 5: Update the Frontend

1. In the file `src/services/googleSheetsApi.ts`, replace `YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` with your actual Web App URL

## Step 6: Test the Integration

1. Try booking a room through the website
2. Check your Google Sheet to see if the data appears
3. Test other features like door access requests

## Security Considerations

- Consider limiting access to "Anyone with Google account" instead of "Anyone"
- You can add authentication by requiring users to sign in with Google
- Validate and sanitize all input data in the Apps Script functions
- Consider adding rate limiting for production use

## Troubleshooting

- If you get CORS errors, make sure the Apps Script is deployed as a web app
- Check the Apps Script execution log for any errors
- Ensure all sheet names match exactly (case-sensitive)
- Verify that the headers in your sheets match the expected format
