import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { RefreshCw, Home, User } from "lucide-react";
import Lottie from "lottie-react";

import type {
  EmotionOption,
  Selection,
  SituationCard,
  WeatherId,
} from "../features/orchestra/model/types";

import { WEATHER_LOTTIE } from "../features/orchestra/model/weatherLottie";

import {
  getEmotionOptions,
  getRandomSituation,
} from "../features/orchestra/data/repository";

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
// 2. 배경 컴포넌트 (요청하신 BackgroundLogin 코드 적용)
// ==========================================
function BackgroundPlay() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-white">
      {/* ================= TOP AREA ================= */}

      <div className="absolute top-[6%] left-[15%] h-10 w-10 animate-bounce rounded-full bg-[#aee6ff] opacity-40 [animation-duration:5s]" />
      <div className="absolute top-[8%] left-[45%] h-6 w-6 animate-pulse rounded-full bg-[#ffb3c7] opacity-30 [animation-duration:3s]" />
      <div className="absolute top-[10%] right-[18%] h-12 w-12 animate-bounce rounded-full bg-[#aee6ff] opacity-35 [animation-duration:6s]" />
      <div className="absolute top-[18%] right-[35%] h-5 w-5 animate-pulse rounded-full bg-[#ffb3c7] opacity-25 [animation-duration:2.5s]" />
      <div className="absolute top-[14%] left-[28%] h-14 w-14 animate-bounce rounded-full bg-[#ffb3c7] opacity-35 [animation-duration:5.5s]" />
      <div className="absolute top-[20%] left-[60%] h-6 w-6 rounded-full bg-[#aee6ff] opacity-25" />

      {/* ================= MIDDLE LEFT ================= */}

      <div className="absolute top-[40%] left-[6%] h-12 w-12 animate-bounce rounded-full bg-[#aee6ff] opacity-35 [animation-duration:4.8s]" />
      <div className="absolute top-[55%] left-[14%] h-6 w-6 animate-pulse rounded-full bg-[#ffb3c7] opacity-25 [animation-duration:3s]" />
      <div className="absolute top-[48%] left-[18%] h-8 w-8 animate-bounce rounded-full bg-[#ffb3c7] opacity-30 [animation-duration:5s]" />

      {/* ================= MIDDLE RIGHT ================= */}

      <div className="absolute top-[42%] right-[6%] h-12 w-12 animate-bounce rounded-full bg-[#ffb3c7] opacity-35 [animation-duration:5s]" />
      <div className="absolute top-[58%] right-[14%] h-6 w-6 animate-pulse rounded-full bg-[#aee6ff] opacity-25 [animation-duration:3s]" />
      <div className="absolute top-[50%] right-[18%] h-8 w-8 animate-bounce rounded-full bg-[#aee6ff] opacity-30 [animation-duration:5.5s]" />

      {/* ================= BOTTOM AREA ================= */}

      <div className="absolute bottom-[20%] left-[20%] h-14 w-14 animate-bounce rounded-full bg-[#aee6ff] opacity-35 [animation-duration:6s]" />
      <div className="absolute bottom-[12%] left-[45%] h-6 w-6 animate-pulse rounded-full bg-[#ffb3c7] opacity-25 [animation-duration:3s]" />
      <div className="absolute right-[30%] bottom-[8%] h-10 w-10 animate-bounce rounded-full bg-[#aee6ff] opacity-30 [animation-duration:5s]" />
      <div className="absolute right-[12%] bottom-[25%] h-12 w-12 animate-bounce rounded-full bg-[#ffb3c7] opacity-40 [animation-duration:5.5s]" />
      <div className="absolute right-[45%] bottom-[15%] h-5 w-5 animate-pulse rounded-full bg-[#aee6ff] opacity-25 [animation-duration:2.5s]" />
      <div className="absolute bottom-[6%] left-[10%] h-8 w-8 rounded-full bg-[#ffb3c7] opacity-30" />

      {/* ================= CENTER SIDE AREA ================= */}

      <div className="absolute top-[38%] left-[26%] h-14 w-14 animate-bounce rounded-full bg-[#aee6ff] opacity-35 [animation-duration:5s]" />
      <div className="absolute top-[58%] left-[28%] h-10 w-10 animate-bounce rounded-full bg-[#ffb3c7] opacity-30 [animation-duration:6s]" />
      <div className="absolute top-[40%] right-[26%] h-14 w-14 animate-bounce rounded-full bg-[#ffb3c7] opacity-35 [animation-duration:5.5s]" />
      <div className="absolute top-[50%] right-[32%] h-6 w-6 animate-pulse rounded-full bg-[#aee6ff] opacity-25 [animation-duration:3s]" />
      <div className="absolute top-[60%] right-[30%] h-10 w-10 animate-bounce rounded-full bg-[#aee6ff] opacity-30 [animation-duration:6s]" />
      <div className="absolute top-[44%] right-[18%] h-5 w-5 rounded-full bg-[#ffb3c7] opacity-25" />
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
    const finalSentence =
      situation.sentences[emotionId] || `나는 ${opt.label}.`;

    const nextSelection: Selection = {
      turnIndex: turn,
      emotionId: opt.id,
      emotionLabel: opt.label,
      sentence: finalSentence,
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
      <header className="z-10 flex h-14 shrink-0 items-center justify-between px-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 rounded-full bg-white/60 px-3 py-1.5 text-xs font-bold text-zinc-500 shadow-sm backdrop-blur hover:bg-white"
        >
          <Home size={14} /> 홈
        </button>

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
        <main className="flex flex-1 flex-col overflow-y-auto pb-20">
          {/* 상단: 상황 이미지 */}
          <div className="w-full shrink-0">
            <div className="relative aspect-video w-full bg-zinc-100 md:aspect-[21/9]">
              <img
                src={situation.imageUrl}
                alt="상황 이미지"
                className="h-full w-full object-cover"
              />
            </div>

            {/* 질문 텍스트 영역 */}
            <div className="relative z-10 -mt-8 px-6 text-center">
              <span className="mb-2 inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-sky-600 shadow-sm">
                오늘의 상황
              </span>
              <h2 className="text-2xl leading-relaxed font-bold break-keep text-zinc-800 drop-shadow-sm">
                Q. {situation.prompt}
              </h2>
            </div>
          </div>

          {/* 구분 타이틀 */}
          <div className="relative py-6 text-center">
            <div className="absolute inset-0 top-1/2 -z-10 h-px w-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />
            <span className="bg-[#fcfdfe] px-4 text-sm font-medium text-zinc-500">
              우리 반 친구들의 날씨는?
            </span>
          </div>

          {/* 결과 리스트 */}
          <div className="grid w-full grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
            {selections.map((selection, idx) => {
              const weatherId = selection.weatherId as WeatherId;
              const animationData =
                WEATHER_LOTTIE[weatherId] || WEATHER_LOTTIE.sunny;

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center rounded-2xl border border-zinc-100 bg-white/80 p-5 shadow-sm backdrop-blur transition-transform hover:scale-[1.02]"
                >
                  <div className="mb-2 rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-600">
                    {selection.playerName}
                  </div>

                  <div className="h-28 w-28">
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      className="h-full w-full"
                    />
                  </div>

                  <div className="mt-2 text-lg font-bold text-zinc-500">
                    {getEmoji(selection.emotionLabel)} {selection.emotionLabel}
                  </div>

                  <div className="mt-4 w-full rounded-xl bg-zinc-50 px-4 py-4 text-center">
                    <p className="text-xl leading-snug font-bold break-keep text-zinc-800">
                      "{selection.sentence}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center px-4">
            <button
              onClick={() => void boot()}
              className="flex w-full max-w-sm items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-500 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-[1.02]"
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
        <main className="flex w-full flex-1 flex-col items-center pb-4">
          {/* 이미지 영역: 넓게 유지 */}
          {/* [수정됨] max-h-[50vh] 추가하여 높이 제한을 둠 */}
          <div className="relative mx-auto mb-4 max-h-[50vh] min-h-0 w-full max-w-3xl flex-1 overflow-hidden rounded-b-3xl shadow-sm">
            <img
              src={situation.imageUrl}
              alt="Situation"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative z-10 -mt-12 flex w-full max-w-lg flex-col items-center px-5">
            {/* 플레이어 차례 배지 */}
            <div className="mb-2 flex items-center gap-1.5 rounded-full border border-pink-100 bg-white/90 py-1 pr-3 pl-1 shadow-sm backdrop-blur-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                <User size={14} fill="currentColor" />
              </span>
              <span className="text-sm font-bold text-pink-600">
                {currentName} 차례
              </span>
            </div>

            {/* 질문 텍스트 */}
            <h2 className="mb-4 text-center text-xl leading-snug font-bold break-keep text-zinc-800 md:text-2xl">
              Q. {situation.prompt}
            </h2>

            {/* 6개 옵션을 3열(grid-cols-3)로 배치 */}
            <div className="grid w-full grid-cols-3 gap-2">
              {options.map((opt) => {
                const weatherId = opt.weatherId as WeatherId;
                const animationData =
                  WEATHER_LOTTIE[weatherId] || WEATHER_LOTTIE.sunny;

                return (
                  <button
                    key={opt.id}
                    onClick={() => onPick(opt.id)}
                    className="group relative flex flex-col items-center justify-center gap-1 rounded-2xl border border-zinc-100 bg-white p-2 py-3 shadow-sm transition-all hover:scale-[1.02] hover:border-pink-200 hover:bg-pink-50 hover:shadow-md active:scale-95"
                  >
                    {/* 날씨 아이콘 */}
                    <div className="h-10 w-10 opacity-90 group-hover:opacity-100">
                      <Lottie
                        animationData={animationData}
                        loop={true}
                        className="h-full w-full"
                      />
                    </div>

                    {/* 이모지 + 라벨 */}
                    <div className="flex items-center gap-1">
                      <span className="text-sm drop-shadow-sm filter">
                        {getEmoji(opt.label)}
                      </span>
                      <span className="text-xs font-bold text-zinc-700 group-hover:text-pink-600">
                        {opt.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
