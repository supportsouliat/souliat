import { createReadingRequest, validateInquiry } from "./inquiry.mjs";
import { getDailyTarotCard } from "./tarot.mjs";
import {
  calculateWesternSunSign,
  getAutomaticZodiacSummary,
  unknownVedicSign,
  unknownWesternSign,
  zodiacOptions
} from "./zodiac.mjs";

const card = getDailyTarotCard(new Date());
let selectedZodiac = "both";
let dailyIntention = "clarity";
let focusArea = "love";
let seekerName = "";
let westernSign = "Aries";
let vedicSign = unknownVedicSign;
let birthDate = "";
let birthTime = "";
let birthPlace = "";
let preferredLanguage = "English";
let region = "United States";
let selectedProfessional = "Aarav";

const westernSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
  unknownWesternSign
];

const vedicSigns = [
  "Mesha",
  "Vrishabha",
  "Mithuna",
  "Karka",
  "Simha",
  "Kanya",
  "Tula",
  "Vrischika",
  "Dhanu",
  "Makara",
  "Kumbha",
  "Meena",
  unknownVedicSign
];

const professionals = [
  {
    name: "Aarav",
    specialty: "Vedic astrologer",
    region: "India",
    languages: "English, Hindi",
    image: "./profiles/aarav.png"
  },
  {
    name: "Priya",
    specialty: "Tarot reader and intuitive guide",
    region: "India / Global",
    languages: "English, Hindi",
    image: "./profiles/priya.png"
  },
  {
    name: "Vikram Sethi",
    specialty: "Vedic and Kundali specialist",
    region: "India",
    languages: "English, Hindi",
    image: "./profiles/vikram-sethi.png"
  },
  {
    name: "Camila",
    specialty: "Tarot and love guidance",
    region: "Latin America / Spain",
    languages: "Spanish, English",
    image: "./profiles/camila.png"
  },
  {
    name: "Anjali",
    specialty: "Spiritual rituals and relationship guidance",
    region: "India",
    languages: "Hindi, English",
    image: "./profiles/anjali.png"
  },
  {
    name: "Evelyn",
    specialty: "Tarot and candle ritual guidance",
    region: "United States / Global",
    languages: "English, German",
    image: "./profiles/evelyn.png"
  }
];

const revealButton = document.querySelector("#reveal-card");
const cardBack = document.querySelector(".card-back");
const cardFace = document.querySelector(".card-face");
const readingGrid = document.querySelector("#reading-grid");

document.querySelector("#card-name").textContent = card.name;
document.querySelector("#card-archetype").textContent = card.archetype;
document.querySelector("#reading-general").textContent = card.reading.general;
document.querySelector("#reading-love").textContent = card.reading.love;
document.querySelector("#reading-career").textContent = card.reading.career;
document.querySelector("#reading-reflection").textContent = card.reading.reflection;
document.querySelector("#card-mantra").textContent = card.mantra;
document.querySelector("#daily-mantra").textContent = card.mantra;

revealButton.addEventListener("click", () => {
  cardBack.hidden = true;
  cardFace.hidden = false;
  readingGrid.hidden = false;
  revealButton.setAttribute("aria-label", `${card.name}: ${card.archetype}`);
});

const zodiacContainer = document.querySelector("#zodiac-options");
const westernSignField = document.querySelector("#western-sign-field");
const vedicSignField = document.querySelector("#vedic-sign-field");
const westernSignSelect = document.querySelector("#western-sign");
const vedicSignSelect = document.querySelector("#vedic-sign");
const dailyTuning = document.querySelector("#daily-tuning");
const dailyTitle = document.querySelector("#daily-title");
const unlockNote = document.querySelector("#unlock-note");
const seekerNameInput = document.querySelector("#seeker-name");
const birthDateInput = document.querySelector("#birth-date");
const birthTimeInput = document.querySelector("#birth-time");
const birthPlaceInput = document.querySelector("#birth-place");
const preferredLanguageSelect = document.querySelector("#preferred-language");
const regionSelect = document.querySelector("#region");
const automaticZodiacNote = document.querySelector("#automatic-zodiac-note");

function renderOptions(container, options, selected, onSelect) {
  container.replaceChildren(
    ...options.map((option) => {
      const button = document.createElement("button");
      button.className = "answer-choice";
      button.type = "button";
      button.textContent = option;
      button.setAttribute("aria-pressed", String(option === selected));
      button.addEventListener("click", () => onSelect(option));
      return button;
    })
  );
}

function renderZodiacOptions() {
  zodiacContainer.replaceChildren(
    ...zodiacOptions.map((option) => {
      const button = document.createElement("button");
      button.className = "zodiac-choice";
      button.type = "button";
      button.setAttribute("aria-pressed", String(option.value === selectedZodiac));
      button.innerHTML = `<strong>${option.label}</strong><span>${option.description}</span>`;
      button.addEventListener("click", () => {
        selectedZodiac = option.value;
        renderZodiacOptions();
      });
      return button;
    })
  );

  westernSignField.hidden = selectedZodiac === "vedic";
  vedicSignField.hidden = selectedZodiac === "western";
  updateAutomaticZodiacNote();
}

function renderSignSelect(select, signs, selectedValue) {
  select.replaceChildren(
    ...signs.map((sign) => {
      const option = document.createElement("option");
      option.value = sign;
      option.textContent = sign;
      option.selected = sign === selectedValue;
      return option;
    })
  );
}

function renderProfessionalOptions() {
  const container = document.querySelector("#professional-options");
  container.replaceChildren(
    ...professionals.map((professional) => {
      const button = document.createElement("button");
      button.className = "professional-card";
      button.type = "button";
      button.setAttribute("aria-pressed", String(professional.name === selectedProfessional));

      const image = document.createElement("img");
      image.src = professional.image;
      image.alt = "";

      const details = document.createElement("span");
      const name = document.createElement("strong");
      const specialty = document.createElement("span");
      const meta = document.createElement("small");

      name.textContent = professional.name;
      specialty.textContent = professional.specialty;
      meta.textContent = `${professional.region} · ${professional.languages}`;

      details.append(name, specialty, meta);
      button.append(image, details);
      button.addEventListener("click", () => {
        selectedProfessional = professional.name;
        renderProfessionalOptions();
      });

      return button;
    })
  );
}

function updateAutomaticZodiacNote() {
  automaticZodiacNote.textContent = getAutomaticZodiacSummary({
    westernSign,
    vedicSign,
    birthDate,
    birthTime,
    birthPlace
  });
}

function updateDailyTuning() {
  const selected = zodiacOptions.find((option) => option.value === selectedZodiac);
  const calculatedWesternSign =
    westernSign === unknownWesternSign ? calculateWesternSunSign(birthDate) : null;
  const westernDisplaySign = calculatedWesternSign ?? westernSign;

  dailyTuning.textContent = `${seekerName ? `${seekerName}, ` : ""}${dailyIntention} for ${focusArea}. ${selected?.label ?? "Both"} guidance${
    selectedZodiac !== "vedic" ? `, ${westernDisplaySign}` : ""
  }${selectedZodiac !== "western" ? `, ${vedicSign}` : ""}.${
    birthDate ? ` Born on ${birthDate}` : ""
  }${
    birthTime ? ` Born around ${birthTime}` : ""
  }${birthPlace ? ` in ${birthPlace}` : ""}. ${preferredLanguage}, ${region}.`;
}

function getUnlockedMessage() {
  return seekerName ? `${seekerName}, your portal is unlocked.` : "Your portal is unlocked.";
}

function updateUnlockedMessage() {
  const message = getUnlockedMessage();
  unlockNote.textContent = message;
  dailyTitle.textContent = message;
}

function renderIntentionOptions() {
  renderOptions(
    document.querySelector("#intention-options"),
    ["clarity", "love", "protection", "new direction"],
    dailyIntention,
    (value) => {
      dailyIntention = value;
      renderIntentionOptions();
    }
  );
}

function renderFocusOptions() {
  renderOptions(
    document.querySelector("#focus-options"),
    ["love", "marriage", "career", "money", "healing", "spirituality"],
    focusArea,
    (value) => {
      focusArea = value;
      renderFocusOptions();
    }
  );
}

renderIntentionOptions();
renderFocusOptions();
renderSignSelect(westernSignSelect, westernSigns, westernSign);
renderSignSelect(vedicSignSelect, vedicSigns, vedicSign);
renderZodiacOptions();
renderProfessionalOptions();

seekerNameInput.addEventListener("input", () => {
  seekerName = seekerNameInput.value.trim();
  updateUnlockedMessage();
});

westernSignSelect.addEventListener("change", () => {
  westernSign = westernSignSelect.value;
  updateAutomaticZodiacNote();
});

vedicSignSelect.addEventListener("change", () => {
  vedicSign = vedicSignSelect.value;
  updateAutomaticZodiacNote();
});

birthDateInput.addEventListener("change", () => {
  birthDate = birthDateInput.value;
  updateAutomaticZodiacNote();
});

birthTimeInput.addEventListener("change", () => {
  birthTime = birthTimeInput.value;
  updateAutomaticZodiacNote();
});

birthPlaceInput.addEventListener("input", () => {
  birthPlace = birthPlaceInput.value.trim();
  updateAutomaticZodiacNote();
});

preferredLanguageSelect.addEventListener("change", () => {
  preferredLanguage = preferredLanguageSelect.value;
});

regionSelect.addEventListener("change", () => {
  region = regionSelect.value;
});

document.querySelector("#start-test").addEventListener("click", () => {
  document.querySelector("#test-panel").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#unlock-access").addEventListener("click", () => {
  updateUnlockedMessage();
  updateDailyTuning();
  document.querySelector("#hero").classList.add("hero-compact");
  document.querySelector("#start-test").hidden = true;
  document.querySelector("#unlock-note").hidden = false;
  document.querySelector("#test-panel").hidden = true;
  document.querySelector("#daily-access").hidden = false;
  document.querySelector("#tarot-panel").hidden = false;
  document.querySelector("#inquiry-panel").hidden = false;
  document.querySelector("#professional-panel").hidden = false;
  document.querySelector("#daily-access").scrollIntoView({ behavior: "smooth", block: "start" });
});

const form = document.querySelector("#inquiry-form");
const status = document.querySelector("#form-status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const draft = {
    topic: String(formData.get("topic") ?? ""),
    question: String(formData.get("question") ?? ""),
    zodiacPreference: selectedZodiac
  };
  const validation = validateInquiry(draft);

  if (!validation.ok) {
    status.textContent = Object.values(validation.errors).join(" ");
    return;
  }

  await createReadingRequest(draft);
  status.textContent = "Message received. We will reply soon.";
  form.reset();
});

const professionalForm = document.querySelector("#professional-form");
const professionalStatus = document.querySelector("#professional-status");

professionalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(professionalForm);
  const message = String(formData.get("professionalMessage") ?? "").trim();

  if (message.length < 16) {
    professionalStatus.textContent = "Leave your message with a little more detail.";
    return;
  }

  professionalStatus.textContent = "Message received. We will reply soon.";
  professionalForm.reset();
});
