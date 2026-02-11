export type WeatherId = "sunny" | "cloudy" | "rain" | "storm" | "fog" | "wind";

export interface EmotionOption {
  id: string; // 예: "joy", "sadness", "anger" ...
  label: string;
  weatherId: WeatherId;
}

export interface SituationCard {
  id: string;
  prompt: string;
  imageUrl: string;
  // ✅ 변경: 감정ID를 키로, 문장을 값으로 갖는 객체
  sentences: Record<string, string>;
}

export interface Selection {
  turnIndex: number;
  emotionId: string;
  emotionLabel: string;
  sentence: string;
  weatherId: string;
  playerName: string;
}
