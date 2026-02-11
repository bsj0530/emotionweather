import type { SituationCard } from "../model/types";

export const MOCK_SITUATIONS: SituationCard[] = [
  {
    id: "food-001",
    prompt: "친구가 내 음식을 말도 없이 가져가서 먹었어요.",
    imageUrl: "/images/situations/food.png",
    reasonHint: "내 허락 없이 가져가서",
  },
  {
    id: "rule-001",
    prompt: "내 차례였는데 친구가 새치기했어요.",
    imageUrl: "/images/situations/line.png",
    reasonHint: "내 차례를 빼앗겨서",
  },
  {
    id: "tease-001",
    prompt: "친구가 내 실수를 크게 놀렸어요.",
    imageUrl: "/images/situations/tease.png",
    reasonHint: "창피하고 마음이 아파서",
  },
];
