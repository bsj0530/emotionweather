import type { WeatherId } from "./types";

export const WEATHER_UI: Record<
  WeatherId,
  { label: string; icon: string; bgClass: string }
> = {
  sunny: { label: "맑음", icon: "☀️", bgClass: "bg-amber-50" },
  cloudy: { label: "흐림", icon: "☁️", bgClass: "bg-zinc-100" },
  rain: { label: "비", icon: "🌧️", bgClass: "bg-sky-50" },
  storm: { label: "번개/폭풍", icon: "🌩️", bgClass: "bg-indigo-50" },
  fog: { label: "안개", icon: "🌫️", bgClass: "bg-slate-50" },
  wind: { label: "바람", icon: "🌬️", bgClass: "bg-emerald-50" },
};

export function buildSentence(
  prompt: string,
  emotionLabel: string,
  reason?: string,
) {
  // 너무 길면 prompt 요약 대신 reasonHint를 쓰는 게 안전
  if (reason && reason.trim().length > 0) {
    return `나는 ${emotionLabel}. 왜냐하면 ${reason} 그래서요.`;
  }
  return `나는 ${emotionLabel}.`;
}
