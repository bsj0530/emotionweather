import type { EmotionOption } from "../model/types";

export default function EmotionSelector({
  options,
  disabled,
  onPick,
}: {
  options: EmotionOption[];
  disabled: boolean;
  onPick: (emotionId: string) => void;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="text-sm font-medium text-zinc-700">
        감정을 골라보세요 (6개)
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onPick(opt.id)}
            disabled={disabled}
            className={[
              "rounded-xl border px-3 py-4 text-lg font-semibold transition-transform",
              "active:scale-[0.98]",
              disabled
                ? "cursor-not-allowed border-zinc-100 bg-zinc-50 text-zinc-300"
                : "border-zinc-200 bg-white text-zinc-900 hover:scale-[1.01]",
            ].join(" ")}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {disabled && (
        <div className="mt-3 text-sm text-zinc-400">
          모든 턴이 끝났어요. 결과를 확인해요!
        </div>
      )}
    </section>
  );
}
