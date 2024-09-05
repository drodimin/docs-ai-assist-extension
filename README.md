# Docs-AI-assist-extension

Google Docs extension for AI text writing assistance. It is intended for local running using your own API key but might be published in the future.

Current features include:
- Generating text based on context 
- Improving selected text

Currently, it is interfaced with OpenAI chat completion API with the possibility to extend to multi-model in the future.

## Install Extension Locally
1. Clone repo
> git clone git@github.com:drodimin/docs-ai-assist-extension.git
2. Install clasp globally
> npm install @google/clasp -g
3. Authenticate clasp
> clasp login
4. Rename `0.config.local.example.js` to `0.config.local.js` and paste your OpenAI API key in it
5. Create AppScript project, follow instructions to enable App Script API if needed
> clasp create
6. Push code to your project
> clasp push
7. In Google Scripts, find your project and create a test deployment selecting 'Editor Add-on' and a document of your choice, then execute the test to deploy the extension.

## Usage
1. In the document, access Extensions -> Docs-AI-assist-extension -> Show/Hide Sidebar. For the first time, you will be asked to authenticate.
2. **Text Complete** - Position cursor at the beginning, middle, or end of the paragraph and click Autocomplete in Sidebar
3. **Text Improve** - Select a portion of text within a paragraph and click Improve in Sidebar

