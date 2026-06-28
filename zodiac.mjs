export const zodiacOptions = [
  {
    value: "western",
    label: "Western",
    description: "Tropical zodiac guidance for familiar sun-sign energy and modern self-reflection."
  },
  {
    value: "vedic",
    label: "Vedic",
    description: "Sidereal Jyotish-inspired guidance for spiritual timing, karma, and traditional insight."
  },
  {
    value: "both",
    label: "Both",
    description: "Blend Western and Vedic language so your reading feels complete from both paths."
  }
];

export const unknownWesternSign = "I do not know my Western sign";
export const unknownVedicSign = "I do not know my Vedic sign";

export function isZodiacPreference(value) {
  return zodiacOptions.some((option) => option.value === value);
}

export function calculateWesternSunSign(birthDate) {
  const [, , monthText, dayText] = birthDate.match(/^(\d{4})-(\d{2})-(\d{2})$/) ?? [];
  const month = Number(monthText);
  const day = Number(dayText);

  if (!month || !day) {
    return null;
  }

  const monthDay = month * 100 + day;

  if (monthDay >= 321 && monthDay <= 419) return "Aries";
  if (monthDay >= 420 && monthDay <= 520) return "Taurus";
  if (monthDay >= 521 && monthDay <= 620) return "Gemini";
  if (monthDay >= 621 && monthDay <= 722) return "Cancer";
  if (monthDay >= 723 && monthDay <= 822) return "Leo";
  if (monthDay >= 823 && monthDay <= 922) return "Virgo";
  if (monthDay >= 923 && monthDay <= 1022) return "Libra";
  if (monthDay >= 1023 && monthDay <= 1121) return "Scorpio";
  if (monthDay >= 1122 && monthDay <= 1221) return "Sagittarius";
  if (monthDay >= 1222 || monthDay <= 119) return "Capricorn";
  if (monthDay >= 120 && monthDay <= 218) return "Aquarius";
  if (monthDay >= 219 && monthDay <= 320) return "Pisces";

  return null;
}

export function getAutomaticZodiacSummary(input) {
  const needsWestern = input.westernSign === unknownWesternSign;
  const needsVedic = input.vedicSign === unknownVedicSign;
  const hasFullBirthData = Boolean(input.birthDate && input.birthTime && input.birthPlace);

  if (needsWestern && needsVedic && !hasFullBirthData) {
    return "No birth data yet. Add birth date, time, and place so SOULIAT can calculate your signs.";
  }

  const notes = [];

  if (needsWestern) {
    const calculatedWestern = calculateWesternSunSign(input.birthDate);
    notes.push(
      calculatedWestern
        ? `Western sign calculated as ${calculatedWestern}.`
        : "Western sign needs your birth date."
    );
  }

  if (needsVedic) {
    notes.push(
      hasFullBirthData
        ? "Vedic moon sign can be calculated from your birth date, time, and place."
        : "Vedic moon sign needs birth date, time, and place."
    );
  }

  return notes.join(" ");
}
