function getDocumentText() {
    const doc = DocumentApp.getActiveDocument();
    const body = doc.getBody();
    const text = body.getText();
    console.log('Full document text length:', text.length);
    return text;
  }
  
  function getCursorPosition() {
    const doc = DocumentApp.getActiveDocument();
    const selection = doc.getSelection();
    if (selection) {
      const elements = selection.getRangeElements();
      if (elements.length > 0) {
        const element = elements[0].getElement();
        const startOffset = elements[0].getStartOffset();
        if (startOffset !== null) {
          // If there's a valid start offset, use it
          return doc.getBody().getChildIndex(element) + startOffset;
        } else {
          // If startOffset is null, the entire element is selected
          // In this case, we assume the cursor is at the end of this element
          return doc.getBody().getChildIndex(element) + element.asText().getText().length;
        }
      }
    }
    // If no selection, assume cursor is at the end of the document
    return getDocumentText().length;
  }
  
  function getContext(maxContextSize) {
    const fullText = getDocumentText();
    const cursorPosition = getCursorPosition();
    
    console.log('Cursor position / Full text length:', cursorPosition, '/', fullText.length);
  
    let beforeContext = fullText.substring(0, cursorPosition);
    let afterContext = fullText.substring(cursorPosition);
    
    console.log('Initial before context length:', beforeContext.length);
    console.log('Initial after context length:', afterContext.length);
  
    const totalLength = beforeContext.length + afterContext.length;
    if (totalLength <= maxContextSize) {
      console.log('Total context size within limit');
      return { before: beforeContext, after: afterContext };
    }
    
    const halfSize = Math.floor(maxContextSize / 2);
    if (beforeContext.length > halfSize && afterContext.length > halfSize) {
      beforeContext = beforeContext.substring(beforeContext.length - halfSize);
      afterContext = afterContext.substring(0, halfSize);
    } else if (beforeContext.length > halfSize) {
      beforeContext = beforeContext.substring(beforeContext.length - (maxContextSize - afterContext.length));
    } else {
      afterContext = afterContext.substring(0, maxContextSize - beforeContext.length);
    }
    
    console.log('Final before context length:', beforeContext.length);
    console.log('Final after context length:', afterContext.length);
  
    return { before: beforeContext, after: afterContext };
  }

  function insertTextAtCursor(text) {
    const doc = DocumentApp.getActiveDocument();
    const cursor = doc.getCursor();
    
    if (cursor) {
      // If there's a cursor, insert the text at the cursor position
      const element = cursor.getElement();
      const offset = cursor.getOffset();
      element.insertText(offset, text);
    } else {
      // If there's no cursor, append the text to the end of the document
      const body = doc.getBody();
      body.appendParagraph(text);
    }
    
    // Optionally, move the cursor to the end of the inserted text
    const newPosition = doc.newPosition(cursor.getElement(), cursor.getOffset() + text.length);
    doc.setCursor(newPosition);
  }