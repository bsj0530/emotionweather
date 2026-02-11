export type WeatherId = "sunny" | "cloudy" | "rain" | "storm" | "fog" | "wind";

export type SituationCard = {
  id: string;
  prompt: string;
  imageUrl: string;
  reasonHint?: string; // 문장에 넣을 이유 힌트(선택)
};

export type EmotionOption = {
  id: string;
  label: string; // 화면에 보이는 감정 단어(확장 표현)
  weatherId: WeatherId;
};

export type Selection = {
  turnIndex: number; // 0..(students-1)
  emotionId: string;
  emotionLabel: string;
  sentence: string;
  weatherId: WeatherId;
  playerName?: string;
};

export type Stage = "turn" | "weather";
