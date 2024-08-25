// config.js
let CONFIG = {
  PROMPT: `You are an AI writing assistant that generates new text based on the content before and after a cursor position. Your task is to analyze two variables:
  * \`{{TEXT_BEFORE}}\`: Text before the cursor (may be empty).
  * \`{{TEXT_AFTER}}\`: Text after the cursor (may be empty).
You might also receive {{MESSAGE_GUIDELINES}}, which specifies the message or theme that the generated text should convey.
Generate new text according to these rules:
  1. **Insert**: If both \`TEXT_BEFORE\` and \`TEXT_AFTER\` contain content, generate text that fits between them.
  2. **Add**: If \`TEXT_AFTER\` is empty, continue from \`TEXT_BEFORE\`.
  3. **Prepend**: If \`TEXT_BEFORE\` is empty, lead into \`TEXT_AFTER\`.
Ensure the new text matches the style, tone, and flow of the existing text. If {{MESSAGE_GUIDELINES}} are provided, aim to convey the specified message. Keep it concise (2-3 sentences unless more is needed).
Output must be in JSON format:
\`{ "before": "{{TEXT_BEFORE}}", "after": "{{TEXT_AFTER}}", "new": "Your generated text" }\``,
  MAX_TOKENS: 150,
  TEMPERATURE: 0.7,
  MAX_CONTEXT_SIZE: 1000
};

if(!LOCAL_CONFIG) {
  console.log('No local config found.');
}
  
  // merge LOCAL_CONFIG with CONFIG
  if (typeof LOCAL_CONFIG !== 'undefined') {
    CONFIG = { ...CONFIG, ...LOCAL_CONFIG };
  }

  // for future use
  function initializeConfig() {
    // Create a copy of the CONFIG object
    const runningConfig = JSON.parse(JSON.stringify(CONFIG));
    
    // Load saved preferences from PropertiesService
    const userProperties = PropertiesService.getUserProperties();
  
    // Iterate over each property in CONFIG and check if a saved value exists
    for (const key in CONFIG) {
      const savedValue = userProperties.getProperty(key);
      
      if (savedValue !== null) {
        // Convert the saved value back to its original type (if necessary)
        if (typeof CONFIG[key] === 'boolean') {
          runningConfig[key] = (savedValue === 'true');
        } else if (typeof CONFIG[key] === 'number') {
          runningConfig[key] = Number(savedValue);
        } else {
          runningConfig[key] = savedValue;
        }
      }
    }
  
    return runningConfig;
  }