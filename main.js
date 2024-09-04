
function onOpen(e) {
  DocumentApp.getUi()
    .createMenu('AI Assist')
    .addItem('Show/Hide Sidebar', 'toggleSidebar')
    .addItem('Show inspectorsidebar', 'showInspectorSidebar')
    .addToUi(); 
}

function toggleSidebar() {
  var ui = DocumentApp.getUi();
  var sidebar = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('AI Assist Toolbar')
      .setWidth(150);
  ui.showSidebar(sidebar);
}

function showRequestModal(data) {
  const template = HtmlService.createTemplateFromFile('requestModal');
  template.data = data;
  const html = template.evaluate()
      .setTitle('Autocomplete Request')
      .setWidth(600)
      .setHeight(600);
  DocumentApp.getUi().showModalDialog(html, 'Autocomplete Request');
}

function showModal(data, nameOfModal, title) {
  const template = HtmlService.createTemplateFromFile(nameOfModal);
  template.data = data;
  const html = template.evaluate()
      .setTitle(title)
      .setWidth(600)
      .setHeight(600);
  DocumentApp.getUi().showModalDialog(html, 'Autocomplete Request');
}
function showResultModal(data) {
  const template = HtmlService.createTemplateFromFile('resultModal');
  template.data = data;
  const html = template.evaluate()
      .setTitle('Autocomplete Result')
      .setWidth(600)
      .setHeight(600);
  DocumentApp.getUi().showModalDialog(html, 'Autocomplete Result');
}

// functions for getting input from document
function getImproveInput() {
  const selection = getSelectionInfo();
  if(!selection) {
    throw new Error('No selection found. Select text in single paragraph and try again.');
  }
  return selection;
}

function getAutocompleteInput() {
  const cursorInfo = getCursorInfo();

  if(!cursorInfo) {
    throw new Error('No cursor found. Position the cursor in the document and try again.');
  }

  return cursorInfo;
}
