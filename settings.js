const getMaxTokens = () => {
    const running = PropertiesService.getUserProperties().getProperty('maxTokens');
    if(running === null){
      return CONFIG.MAX_TOKENS;
    } else {
      return Number(running);
    }
}  

const setMaxTokens = (value) => {
    PropertiesService.getUserProperties().setProperty('maxTokens', value);
  }

  const getMessageGuidelines = () => {
    return PropertiesService.getUserProperties().getProperty('messageGuidelines');
  }

  const setMessageGuidelines = (value) => {
    PropertiesService.getUserProperties().setProperty('messageGuidelines', value);
  }

  const getSettings = () => {
    return {
      maxTokens: getMaxTokens(),
      messageGuidelines: getMessageGuidelines()
    }
  }

  const saveSettings = (settings) => {
    // iterate over settings key
    for (const key in settings) {
      switch (key) {
        case 'maxTokens':
          setMaxTokens(settings[key]);
          break;
        case 'messageGuidelines':
          setMessageGuidelines(settings[key]);
          break;
      }
    }
  }