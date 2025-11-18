export default function generateResults(
  accuracy: number,
  fluency: number,
  intonation: number
) {
  const accuracyScore = accuracyResults(accuracy);
  const fluencyScore = fluencyResults(fluency);
  const intonationScore = intonationResults(intonation);
  return {
    accuracy: accuracyScore,
    fluency: fluencyScore,
    intonation: intonationScore,
  };
}

const accuracyResults = (accuracy: number) => {
  if (accuracy <= 10 && accuracy > 0) {
    return {
      score: accuracy,
      feedback: "The audio appears to contain non-speech sounds.",
      grade: "very-low",
      remarks: [
        "Mostly non-speech sounds.",
        "No clear pronunciation detected.",
      ],
    };
  }

  if (accuracy <= 59 && accuracy > 10) {
    return {
      score: accuracy,
      feedback:
        "The pronunciation is not very clear, and the sounds are not accurately produced.",
      grade: "low",
      remarks: [
        "Pronunciation is unclear.",
        "Sounds are not produced accurately.",
        "Needs significant improvement.",
      ],
    };
  }

  if (accuracy <= 79 && accuracy > 59) {
    return {
      score: accuracy,
      feedback: "Good accuracy overall, but could be more distinct.",
      grade: "medium",
      remarks: [
        "Good accuracy but could be clearer.",
        "Some sounds are slightly off.",
        "Work on sharper articulation.",
      ],
    };
  }

  if (accuracy <= 100 && accuracy > 79) {
    return {
      score: accuracy,
      feedback: "Very accurate pronunciation of each word.",
      grade: "high",
      remarks: [
        "Very accurate pronunciation.",
        "Clear and well-produced sounds.",
        "Excellent word accuracy.",
      ],
    };
  }
};

const fluencyResults = (fluency: number) => {
  if (fluency <= 10 && fluency > 0) {
    return {
      score: fluency,
      feedback: "The audio appears to contain non-speech sounds.",
      grade: "very-low",
      remarks: ["Mostly non-speech sounds.", "No fluent speech detected."],
    };
  }

  if (fluency <= 59 && fluency > 10) {
    return {
      score: fluency,
      feedback: "The speech is hesitant and lacks a natural flow.",
      grade: "low",
      remarks: [
        "Hesitant and uneven flow.",
        "Speech lacks smooth pace.",
        "Sounds choppy or broken.",
      ],
    };
  }

  if (fluency <= 79 && fluency > 59) {
    return {
      score: fluency,
      feedback:
        "The pace is reasonable, but the mispronunciation affects the overall flow.",
      grade: "medium",
      remarks: [
        "Decent pace but not smooth enough.",
        "Flow is affected by mispronunciations.",
        "Could sound more natural.",
      ],
    };
  }

  if (fluency <= 100 && fluency > 79) {
    return {
      score: fluency,
      feedback: "Fairly fluent, with a natural pace.",
      grade: "high",
      remarks: [
        "Fluent and natural pacing.",
        "Smooth delivery overall.",
        "Good rhythm and flow.",
      ],
    };
  }
};

const intonationResults = (intonation: number) => {
  if (intonation <= 10 && intonation > 0) {
    return {
      score: intonation,
      feedback: "The audio appears to contain non-speech sounds.",
      grade: "very-low",
      remarks: ["Mostly non-speech sounds.", "No intonation pattern detected."],
    };
  }

  if (intonation <= 59 && intonation > 10) {
    return {
      score: intonation,
      feedback:
        "The intonation is somewhat flat and does not convey the  expected Spanish prosody.",
      grade: "low",
      remarks: [
        "Flat intonation.",
        "Lacks natural pitch movement.",
        "Doesn't match expected prosody.",
      ],
    };
  }

  if (intonation <= 79 && intonation > 59) {
    return {
      score: intonation,
      feedback:
        "Intonation is acceptable, but could be more expressive to sound more natural.",
      grade: "medium",
      remarks: [
        "Acceptable but not expressive.",
        "Pitch variation could be stronger.",
        "Sounds somewhat mechanical.",
      ],
    };
  }

  if (intonation <= 100 && intonation > 79) {
    return {
      score: intonation,
      feedback: "Good intonation, suitable for a greeting.",
      grade: "high",
      remarks: [
        "Good natural intonation.",
        "Pitch matches the greeting well.",
        "Expressive and appropriate tone.",
      ],
    };
  }
};
