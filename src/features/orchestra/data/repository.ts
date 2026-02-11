import type { EmotionOption, SituationCard } from "../model/types";
import { MOCK_SITUATIONS } from "./mockSituations";
import { EMOTIONS_6 } from "./mockEmotions";

function pickRandom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function getRandomSituation(): Promise<SituationCard> {
  // ✅ 나중에 여기만 API로 교체하면 됨
  return pickRandom(MOCK_SITUATIONS);
}

export async function getEmotionOptions(): Promise<EmotionOption[]> {
  return EMOTIONS_6;
}
