import type { EmotionOption } from "../model/types";

// “확장 표현” 6개 (예시)
// 상황별로 세트를 여러 개 만들고 repository에서 상황 id 태그로 고르는 방식도 가능
export const EMOTIONS_6: EmotionOption[] = [
  { id: "emo-annoyed", label: "짜증나요", weatherId: "cloudy" },
  { id: "emo-unfair", label: "억울해요", weatherId: "wind" },
  { id: "emo-angry", label: "화나요", weatherId: "storm" },
  { id: "emo-sad", label: "속상해요", weatherId: "rain" },
  { id: "emo-upset", label: "기분 나빠요", weatherId: "fog" },
  { id: "emo-disappointed", label: "서운해요", weatherId: "cloudy" },
];
