import type { Selection, WeatherId } from "../model/types";
import { WEATHER_UI } from "../model/mapping";

function countByWeather(selections: Selection[]): Array<[WeatherId, number]> {
  const map = new Map<WeatherId, number>();

  for (const s of selections) {
    map.set(s.weatherId, (map.get(s.weatherId) ?? 0) + 1);
  }

  return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
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
  if (!open) return null;

  const counts = countByWeather(selections);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm text-zinc-500">감정 → 날씨</div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
              오늘 이 상황의 하늘은 어떤 모습일까요?
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            닫기
          </button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {selections.map((s) => {
            const w = WEATHER_UI[s.weatherId]; // ✅ s.weatherId는 WeatherId
            return (
              <div
                key={s.turnIndex}
                className={`rounded-xl border border-zinc-200 p-4 ${w.bgClass}`}
              >
                <div className="text-sm text-zinc-500">{s.turnIndex + 1}번</div>
                <div className="mt-1 text-xl font-semibold text-zinc-900">
                  {w.icon} {w.label}
                </div>
                <div className="mt-2 text-sm text-zinc-700">
                  {s.emotionLabel}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
          <div className="text-sm font-medium text-zinc-700">요약</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {counts.map(([weatherId, n]) => {
              const w = WEATHER_UI[weatherId]; // ✅ weatherId는 WeatherId
              return (
                <span
                  key={weatherId}
                  className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700"
                >
                  {w.icon} {w.label} {n}
                </span>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onNext}
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            다음 상황으로
          </button>
        </div>
      </div>
    </div>
  );
}
