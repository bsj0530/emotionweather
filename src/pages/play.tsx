import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { ArrowLeft, RefreshCw, Home } from "lucide-react";
import Lottie from "lottie-react";

import type {
  EmotionOption,
  Selection,
  SituationCard,
  WeatherId,
} from "../features/orchestra/model/types";

// 아까 만든 weatherLottie.ts와 mapping.ts에서 가져옴
import { buildSentence } from "../features/orchestra/model/mapping";
import { WEATHER_LOTTIE } from "../features/orchestra/model/weatherLottie";

import {
  getEmotionOptions,
  getRandomSituation,
} from "../features/orchestra/data/repository";
import SituationPanel from "../features/orchestra/components/SituationPanel";

// ==========================================
// 1. 헬퍼 함수
// ==========================================
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

  // URL에서 닉네임 가져오기
  const playerNames = useMemo(() => {
    const rawNames = params.get("names");
    if (!rawNames) return ["학생1", "학생2"];
    return decodeURIComponent(rawNames).split(",");
  }, [params]);

  const totalPlayers = playerNames.length;

  const [turn, setTurn] = useState(0);
  const [situation, setSituation] = useState<SituationCard | null>(null);
  const [options, setOptions] = useState<EmotionOption[]>([]);

  // ★ 여기가 중요: 아이들의 선택이 여기에 쌓임
  const [selections, setSelections] = useState<Selection[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // 게임 초기화
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 감정 선택 시 실행
  function onPick(emotionId: string) {
    if (!situation) return;
    if (turn >= totalPlayers) return;

    const opt = options.find((o) => o.id === emotionId);
    if (!opt) return;

    const currentPlayerName = playerNames[turn];

    // 선택 정보 객체 생성
    const nextSelection: Selection = {
      turnIndex: turn,
      emotionId: opt.id,
      emotionLabel: opt.label,
      // data.ts의 reasonHint를 사용하여 문장 완성
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
      // 마지막 사람이면 결과 화면으로 전환
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
          카드를 섞고 있어요... 🃏
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
          <Home size={14} /> 홈
        </button>

        <div className="text-xs font-medium text-zinc-400">
          {/* 결과 화면일 땐 '결과 발표', 진행 중일 땐 순서 표시 */}
          {isFinished ? "결과 발표 🎉" : `${turn + 1} / ${totalPlayers} 번째`}
        </div>

        <button
          onClick={() => void boot()}
          className="flex items-center gap-1 rounded-full bg-white/60 px-3 py-1.5 text-xs font-bold text-zinc-500 shadow-sm backdrop-blur hover:bg-white"
        >
          <RefreshCw size={14} />
        </button>
      </header>

      {/* ========================================================= */}
      {/* 4. 결과 화면 (모든 선택이 끝났을 때) */}
      {/* ========================================================= */}
      {isFinished ? (
        <main className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pt-2 pb-20">
          {/* 상단 타이틀 */}
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-zinc-800">
              우리 반 날씨 이야기
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              같은 상황이지만 서로 다른 마음 날씨가 모였어요.
            </p>
          </div>

          {/* 결과 리스트 (카드 형태) */}
          <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {selections.map((selection, idx) => {
              // 선택한 날씨에 맞는 Lottie 가져오기
              const weatherId = selection.weatherId as WeatherId;
              const animationData =
                WEATHER_LOTTIE[weatherId] || WEATHER_LOTTIE.sunny;

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center rounded-2xl border border-zinc-100 bg-white/80 p-4 shadow-sm backdrop-blur transition-transform hover:scale-[1.02]"
                >
                  {/* 이름 뱃지 */}
                  <div className="mb-2 rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-600">
                    {selection.playerName}
                  </div>

                  {/* 날씨 Lottie (좀 더 크게) */}
                  <div className="h-24 w-24">
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      className="h-full w-full"
                    />
                  </div>

                  {/* 감정 라벨 */}
                  <div className="mt-1 text-lg font-bold text-zinc-800">
                    {getEmoji(selection.emotionLabel)} {selection.emotionLabel}
                  </div>

                  {/* 완성된 문장 (말풍선 느낌) */}
                  <div className="mt-3 w-full rounded-xl bg-zinc-50 px-3 py-2 text-center text-sm font-medium text-zinc-600">
                    "{selection.sentence}"
                  </div>
                </div>
              );
            })}
          </div>

          {/* 하단 재시작 버튼 */}
          <div className="mt-4 flex justify-center pb-8">
            <button
              onClick={() => void boot()}
              className="flex w-full max-w-sm items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-500 py-3 text-lg font-bold text-white shadow-lg transition hover:scale-[1.02]"
            >
              <RefreshCw size={20} />
              다음 상황으로 넘어가기
            </button>
          </div>
        </main>
      ) : (
        /* ========================================================= */
        /* 5. 게임 진행 화면 (선택 중일 때) */
        /* ========================================================= */
        <main className="flex flex-1 flex-col items-center gap-4 px-4 pb-4">
          {/* 상황 카드 (화면 비율상 가장 크게) */}
          <div className="flex w-full max-w-lg flex-grow flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white/80 shadow-sm backdrop-blur">
            <div className="h-full w-full overflow-hidden p-2">
              <div className="flex h-full w-full items-center justify-center">
                <SituationPanel situation={situation} />
              </div>
            </div>
          </div>

          {/* 멘트 및 진행바 */}
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

          {/* 선택 버튼 영역 */}
          <div className="grid w-full max-w-lg grid-cols-2 gap-3 md:grid-cols-3">
            {options.map((opt) => {
              const weatherId = opt.weatherId as WeatherId;
              const animationData =
                WEATHER_LOTTIE[weatherId] || WEATHER_LOTTIE.sunny;

              return (
                <button
                  key={opt.id}
                  onClick={() => onPick(opt.id)}
                  className="group relative flex items-center justify-between rounded-2xl border border-zinc-100 bg-white p-3 shadow-sm transition-all hover:scale-[1.02] hover:border-pink-200 hover:bg-pink-50 hover:shadow-md active:scale-95"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl drop-shadow-sm filter">
                      {getEmoji(opt.label)}
                    </span>
                    <span className="text-sm font-bold text-zinc-700 group-hover:text-pink-600">
                      {opt.label}
                    </span>
                  </div>
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
        </main>
      )}
    </div>
  );
}
