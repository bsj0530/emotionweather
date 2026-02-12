import type { WeatherId } from "./types";

// 얼굴 이미지 import
import happy from "@/assets/face/happy.png";
import sad from "@/assets/face/sad.png";
import angry from "@/assets/face/angry.png";
import surprised from "@/assets/face/suprised.png";
import jealous from "@/assets/face/jealous.png";
import proud from "@/assets/face/proud.png";
import thankful from "@/assets/face/thanks.png";
import embarrassed from "@/assets/face/embarrassed.png";
import confused from "@/assets/face/confused.png";
import cry from "@/assets/face/cry.png";
import mad from "@/assets/face/mad.png";

export const EMOTION_THEME: Record<
  string,
  { weatherId: WeatherId; image: string }
> = {
  // 😡 분노/짜증
  "emo-annoyed": { weatherId: "fog", image: angry }, // 짜증 → 바람(거슬림)
  "emo-angry": { weatherId: "storm", image: mad }, // 화남 → 폭풍
  "emo-unfair": { weatherId: "fog", image: angry }, // 억울 → 흐림

  // 😢 슬픔
  "emo-sad": { weatherId: "rain", image: sad }, // 슬픔 → 비
  "emo-disappointed": { weatherId: "fog", image: cry }, // 서운 → 흐림
  "emo-upset": { weatherId: "rain", image: sad }, // 기분 나쁨 → 안개

  // 😳 당황/놀람
  "emo-embarrassed": { weatherId: "cloudy", image: embarrassed }, // 부끄러움 → 해+비
  "emo-surprised": { weatherId: "lightning", image: surprised }, // 놀람 → 번개

  // 😏 질투/부러움
  "emo-jealous": { weatherId: "fog", image: jealous }, // 부러움 → 무지개(부러운 느낌 강조)

  // 😊 긍정
  "emo-happy": { weatherId: "sunny", image: happy }, // 기쁨 → 맑음
  "emo-proud": { weatherId: "sunny", image: proud }, // 뿌듯 → 맑음
  "emo-thankful": { weatherId: "rainbow", image: thankful }, // 고마움 → 무지개
};
