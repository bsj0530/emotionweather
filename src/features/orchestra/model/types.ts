export type WeatherId =
  | "sunny"
  | "cloudy"
  | "rain"
  | "storm"
  | "fog"
  | "wind"
  | "sunshower" // 부끄러움
  | "lightning" // 놀람
  | "rainbow"; // 부러움

export interface EmotionOption {
  id: string; // 예: "joy", "sadness", "anger" ...
  label: string;
  weatherId: WeatherId;
}

export interface Selection {
  turnIndex: number;
  emotionId: string;
  emotionLabel: string;
  sentence: string;
  // 👇 여기가 핵심 변경사항입니다 (string -> WeatherId)
  weatherId: WeatherId;
  playerName: string;
}

export type SituationCard = {
  id: string;
  prompt: string;
  imageUrl: string;
  sentences: Record<string, string>;
  emotionSetId?: string; // ✅ 추가
};
