export const tarotCards = [
  {
    name: "The Star",
    archetype: "Hope returning",
    mantra: "I receive guidance without rushing the answer.",
    reading: {
      general: "A quiet sign of renewal arrives today. Choose the action that restores your faith instead of feeding old worry.",
      love: "Let softness lead. Honest tenderness opens more than pressure or guessing.",
      career: "A long-range idea deserves attention. Write it down before practical noise buries it.",
      reflection: "Where can I trust the next small sign instead of demanding the whole map?"
    }
  },
  {
    name: "The High Priestess",
    archetype: "Inner knowing",
    mantra: "My intuition is information.",
    reading: {
      general: "Your answer may be quieter than expected. Notice dreams, body signals, and repeated symbols.",
      love: "Do not chase clarity from someone who benefits from keeping you uncertain.",
      career: "Pause before committing. The missing detail matters and will reveal itself soon.",
      reflection: "What do I already know, but keep asking others to confirm?"
    }
  },
  {
    name: "Temperance",
    archetype: "Sacred balance",
    mantra: "I become steady by choosing the middle path.",
    reading: {
      general: "Today favors moderation, repair, and patience. Mix courage with restraint.",
      love: "A calm conversation can heal more than a dramatic confession.",
      career: "Blend two skills or ideas. The useful answer is not either/or.",
      reflection: "Where would balance feel more powerful than control?"
    }
  },
  {
    name: "Ace of Cups",
    archetype: "Emotional beginning",
    mantra: "I let new feeling move through me cleanly.",
    reading: {
      general: "A fresh emotional current is opening. Protect it from cynicism while it is still tender.",
      love: "Romance, forgiveness, or self-love can begin again through one sincere gesture.",
      career: "Creative work benefits from heart-led choices today.",
      reflection: "What feeling wants permission to exist without being judged?"
    }
  }
];

export function getDailyTarotCard(date = new Date()) {
  const key = date.toISOString().slice(0, 10);
  const seed = [...key].reduce((sum, character) => sum + character.charCodeAt(0), 0);

  return tarotCards[seed % tarotCards.length];
}
