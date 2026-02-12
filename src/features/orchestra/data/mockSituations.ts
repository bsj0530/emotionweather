import type { SituationCard } from "../model/types";

import item from "@/assets/item.png";
import presentation from "@/assets/aa.png";
import rps from "@/assets/rps.png";

export const MOCK_SITUATIONS: SituationCard[] = [
  // ✅ 1. 물건 상황
  {
    id: "item-001",
    prompt: "친구가 내 물건을 말 없이 가져갔어요.",
    imageUrl: item,
    sentences: {
      "emo-annoyed": "물건을 말없이 가져가서 짜증나요.",
      "emo-sad": "물건을 말없이 가져가서 속상해요.",
      "emo-angry": "물건을 말없이 가져가서 화가 나요.",
      "emo-surprised": "물건을 말없이 가져가서 놀랐어요.",
      "emo-confused": "물건을 말없이 가져가서 어이없었어요.",
      "emo-upset": "물건을 말없이 가져가서 기분이 나빴어요.",
    },
  },

  // ✅ 2. 발표 후 박수 상황
  {
    id: "presentation-001",
    prompt: "발표했더니 선생님과 친구들이 박수쳐줬어요.",
    imageUrl: presentation,
    sentences: {
      "emo-happy": "선생님과 친구들이 박수쳐줘서 기뻤어요.",
      "emo-proud": "발표를 잘한 것 같아서 뿌듯했어요.",
      "emo-embarrassed": "선생님과 친구들에게 박수받아서 살짝 부끄러웠어요.",
      "emo-surprised": "선생님과 친구들이 생각보다 크게 박수쳐줘서 놀랐어요.",
      "emo-relieved": "선생님과 친구들이 박수쳐줘서 행복했어요",
      "emo-thankful": "선생님과 친구들이 박수쳐줘서 고마웠어요.",
    },
  },

  // ✅ 4. 가위바위보 상황
  {
    id: "rps-001",
    prompt: "친구랑 가위바위보를 해서 졌어요.",
    imageUrl: rps,
    sentences: {
      "emo-annoyed": "가위바위보를 해서 져서 짜증나요.",
      "emo-unfair": "가위바위보를 해서 져서 억울해요",
      "emo-angry": "친구가 이겨서 화가나요",
      "emo-sad": "가위바위보를 해서 져서 슬퍼요",
      "emo-upset": "가위바위보를 해서 져서 기분이 나빠요",
      "emo-jealous": "가위바위보를 해서 이긴 친구가 너무 부러워요",
    },
  },
];
