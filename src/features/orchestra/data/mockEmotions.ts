import type { EmotionOption } from "../model/types";

export const EMOTIONS_6: EmotionOption[] = [
  // 😡 분노/짜증
  { id: "emo-annoyed", label: "짜증나요", weatherId: "fog" },
  { id: "emo-unfair", label: "억울해요", weatherId: "fog" },
  { id: "emo-angry", label: "화나요", weatherId: "storm" },

  // 😢 슬픔
  { id: "emo-sad", label: "속상해요", weatherId: "rain" },
  { id: "emo-disappointed", label: "서운해요", weatherId: "fog" },
  { id: "emo-upset", label: "기분 나빠요", weatherId: "rain" },

  // 😰 걱정/불안
  { id: "emo-worried", label: "걱정돼요", weatherId: "fog" },
  { id: "emo-anxious", label: "불안해요", weatherId: "wind" },

  // 😳 당황/놀람
  { id: "emo-embarrassed", label: "부끄러워요", weatherId: "cloudy" },
  { id: "emo-surprised", label: "놀랐어요", weatherId: "lightning" },

  // 😕 혼란
  { id: "emo-confused", label: "헷갈려요", weatherId: "fog" },

  // 😏 질투/부러움
  { id: "emo-jealous", label: "부러워요", weatherId: "fog" },

  // 😊 긍정
  { id: "emo-happy", label: "기뻐요", weatherId: "sunny" },
  { id: "emo-proud", label: "뿌듯해요", weatherId: "sunny" },
  { id: "emo-thankful", label: "고마워요", weatherId: "rainbow" },
];
