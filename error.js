function showError(errorMessage) {
    const html = HtmlService.createHtmlOutput(`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #d32f2f; }
            button { padding: 10px 20px; background-color: #1976d2; color: white; border: none; cursor: pointer; }
          </style>
        </head>
        <body>
          <h2>Error</h2>
          <p>${errorMessage}</p>
          <button onclick="google.script.host.close()">Close</button>
        </body>
      </html>
    `)
    .setWidth(400)
    .setHeight(200);
    DocumentApp.getUi().showModalDialog(html, 'Error');
  }