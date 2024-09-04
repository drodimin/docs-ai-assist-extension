function callOpenAI(modelName, maxTokens, temperature, systemPrompt, userPrompt) {
  const url = 'https://api.openai.com/v1/chat/completions';
  
  const payload = {
    model: modelName,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    max_tokens: maxTokens,
    temperature: temperature,
  };

  const options = {
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + CONFIG.OPENAI_API_KEY,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  console.log('Request payload:', JSON.stringify(payload, null, 2));

  try {
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();
    
    if (responseCode !== 200) {
      throw new Error(`API request failed with status ${responseCode}: ${responseText}`);
    }

    const json = JSON.parse(responseText);
    console.log('Response JSON:', JSON.stringify(json, null, 2));
    
    if (json.choices && json.choices.length > 0 && json.choices[0].message && json.choices[0].message.content) {
      let content = json.choices[0].message.content;
      
      // Check if the response was truncated due to token limit
      if (json.choices[0].finish_reason === "length") {
        throw new Error("TOKEN_LIMIT_REACHED");
      }
      
      return content;
    } else {
      throw new Error('Unexpected response format from OpenAI API');
    }
  } catch (error) {
    console.error('Error in callOpenAI:', error);
    throw error;
  }
}