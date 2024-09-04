// config.js
let CONFIG = {
  PROMPT_COMPLETE: `Generate text based on the following context:
<TEXT_BEFORE>: Content before the cursor (may be empty).
<TEXT_AFTER>: Content after the cursor (may be empty).
<MESSAGE_GUIDELINES>: Optional theme or message to convey.
Rules:
1. If both contexts exist, bridge them.
2. If <TEXT_AFTER> is empty, continue <TEXT_BEFORE>.
3. If <TEXT_BEFORE> is empty, lead into <TEXT_AFTER>.
Match existing style and tone. Incorporate <MESSAGE_GUIDELINES> if provided. Be concise (2-3 sentences unless more needed).
Return only the generated text.`,
  PROMPT_IMPROVE: `Improve the provided text by refining word choice, grammar, and sentence structure while keeping the length similar. Use the surrounding context to maintain flow and follow any additional instructions for style or tone.
  Arguments:
  <TEXT_BEFORE>: Text preceding the section to improve.
  <TEXT_AFTER>: Text following the section to improve.
  <TEXT_TO_IMPROVE>: The main text to enhance.
  <ADDITIONAL_INSTRUCTIONS>: Specific guidelines for the revision.
  Task:
  Return only the improved version of <TEXT_TO_IMPROVE>`,
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
