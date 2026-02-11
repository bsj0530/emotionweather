import type { SituationCard } from "../model/types";
import food from "@/assets/Q7.png";

export const MOCK_SITUATIONS: SituationCard[] = [
  {
    id: "food-001",
    prompt: "친구가 내 음식을 말도 없이 가져가서 먹었어요.",
    imageUrl: food,
    // ✅ 키(Key)를 EMOTIONS_6에 있는 ID와 똑같이 맞춰줍니다.
    sentences: {
      "emo-annoyed": "내 허락도 없이 가져가서 정말 짜증나요!",
      "emo-unfair": "나는 한 입도 못 먹었는데... 너무 억울해요.",
      "emo-angry": "남의 걸 함부로 먹다니 진짜 화나요!",
      "emo-sad": "아껴 먹으려고 했던 건데 속상해요.",
      "emo-upset": "말도 안 하고 가져가서 기분 나빠요.",
      "emo-disappointed": "믿었던 친구였는데 서운해요.",
    },
  },
  {
    id: "rule-001",
    prompt: "내 차례였는데 친구가 새치기했어요.",
    imageUrl: "/images/situations/line.png",
    sentences: {
      "emo-annoyed": "줄을 섰는데 새치기를 하니까 짜증나요.",
      "emo-unfair": "내가 먼저 왔는데 순서를 뺏겨서 억울해요!",
      "emo-angry": "규칙을 안 지키는 친구한테 화가 나요.",
      "emo-sad": "내 차례를 존중받지 못해서 속상해요.",
      "emo-upset": "갑자기 끼어드니까 기분 나빠요.",
      "emo-disappointed": "차례를 지킬 줄 알았는데 서운해요.",
    },
  },
  // ... 다른 상황들도 동일하게 키를 맞춰주세요
];
