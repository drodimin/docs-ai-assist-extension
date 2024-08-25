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

const insertTextAtCursor = (text) => {
  const document = DocumentApp.getActiveDocument();
  const cursor = document.getCursor();
  if (!cursor) {
    throw new Error('No cursor found. Position the cursor in the document and try again.');
  }
  cursor.insertText(text);
}