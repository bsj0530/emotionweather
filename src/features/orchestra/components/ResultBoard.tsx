import type { Selection } from "../model/types";
import { WEATHER_UI } from "../model/mapping";

export default function ResultBoard({
  selections,
  total,
}: {
  selections: Selection[];
  total: number;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-sm font-medium text-zinc-700">
            우리 반 감정 기록
          </div>
          <div className="mt-1 text-sm text-zinc-500">
            선택이 쌓일수록 “같은 상황도 감정은 다를 수 있어요”가 보이게 돼요.
          </div>
        </div>
        <div className="text-sm text-zinc-500">
          {selections.length}/{total}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {Array.from({ length: total }).map((_, i) => {
          const s = selections.find((x) => x.turnIndex === i);
          return (
            <div
              key={i}
              className={[
                "rounded-xl border p-4",
                s ? "border-zinc-200 bg-white" : "border-zinc-100 bg-zinc-50",
              ].join(" ")}
            >
              <div className="text-sm text-zinc-500">{i + 1}번</div>
              {s ? (
                <>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">
                    {s.emotionLabel}
                    <span className="ml-2 text-base text-zinc-500">
                      ({WEATHER_UI[s.weatherId].icon})
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-zinc-700">{s.sentence}</div>
                </>
              ) : (
                <div className="mt-2 text-sm text-zinc-400">아직 선택 전</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
