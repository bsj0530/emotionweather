import type { SituationCard } from "../model/types";

export default function SituationPanel({
  situation,
}: {
  situation: SituationCard;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          {situation.prompt}
        </h1>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50">
        {/* 전자칠판이면 이미지가 큼직하게 보여야 함 */}
        <img
          src={situation.imageUrl}
          alt="situation"
          className="h-[260px] w-full object-contain"
          draggable={false}
        />
      </div>
    </section>
  );
}
