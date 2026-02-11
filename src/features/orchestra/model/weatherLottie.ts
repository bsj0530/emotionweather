import type { WeatherId } from "./types";

import rain from "@/assets/lottie/rainy icon.json";
import mist from "@/assets/lottie/Weather-mist.json";
import windy from "@/assets/lottie/Weather-windy.json";
import storm from "@/assets/lottie/Weather-storm.json";
import thunder from "@/assets/lottie/Weather-thunder.json";
import partlyShower from "@/assets/lottie/Weather-partly shower.json";

// ✅ 네가 가진 파일 기준으로 매핑
// sunny/cloudy가 없으면 일단 임시로 대체(나중에 sunny/cloudy Lottie 추가하면 교체만 하면 됨)
export const WEATHER_LOTTIE: Record<WeatherId, object> = {
  sunny: partlyShower, // TODO: sunny.json 구하면 교체
  cloudy: partlyShower, // TODO: cloudy.json 구하면 교체
  rain,
  storm,
  fog: mist,
  wind: windy,
};

// “번개”를 따로 쓰고 싶으면 WeatherId에 thunder를 추가하거나,
// storm 안에서 thunder를 레이어로 올려도 됨
export const EXTRA_LOTTIE = {
  thunder,
} as const;
