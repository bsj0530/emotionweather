// src/features/orchestra/components/WeatherCompareOverlay.tsx
import { useMemo, useState } from "react";
import Lottie from "lottie-react";
import type { Selection, WeatherId } from "../model/types";
import { WEATHER_LOTTIE, EXTRA_LOTTIE } from "../model/weatherLottie";

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function weatherLabel(w: WeatherId) {
  const m: Record<WeatherId, string> = {
    sunny: "맑음",
    cloudy: "흐림",
    rain: "비",
    storm: "폭풍",
    fog: "안개",
    wind: "바람",
  };
  return m[w];
}

function weatherIcon(w: WeatherId) {
  const m: Record<WeatherId, string> = {
    sunny: "☀️",
    cloudy: "☁️",
    rain: "🌧️",
    storm: "🌪️",
    fog: "🌫️",
    wind: "🌬️",
  };
  return m[w];
}

function fallbackNeighbor(w: WeatherId): WeatherId {
  // 하나만 나왔을 때 비교용 짝꿍
  const table: Record<WeatherId, WeatherId> = {
    sunny: "cloudy",
    cloudy: "rain",
    rain: "storm",
    storm: "rain",
    fog: "cloudy",
    wind: "cloudy",
  };
  return table[w];
}

function pickTopTwoWeathers(selections: Selection[]): [WeatherId, WeatherId] {
  const counts = new Map<WeatherId, number>();
  for (const s of selections) {
    counts.set(s.weatherId, (counts.get(s.weatherId) ?? 0) + 1);
  }

  const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  const first = (sorted[0]?.[0] ?? "cloudy") as WeatherId;
  const second = (sorted[1]?.[0] ?? fallbackNeighbor(first)) as WeatherId;

  return [first, second];
}

export default function WeatherCompareOverlay({
  open,
  selections,
  onClose,
  onNext,
}: {
  open: boolean;
  selections: Selection[];
  onClose: () => void;
  onNext: () => void;
}) {
  const [leftWeather, rightWeather] = useMemo(
    () => pickTopTwoWeathers(selections),
    [selections],
  );

  // 슬라이더(0~100)
  const [value, setValue] = useState(50);
  const t = clamp01(value / 100);

  const leftAnim = WEATHER_LOTTIE[leftWeather];
  const rightAnim = WEATHER_LOTTIE[rightWeather];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-lg backdrop-blur">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-6 pt-5 pb-4">
          <div>
            <div className="text-sm font-bold text-zinc-600">
              🎛️ 감정 날씨 비교 놀이
            </div>
            <div className="mt-1 text-2xl font-extrabold tracking-tight text-zinc-900">
              슬라이더로 두 감정의 “날씨 느낌”을 바꿔보자!
            </div>
            <div className="mt-2 text-sm text-zinc-600">
              왼쪽은{" "}
              <b>
                {weatherIcon(leftWeather)} {weatherLabel(leftWeather)}
              </b>
              , 오른쪽은{" "}
              <b>
                {weatherIcon(rightWeather)} {weatherLabel(rightWeather)}
              </b>{" "}
              느낌이에요.
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-2xl border border-white/70 bg-white px-4 py-2 text-sm font-bold text-zinc-700 shadow-sm hover:bg-white"
          >
            닫기
          </button>
        </div>

        {/* Stage: Lottie crossfade */}
        <div className="px-6 pb-5">
          <div className="relative h-[340px] overflow-hidden rounded-[28px] border border-white/70 bg-gradient-to-br from-sky-200 to-amber-100 shadow-sm">
            {/* Left weather */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: 1 - t, transition: "opacity 140ms linear" }}
            >
              <Lottie
                animationData={leftAnim}
                loop
                autoplay
                style={{ width: 360, height: 360 }}
              />
            </div>

            {/* Right weather */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: t, transition: "opacity 140ms linear" }}
            >
              <Lottie
                animationData={rightAnim}
                loop
                autoplay
                style={{ width: 360, height: 360 }}
              />
            </div>

            {/* Optional: thunder overlay when storm is involved (귀여운 번쩍 효과) */}
            {(leftWeather === "storm" || rightWeather === "storm") && (
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: Math.max(0, (t - 0.65) / 0.35), // 오른쪽으로 갈수록 약간 강화
                }}
              >
                <div className="animate-[flash_2.8s_ease-in-out_infinite]">
                  <Lottie
                    animationData={EXTRA_LOTTIE.thunder}
                    loop
                    autoplay
                    style={{ width: 220, height: 220 }}
                  />
                </div>
                <style>{`
                  @keyframes flash {
                    0%, 70%, 100% { opacity: 0.0; }
                    72% { opacity: 0.65; }
                    74% { opacity: 0.0; }
                    78% { opacity: 0.45; }
                    80% { opacity: 0.0; }
                  }
                `}</style>
              </div>
            )}

            {/* Bottom label */}
            <div className="absolute right-4 bottom-4 left-4 rounded-2xl bg-white/80 px-4 py-3 text-sm font-extrabold text-zinc-800 shadow-sm">
              👈 {weatherIcon(leftWeather)} {weatherLabel(leftWeather)} 느낌 ↔{" "}
              {weatherIcon(rightWeather)} {weatherLabel(rightWeather)} 느낌 👉
            </div>
          </div>

          {/* Slider */}
          <div className="mt-5 rounded-[28px] border border-white/70 bg-white/70 p-5 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-extrabold text-zinc-800">
                🎚️ 느낌 슬라이더
              </div>
              <div className="text-sm font-bold text-zinc-600">
                지금은{" "}
                <span className="rounded-full bg-amber-100 px-3 py-1">
                  {value < 50
                    ? `${weatherIcon(leftWeather)} ${weatherLabel(leftWeather)} 쪽`
                    : `${weatherIcon(rightWeather)} ${weatherLabel(rightWeather)} 쪽`}
                </span>
              </div>
            </div>

            <input
              className="mt-4 w-full accent-sky-500"
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />

            <div className="mt-3 flex items-center justify-between text-xs font-bold text-zinc-600">
              <span>
                {weatherIcon(leftWeather)} {weatherLabel(leftWeather)}
              </span>
              <span>
                {weatherIcon(rightWeather)} {weatherLabel(rightWeather)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex justify-end gap-2">
            <button
              onClick={onNext}
              className="rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 px-5 py-3 text-sm font-extrabold text-white shadow-md hover:shadow-lg"
            >
              다음 상황으로 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
