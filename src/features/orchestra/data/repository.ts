import type { EmotionOption, SituationCard } from "../model/types";
import { MOCK_SITUATIONS } from "./mockSituations";
import { EMOTIONS_6 } from "./mockEmotions";

// id -> label/weatherId (너가 쓰는 것들만 최소로)
const EMOTION_META: Record<
  string,
  { label: string; weatherId: EmotionOption["weatherId"] }
> = {
  "emo-annoyed": { label: "짜증나요", weatherId: "fog" },
  "emo-unfair": { label: "억울해요", weatherId: "fog" },
  "emo-angry": { label: "화나요", weatherId: "storm" },
  "emo-sad": { label: "속상해요", weatherId: "rain" },
  "emo-upset": { label: "기분 나빠요", weatherId: "wind" },
  "emo-disappointed": { label: "서운해요", weatherId: "rain" },
  "emo-embarrassed": { label: "부끄러워요", weatherId: "cloudy" },
  "emo-surprised": { label: "놀랐어요", weatherId: "lightning" },
  "emo-jealous": { label: "부러워요", weatherId: "fog" },

  // 상황에 나오니까 추가
  "emo-confused": { label: "어이없었어요", weatherId: "fog" },
  "emo-happy": { label: "기뻐요", weatherId: "sunny" },
  "emo-proud": { label: "뿌듯했어요", weatherId: "rainbow" },
  "emo-thankful": { label: "고마웠어요", weatherId: "rainbow" },
  "emo-relieved": { label: "안도돼요", weatherId: "sunny" },
};

export function getEmotionOptionsForSituation(
  sit: SituationCard,
): EmotionOption[] {
  return Object.keys(sit.sentences)
    .map((id) => {
      const meta = EMOTION_META[id];
      if (!meta) return null;
      return {
        id,
        label: meta.label,
        weatherId: meta.weatherId,
      } as EmotionOption;
    })
    .filter(Boolean) as EmotionOption[];
}

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
