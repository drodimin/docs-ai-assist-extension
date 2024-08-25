
function onOpen(e) {
  DocumentApp.getUi()
    .createMenu('AI Assist')
    .addItem('Show/Hide Sidebar', 'toggleSidebar')
    .addToUi();
}

function toggleSidebar() {
  var ui = DocumentApp.getUi();
  var sidebar = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('AI Assist Toolbar')
      .setWidth(150);
  ui.showSidebar(sidebar);
}

function getAutocompleteInput() {
  const cursorInfo = getCursorInfo();

  if(!cursorInfo) {
    // show error message
    throw new Error('No cursor found. Position the cursor in the document and try again.');
  }

  return cursorInfo;
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

function sendAutocompleteRequest(before, after, messageGuidelines, maxTokens) {
  const userContent = {
    TEXT_BEFORE: before,
    TEXT_AFTER: after,
    MESSAGE_GUIDELINES: messageGuidelines,
  };
  
  console.log('Sending to API:', JSON.stringify(userContent));
  
    const completion = callOpenAI("gpt-4o-mini", maxTokens, CONFIG.TEMPERATURE, CONFIG.PROMPT, userContent);
    console.log('Received completion:', JSON.stringify(completion));
    showResultModal(completion);
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

function getProperties(propertyNames) {
  const userProperties = PropertiesService.getUserProperties();
  const properties = {};
  propertyNames.forEach(name => {
    properties[name] = userProperties.getProperty(name);
  });
  return properties;
}

function saveProperties(properties) {
  const userProperties = PropertiesService.getUserProperties();
  Object.keys(properties).forEach(name => {
    userProperties.setProperty(name, properties[name]);
  });
}

function getProperty(key) {
  return PropertiesService.getUserProperties().getProperty(key);
}

function saveMessageGuidelines(messageGuidelines) {
  PropertiesService.getUserProperties().setProperty('messageGuidelines', messageGuidelines);
}

function saveSetting(property, value) {
  PropertiesService.getUserProperties().setProperty(property, value);
}
