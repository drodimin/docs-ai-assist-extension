// api.js
function callOpenAI(modelName, maxTokens, temperature, systemPrompt, userContent) {
    const url = 'https://api.openai.com/v1/chat/completions';
    const payload = {
      model: modelName,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify(userContent) }
      ],
      max_tokens: maxTokens,
      temperature: temperature,
      response_format: { "type": "json_object" }
    };
  
    const options = {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + LOCAL_CONFIG.OPENAI_API_KEY,
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify(payload)
    };
  
    const response = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(response.getContentText());
    return JSON.parse(json.choices[0].message.content);
  }