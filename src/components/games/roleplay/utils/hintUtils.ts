
/**
 * Helper function to get appropriate Arabic phrase based on the prompt
 */
export const getHintPhraseForStage = (prompt: string): string => {
  const promptLower = prompt.toLowerCase();
  
  if (promptLower.includes("greet")) {
    return "أهلاً، صباح الخير";
  } else if (promptLower.includes("thank")) {
    return "شكراً جزيلاً";
  } else if (promptLower.includes("ask")) {
    return "لو سمحت، ممكن أسأل";
  } else if (promptLower.includes("order")) {
    return "عايز أطلب";
  } else if (promptLower.includes("pay")) {
    return "بكام ده؟";
  } else {
    return "ماشي، فاهم";
  }
};

/**
 * Helper function to get appropriate Arabic spoken phrase
 */
export const getHintSpokenForStage = (prompt: string): string => {
  const promptLower = prompt.toLowerCase();
  
  if (promptLower.includes("greet")) {
    return "Ahlan, sabah el-kheer";
  } else if (promptLower.includes("thank")) {
    return "Shukran gazilan";
  } else if (promptLower.includes("ask")) {
    return "Law samaht, momken as'al";
  } else if (promptLower.includes("order")) {
    return "Ayez atlab";
  } else if (promptLower.includes("pay")) {
    return "Bekam dah?";
  } else {
    return "Mashi, fahim";
  }
};
