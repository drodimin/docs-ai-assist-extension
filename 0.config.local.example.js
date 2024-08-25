// 0.config.local.example.js --> rename it to 0.config.local.js
// the reason filename must start with 0 is so that the position of the file
// in the AppScript project is before the config.js file
// as we push all the files with clasp to the AppScript project
const LOCAL_CONFIG = {
    OPENAI_API_KEY: 'your-openai-api-key-here'
};