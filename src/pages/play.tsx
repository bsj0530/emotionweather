import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Lottie from "lottie-react"; // npm install lottie-react 필요

import type {
  EmotionOption,
  Selection,
  SituationCard,
  WeatherId,
} from "../features/orchestra/model/types";

// ✅ 문장 생성 로직은 mapping.ts에서
import { buildSentence } from "../features/orchestra/model/mapping";

// ✅ Lottie 매핑은 weatherLottie.ts에서 가져오기 (경로 확인해주세요!)
import { WEATHER_LOTTIE } from "../features/orchestra/model/weatherLottie";

import {
  getEmotionOptions,
  getRandomSituation,
} from "../features/orchestra/data/repository";
import SituationPanel from "../features/orchestra/components/SituationPanel";

// ==========================================
// 1. 헬퍼 함수
// ==========================================

// 감정 라벨 이모지
function getEmoji(label: string) {
  if (label.includes("기뻐") || label.includes("행복")) return "😆";
  if (label.includes("슬퍼") || label.includes("우울")) return "😭";
  if (label.includes("화") || label.includes("짜증")) return "😡";
  if (label.includes("걱정") || label.includes("불안")) return "🥺";
  if (label.includes("신나") || label.includes("놀라")) return "🥳";
  if (label.includes("평온") || label.includes("그저")) return "😐";
  return "🙂";
}

// ==========================================
// 2. 배경 컴포넌트
// ==========================================
function BackgroundPlay() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-white">
      <div className="absolute top-[6%] left-[15%] h-10 w-10 animate-bounce rounded-full bg-[#aee6ff] opacity-40 [animation-duration:5s]" />
      <div className="absolute top-[8%] left-[45%] h-6 w-6 animate-pulse rounded-full bg-[#ffb3c7] opacity-30 [animation-duration:3s]" />
      <div className="absolute top-[50%] right-[10%] h-16 w-16 animate-bounce rounded-full bg-[#aee6ff] opacity-30 [animation-duration:6s]" />
      <div className="absolute bottom-[20%] left-[20%] h-14 w-14 animate-bounce rounded-full bg-[#ffb3c7] opacity-35 [animation-duration:6s]" />
    </div>
  );
}

// ==========================================
// 3. 메인 Play 컴포넌트
// ==========================================
export default function Play() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const playerNames = useMemo(() => {
    const rawNames = params.get("names");
    if (!rawNames) return ["학생1", "학생2"];
    return decodeURIComponent(rawNames).split(",");
  }, [params]);

  const totalPlayers = playerNames.length;

  const [turn, setTurn] = useState(0);
  const [situation, setSituation] = useState<SituationCard | null>(null);
  const [options, setOptions] = useState<EmotionOption[]>([]);
  const [selections, setSelections] = useState<Selection[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  async function boot() {
    setTurn(0);
    setSelections([]);
    setIsFinished(false);

    const [sit, opts] = await Promise.all([
      getRandomSituation(),
      getEmotionOptions(),
    ]);
    setSituation(sit);
    setOptions(opts);
  }

  useEffect(() => {
    void boot();
  }, []);

  function onPick(emotionId: string) {
    if (!situation) return;
    if (turn >= totalPlayers) return;

    const opt = options.find((o) => o.id === emotionId);
    if (!opt) return;

    const currentPlayerName = playerNames[turn];

    const nextSelection: Selection = {
      turnIndex: turn,
      emotionId: opt.id,
      emotionLabel: opt.label,
      sentence: buildSentence(
        situation.prompt,
        opt.label,
        situation.reasonHint,
      ),
      weatherId: opt.weatherId,
      playerName: currentPlayerName,
    };

    setSelections((prev) => [...prev, nextSelection]);

    const nextTurn = turn + 1;
    if (nextTurn >= totalPlayers) {
      setIsFinished(true);
    } else {
      setTurn(nextTurn);
    }
  }

  if (!situation) {
    return (
      <div className="flex h-[100dvh] w-full items-center justify-center">
        <BackgroundPlay />
        <div className="animate-pulse text-lg font-bold text-zinc-400">
          로딩 중... ☁️
        </div>
      </div>
    );
  }

  const currentName = playerNames[turn] || "친구";

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white/50 text-zinc-900">
      <BackgroundPlay />

      {/* 헤더 */}
      <header className="flex h-14 shrink-0 items-center justify-between px-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 rounded-full bg-white/60 px-3 py-1.5 text-xs font-bold text-zinc-500 shadow-sm backdrop-blur hover:bg-white"
        >
          <ArrowLeft size={14} /> 홈
        </button>
        <div className="text-xs font-medium text-zinc-400">
          {turn + 1} / {totalPlayers} 번째
        </div>
        <button
          onClick={() => void boot()}
          className="flex items-center gap-1 rounded-full bg-white/60 px-3 py-1.5 text-xs font-bold text-zinc-500 shadow-sm backdrop-blur hover:bg-white"
        >
          <RefreshCw size={14} />
        </button>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex flex-1 flex-col items-center gap-4 px-4 pb-4">
        {/* 1. 상황 카드 */}
        <div className="flex w-full max-w-lg flex-grow flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white/80 shadow-sm backdrop-blur">
          <div className="h-full w-full overflow-hidden p-2">
            <div className="flex h-full w-full items-center justify-center">
              <SituationPanel situation={situation} />
            </div>
          </div>
        </div>

        {/* 2. 멘트 및 진행바 */}
        {!isFinished ? (
          <div className="w-full max-w-lg text-center">
            <div className="mb-2 flex justify-center gap-1.5">
              {playerNames.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i < turn
                      ? "bg-pink-400"
                      : i === turn
                        ? "animate-pulse bg-sky-400"
                        : "bg-zinc-200"
                  }`}
                />
              ))}
            </div>

            <h2 className="text-lg font-bold text-zinc-800">
              <span className="text-pink-500 underline decoration-wavy decoration-2 underline-offset-4">
                {currentName}
              </span>
              님의 기분을 날씨로 표현하면?
            </h2>
          </div>
        ) : (
          <div className="w-full max-w-lg text-center">
            <h2 className="text-2xl font-extrabold text-zinc-800">
              모두 선택 완료! 🎉
            </h2>
            <p className="text-sm text-zinc-500">모두의 마음이 모였어요.</p>
          </div>
        )}

        {/* 3. 선택 버튼 영역 (Lottie 적용) */}
        {!isFinished ? (
          <div className="grid w-full max-w-lg grid-cols-2 gap-3 md:grid-cols-3">
            {options.map((opt) => {
              // WeatherId에 맞는 Lottie JSON 가져오기
              const weatherId = opt.weatherId as WeatherId;
              const animationData =
                WEATHER_LOTTIE[weatherId] || WEATHER_LOTTIE.sunny;

              return (
                <button
                  key={opt.id}
                  onClick={() => onPick(opt.id)}
                  className="group relative flex items-center justify-between rounded-2xl border border-zinc-100 bg-white p-3 shadow-sm transition-all hover:scale-[1.02] hover:border-pink-200 hover:bg-pink-50 hover:shadow-md active:scale-95"
                >
                  {/* 왼쪽: 이모지 + 텍스트 */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl drop-shadow-sm filter">
                      {getEmoji(opt.label)}
                    </span>
                    <span className="text-sm font-bold text-zinc-700 group-hover:text-pink-600">
                      {opt.label}
                    </span>
                  </div>

                  {/* 오른쪽: Lottie 애니메이션 */}
                  {/* h-10 w-10 (40px) 정도로 크기 고정 */}
                  <div className="h-10 w-10 opacity-90 group-hover:opacity-100">
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      className="h-full w-full"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <button
            onClick={() => void boot()}
            className="w-full max-w-lg rounded-2xl bg-gradient-to-r from-pink-400 to-rose-500 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-[1.02]"
          >
            다음 상황 카드 뽑기 ➔
          </button>
        )}
      </main>
    </div>
  );
}
