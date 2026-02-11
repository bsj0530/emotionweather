export default function TurnIndicator({
  currentTurn,
  total,
}: {
  currentTurn: number;
  total: number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="text-sm text-zinc-500">턴 진행</div>
      <div className="mt-1 text-xl font-semibold text-zinc-900">
        지금은{" "}
        <span className="underline underline-offset-4">
          {currentTurn + 1}번
        </span>{" "}
        친구 차례예요 ({currentTurn + 1}/{total})
      </div>
    </div>
  );
}
