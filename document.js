const getCursorInfo = () => {
  const document = DocumentApp.getActiveDocument();
  const cursor = document.getCursor();
  if (cursor) {
    return{
      element: {
        type: String(cursor.getElement().getType()),
            },
      offset: cursor.getOffset(),
      surroundingText: cursor.getSurroundingText().getText(),
      surroundingTextOffset: cursor.getSurroundingTextOffset()
    };
  }
  return null;
}

function getSelectionInfo() {
  var document = DocumentApp.getActiveDocument();
  var selection = document.getSelection();

  if (!selection) {
    Logger.log('No selection found.');
    return null;
  }

  var selectedElements = selection.getSelectedElements();

  // Check if there's more than one element selected
  if (selectedElements.length > 1) {
    Logger.log('More than one element selected.');
    return null;
  }

  var selectedElement = selectedElements[0];
  var element = selectedElement.getElement();

  // Ensure the selected element is text
  if (element.getType() !== DocumentApp.ElementType.TEXT) {
    Logger.log('The selected element is not text.');
    return null;
  }

  var textElement = element.asText();
  var fullText = textElement.getText();
  
  // Handle partial selection
  if (selectedElement.isPartial()) {
    var selectedText = fullText.substring(selectedElement.getStartOffset(), selectedElement.getEndOffsetInclusive() + 1);
    Logger.log('Selected Text: ' + selectedText);
    return {
      elementType: String(element.getType()),
      fullText: fullText,
      selectedText: selectedText,
      startOffset: selectedElement.getStartOffset(),
      endOffsetInclusive: selectedElement.getEndOffsetInclusive()
    };
  } else {
    Logger.log('Selected Full Text: ' + fullText);
    return {
      elementType: String(element.getType()),
      fullText: fullText,
      selectedText: fullText, // Full element selected
      startOffset: 0,
      endOffsetInclusive: fullText.length - 1
    };
  }
}

const insertTextAtCursor = (text) => {
  const document = DocumentApp.getActiveDocument();
  const cursor = document.getCursor();
  if (!cursor) {
    throw new Error('No cursor found. Position the cursor in the document and try again.');
  }
  cursor.insertText(text);
}

function replaceSelection(newText) {
  var document = DocumentApp.getActiveDocument();
  var selection = document.getSelection();

  if (!selection) {
    Logger.log('No selection found.');
    return;
  }

  var selectedElements = selection.getSelectedElements();

  if (selectedElements.length !== 1) {
    Logger.log('Selection spans multiple elements or no elements.');
    return;
  }

  var selectedElement = selectedElements[0];
  var element = selectedElement.getElement();

  if (element.getType() !== DocumentApp.ElementType.TEXT) {
    Logger.log('The selected element is not text.');
    return;
  }

  var textElement = element.asText();
  
  if (selectedElement.isPartial()) {
    var startOffset = selectedElement.getStartOffset();
    var endOffsetInclusive = selectedElement.getEndOffsetInclusive();
    
    // Delete the selected text and insert the new text
    textElement.deleteText(startOffset, endOffsetInclusive);
    textElement.insertText(startOffset, newText);
  } else {
    // If the entire element is selected, replace all the text
    textElement.setText(newText);
  }

  Logger.log('Text replaced successfully.');
}