const minimumQuestionLength = 24;

export function validateInquiry(input) {
  const topic = String(input.topic ?? "").trim();
  const question = String(input.question ?? "").trim();
  const errors = {};

  if (!topic) {
    errors.topic = "Choose the area you want guidance for.";
  }

  if (question.length < minimumQuestionLength) {
    errors.question = "Ask a little more so the reading has a real thread to follow.";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors
  };
}

export async function createReadingRequest(input) {
  const validation = validateInquiry(input);

  if (!validation.ok) {
    throw new Error("Reading request is incomplete.");
  }

  return {
    id: `demo-${Date.now()}`,
    topic: input.topic.trim(),
    question: input.question.trim(),
    zodiacPreference: input.zodiacPreference,
    status: "received",
    createdAt: new Date().toISOString()
  };
}
