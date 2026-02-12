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
import { EMOTION_THEME } from "../features/orchestra/model/emotionTheme";

import {
  getRandomSituation,
  getEmotionOptionsForSituation,
} from "../features/orchestra/data/repository";

// ==========================================
// 0. 이미지 Assets Import
// ==========================================
import happy from "@/assets/face/happy.png";
import sad from "@/assets/face/sad.png";
import angry from "@/assets/face/angry.png";
import surprised from "@/assets/face/suprised.png";
import jealous from "@/assets/face/jealous.png";
import proud from "@/assets/face/proud.png";
import thankful from "@/assets/face/thanks.png";
import embarrassed from "@/assets/face/embarrassed.png";
import confused from "@/assets/face/confused.png";
import cry from "@/assets/face/cry.png";
import mad from "@/assets/face/mad.png";

// ==========================================
// 1. 헬퍼 함수
// ==========================================
function getEmotionImage(label: string) {
  if (
    label.includes("기뻐") ||
    label.includes("행복") ||
    label.includes("신나")
  )
    return happy;
  if (label.includes("뿌듯") || label.includes("자랑")) return proud;
  if (label.includes("고마")) return thankful;
  if (
    label.includes("슬퍼") ||
    label.includes("우울") ||
    label.includes("서운") ||
    label.includes("걱정") ||
    label.includes("억울") ||
    label.includes("불안")
  )
    return sad;
  if (label.includes("속상") || label.includes("슬퍼")) return cry;
  if (
    label.includes("짜증") ||
    label.includes("기분이 나빠") ||
    label.includes("기분 나빠")
  )
    return angry;
  if (label.includes("화")) return mad;
  if (label.includes("놀라")) return surprised;
  if (label.includes("부끄러")) return embarrassed;
  if (label.includes("어이없")) return confused;
  if (label.includes("질투") || label.includes("부러")) return jealous;
  return happy;
}

// ✅ 문장 내 특정 구절 하이라이트
function renderHighlightedSentence(sentence: string, highlight?: string) {
  if (!highlight) return sentence;
  const idx = sentence.indexOf(highlight);
  if (idx === -1) return sentence;

  const before = sentence.slice(0, idx);
  const mid = sentence.slice(idx, idx + highlight.length);
  const after = sentence.slice(idx + highlight.length);

  return (
    <>
      {before}
      <span className="rounded-lg bg-yellow-200/80 px-2 py-1 text-zinc-900">
        {mid}
      </span>
      {after}
    </>
  );
}

// ==========================================
// 2. 배경 컴포넌트
// ==========================================
function BackgroundPlay() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-white">
      <div className="absolute top-[6%] left-[15%] h-10 w-10 animate-bounce rounded-full bg-[#aee6ff] opacity-40 [animation-duration:5s]" />
      <div className="absolute top-[8%] left-[45%] h-6 w-6 animate-pulse rounded-full bg-[#ffb3c7] opacity-30 [animation-duration:3s]" />
      <div className="absolute top-[10%] right-[18%] h-12 w-12 animate-bounce rounded-full bg-[#aee6ff] opacity-35 [animation-duration:6s]" />
      <div className="absolute top-[18%] right-[35%] h-5 w-5 animate-pulse rounded-full bg-[#ffb3c7] opacity-25 [animation-duration:2.5s]" />
      <div className="absolute top-[14%] left-[28%] h-14 w-14 animate-bounce rounded-full bg-[#ffb3c7] opacity-35 [animation-duration:5.5s]" />
      <div className="absolute top-[20%] left-[60%] h-6 w-6 rounded-full bg-[#aee6ff] opacity-25" />
      <div className="absolute top-[40%] left-[6%] h-12 w-12 animate-bounce rounded-full bg-[#aee6ff] opacity-35 [animation-duration:4.8s]" />
      <div className="absolute top-[55%] left-[14%] h-6 w-6 animate-pulse rounded-full bg-[#ffb3c7] opacity-25 [animation-duration:3s]" />
      <div className="absolute top-[48%] left-[18%] h-8 w-8 animate-bounce rounded-full bg-[#ffb3c7] opacity-30 [animation-duration:5s]" />
      <div className="absolute top-[42%] right-[6%] h-12 w-12 animate-bounce rounded-full bg-[#ffb3c7] opacity-35 [animation-duration:5s]" />
      <div className="absolute top-[58%] right-[14%] h-6 w-6 animate-pulse rounded-full bg-[#aee6ff] opacity-25 [animation-duration:3s]" />
      <div className="absolute top-[50%] right-[18%] h-8 w-8 animate-bounce rounded-full bg-[#aee6ff] opacity-30 [animation-duration:5.5s]" />
      <div className="absolute bottom-[20%] left-[20%] h-14 w-14 animate-bounce rounded-full bg-[#aee6ff] opacity-35 [animation-duration:6s]" />
      <div className="absolute bottom-[12%] left-[45%] h-6 w-6 animate-pulse rounded-full bg-[#ffb3c7] opacity-25 [animation-duration:3s]" />
      <div className="absolute right-[30%] bottom-[8%] h-10 w-10 animate-bounce rounded-full bg-[#aee6ff] opacity-30 [animation-duration:5s]" />
      <div className="absolute right-[12%] bottom-[25%] h-12 w-12 animate-bounce rounded-full bg-[#ffb3c7] opacity-40 [animation-duration:5.5s]" />
      <div className="absolute right-[45%] bottom-[15%] h-5 w-5 animate-pulse rounded-full bg-[#aee6ff] opacity-25 [animation-duration:2.5s]" />
      <div className="absolute bottom-[6%] left-[10%] h-8 w-8 rounded-full bg-[#ffb3c7] opacity-30" />
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

    const sit = await getRandomSituation();
    const opts = getEmotionOptionsForSituation(sit);

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

  const leftOptions = options.slice(0, 3);
  const rightOptions = options.slice(3, 6);

  // ==========================================
  // ✅ 수정된 옵션 버튼 (병렬 배치 + 사이즈 확대)
  // ==========================================
  const renderOptionBtn = (opt: EmotionOption) => {
    const theme = EMOTION_THEME[opt.id];

    // ✅ theme가 기준(중앙 매핑)이고, 없으면 opt.weatherId 사용
    const weatherId = (theme?.weatherId ?? opt.weatherId) as WeatherId;

    const animationData = WEATHER_LOTTIE[weatherId] || WEATHER_LOTTIE.sunny;
    const emotionImg = theme?.image ?? getEmotionImage(opt.label);

    return (
      <button
        key={opt.id}
        onClick={() => onPick(opt.id)}
        className="group relative flex flex-1 flex-col items-center justify-center gap-2 rounded-3xl border-2 border-zinc-100 bg-white px-2 py-3 shadow-sm transition-all hover:-translate-y-1 hover:border-pink-300 hover:bg-pink-50 hover:shadow-lg active:scale-95"
      >
        <div className="flex w-full items-center justify-center gap-2">
          <div className="h-24 w-24 shrink-0 opacity-90 transition-transform group-hover:scale-110 group-hover:opacity-100 lg:h-28 lg:w-28">
            <Lottie
              animationData={animationData}
              loop={true}
              className="h-full w-full"
            />
          </div>

          <div className="h-20 w-20 shrink-0 drop-shadow-sm lg:h-24 lg:w-24">
            <img
              src={emotionImg}
              alt={opt.label}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <span className="text-xl font-bold text-zinc-700 group-hover:text-pink-600 lg:text-2xl">
          {opt.label}
        </span>
      </button>
    );
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white/50 text-zinc-900">
      <BackgroundPlay />

      <header className="z-10 flex h-14 shrink-0 items-center justify-between px-6 pt-2">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-zinc-600 shadow-sm backdrop-blur hover:bg-white"
        >
          <Home size={16} /> 홈
        </button>

        <button
          onClick={() => void boot()}
          className="flex items-center gap-1 rounded-full bg-white/80 px-3 py-2 text-sm font-bold text-zinc-600 shadow-sm backdrop-blur hover:bg-white"
        >
          <RefreshCw size={16} />
        </button>
      </header>

      {/* ========================================================= */}
      {/* 4. 결과 화면 */}
      {/* ========================================================= */}
      {isFinished ? (
        <main className="flex flex-1 flex-col items-center overflow-y-auto px-4 py-8">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-extrabold text-zinc-800 drop-shadow-sm">
              우리 반 감정 날씨 결과 🌈
            </h2>
            <p className="mt-3 text-lg text-zinc-500">
              친구들이 선택한 마음의 날씨를 확인해보세요.
            </p>
          </div>

          <div className="flex w-full max-w-4xl flex-col gap-6 pb-28">
            {selections.map((selection, idx) => {
              const theme = EMOTION_THEME[selection.emotionId];
              const weatherId = (theme?.weatherId ??
                selection.weatherId) as WeatherId;
              const animationData =
                WEATHER_LOTTIE[weatherId] || WEATHER_LOTTIE.sunny;

              const emotionImg =
                theme?.image ?? getEmotionImage(selection.emotionLabel);

              return (
                <div
                  key={idx}
                  className="flex items-center gap-6 rounded-[2rem] border border-zinc-100 bg-white/90 p-6 shadow-md backdrop-blur transition-transform hover:scale-[1.01]"
                >
                  <div className="flex min-w-[7rem] shrink-0 flex-col items-center justify-center gap-2 rounded-3xl bg-pink-50 px-6 py-4">
                    <User size={28} className="text-pink-400" />
                    <span className="text-lg font-bold text-pink-600">
                      {selection.playerName}
                    </span>
                  </div>

                  <div className="h-28 w-28 shrink-0">
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      className="h-full w-full"
                    />
                  </div>

                  <div className="flex shrink-0 items-center justify-center">
                    <img
                      src={emotionImg}
                      alt="emotion"
                      className="h-20 w-20 object-contain drop-shadow-sm"
                    />
                  </div>

                  <div className="flex flex-1 items-center pl-4">
                    <p className="text-2xl leading-snug font-bold break-keep text-zinc-800">
                      “
                      {renderHighlightedSentence(
                        selection.sentence,
                        selection.emotionLabel,
                      )}
                      ”
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="fixed right-0 bottom-10 left-0 flex justify-center px-4">
            <button
              onClick={() => void boot()}
              className="flex w-full max-w-lg items-center justify-center gap-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 py-5 text-xl font-bold text-white shadow-xl transition hover:scale-105 hover:shadow-2xl active:scale-95"
            >
              <RefreshCw size={24} />
              다음 상황으로 넘어가기
            </button>
          </div>
        </main>
      ) : (
        /* ========================================================= */
        /* 5. 퀴즈 화면 */
        /* ========================================================= */
        <main className="flex flex-1 items-stretch justify-center gap-4 px-4 py-4 md:gap-8 md:px-8">
          <div className="flex w-1/4 min-w-[220px] flex-col gap-4 py-4">
            {leftOptions.map(renderOptionBtn)}
          </div>

          <div className="flex flex-1 flex-col items-center justify-center px-4">
            <div className="mb-6 flex items-center gap-2 rounded-full border border-pink-200 bg-white px-5 py-2 shadow-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                <User size={18} fill="currentColor" />
              </span>
              <span className="text-lg font-bold text-pink-600">
                {currentName} 차례
              </span>
            </div>

            <div className="relative mb-6 aspect-video w-full max-w-2xl overflow-hidden rounded-3xl shadow-lg ring-4 ring-white">
              <img
                src={situation.imageUrl}
                alt="Situation"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="text-center">
              <span className="mb-3 inline-block rounded-full bg-sky-100 px-4 py-1.5 text-sm font-bold text-sky-600 shadow-sm">
                상황 질문
              </span>
              <h2 className="px-4 text-3xl leading-snug font-extrabold break-keep text-zinc-800 drop-shadow-sm">
                Q. {situation.prompt}
              </h2>
            </div>
          </div>

          <div className="flex w-1/4 min-w-[220px] flex-col gap-4 py-4">
            {rightOptions.map(renderOptionBtn)}
          </div>
        </main>
      )}
    </div>
  );
}
