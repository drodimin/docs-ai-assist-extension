function onOpen(e) {
  DocumentApp.getUi()
    .createMenu('AI Assist')
    .addItem('Show/Hide Sidebar', 'toggleSidebar')
    .addItem('Autocomplete', 'autocomplete')
    .addToUi();
}

function toggleSidebar() {
  var ui = DocumentApp.getUi();
  var sidebar = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('AI Assist Toolbar')
      .setWidth(150);
  ui.showSidebar(sidebar);
}

function showInitialModal() {
  console.log('showInitialModal function called');
  const context = getContext(CONFIG.MAX_CONTEXT_SIZE);
  console.log('Context retrieved:', JSON.stringify(context));
  
  const html = HtmlService.createHtmlOutputFromFile('requestModal')
      .setWidth(600)
      .setHeight(500);
  console.log('HTML file loaded');
  
  DocumentApp.getUi().showModalDialog(html, 'Autocomplete');
  console.log('Modal dialog shown');
  
  const properties = {
    'contextBefore': context.before,
    'contextAfter': context.after,
    'maxTokens': CONFIG.MAX_TOKENS.toString(),
    'temperature': CONFIG.TEMPERATURE.toString(),
    'maxContextSize': CONFIG.MAX_CONTEXT_SIZE.toString()
  };

  console.log('Setting properties:', JSON.stringify(properties));
  PropertiesService.getUserProperties().setProperties(properties);
  console.log('Properties set');
}


function autocomplete() {
  showInitialModal();
}

function runAutocomplete(maxTokens, temperature, maxContextSize) {
  const context = getContext(maxContextSize);
  
  const userContent = {
    TEXT_BEFORE: context.before,
    TEXT_AFTER: context.after
  };

  console.log('Sending to API:', JSON.stringify(userContent));

  const completion = callOpenAI("gpt-4o-mini", maxTokens, temperature, CONFIG.PROMPT, userContent);
  console.log('Received completion:', JSON.stringify(completion));

  showResultModal(completion);
}

function showResultModal(result) {
  const html = HtmlService.createHtmlOutputFromFile('resultModal')
      .setWidth(600)
      .setHeight(500);
  DocumentApp.getUi().showModalDialog(html, 'Autocomplete Result');
  
  console.log('Storing result in UserProperties:', JSON.stringify(result));
  PropertiesService.getUserProperties().setProperty('autocompleteResult', JSON.stringify(result));
}

function getProperties(propertyNames) {
  const userProperties = PropertiesService.getUserProperties();
  const properties = {};
  propertyNames.forEach(name => {
    properties[name] = userProperties.getProperty(name);
  });
  return properties;
}

function getProperty(key) {
  return PropertiesService.getUserProperties().getProperty(key);
}