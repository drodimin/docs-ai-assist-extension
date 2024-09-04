function sendAutocompleteRequest(before, after, messageGuidelines, maxTokens) {
    const userPrompt = `<TEXT_BEFORE>${before}</TEXT_BEFORE><TEXT_AFTER>${after}</TEXT_AFTER><MESSAGE_GUIDELINES>${messageGuidelines}</MESSAGE_GUIDELINES>`;
    console.log('Sending to API:', userPrompt);

    const completion = callOpenAI("gpt-4o-mini", maxTokens, CONFIG.TEMPERATURE, CONFIG.PROMPT_COMPLETE, userPrompt);
    console.log('Received completion:', JSON.stringify(completion));
    showResultModal(completion);
}

function sendImproveRequest(before, after, selected, additionalInstructions, maxTokens) {
    const userPrompt = `<TEXT_BEFORE>${before}</TEXT_BEFORE><TEXT_AFTER>${after}</TEXT_AFTER><TEXT_TO_IMPROVE>${selected}</TEXT_TO_IMPROVE><ADDITIONAL_INSTRUCTIONS>${additionalInstructions}</ADDITIONAL_INSTRUCTIONS>`;
    console.log('Sending to API:', userPrompt);

    const completion = callOpenAI("gpt-4o-mini", maxTokens, CONFIG.TEMPERATURE, CONFIG.PROMPT_IMPROVE, userPrompt);
    console.log('Received completion:', completion);

    const data = {
        before: before,
        after: after,
        selected: selected,
        additionalInstructions: additionalInstructions,
        completion: completion
    }
    showResultModal(data);
}