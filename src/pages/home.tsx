import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, X, User } from "lucide-react";

// 배경 컴포넌트 (변경 없음)
function BackgroundLogin() {
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

export default function Home() {
  const navigate = useNavigate();

  // 닉네임 상태 관리 (기본 2명으로 시작)
  const [names, setNames] = useState<string[]>(["", ""]);

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const addMember = () => {
    if (names.length < 6) {
      setNames([...names, ""]);
    }
  };

  const removeMember = (index: number) => {
    if (names.length > 1) {
      setNames(names.filter((_, i) => i !== index));
    }
  };

  const handleStart = () => {
    const validNames = names.filter((n) => n.trim() !== "");
    if (validNames.length === 0) {
      alert("최소 한 명의 이름을 입력해주세요!");
      return;
    }
    const namesQuery = encodeURIComponent(validNames.join(","));
    navigate(`/play?students=${validNames.length}&names=${namesQuery}`);
  };

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-y-auto text-zinc-900">
      <BackgroundLogin />

      <div className="relative flex w-full max-w-lg flex-col items-center gap-8 px-6 py-10 md:gap-12">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            감정을 골라
            <br />
            날씨로 표현해요
          </h1>
        </div>

        <div className="w-full rounded-3xl border border-zinc-200 bg-white/85 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-800">참가자 닉네임</h2>
            <span className="text-xs font-medium text-zinc-500">
              {names.length} / 6 명
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {names.map((name, index) => (
              <div
                key={index}
                className="group relative flex items-center gap-2"
              >
                <div className="relative w-full">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={`닉네임 ${index + 1}`}
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pr-10 pl-10 text-base font-medium transition outline-none placeholder:text-zinc-400 focus:border-pink-300 focus:bg-white focus:ring-2 focus:ring-pink-100"
                    maxLength={10}
                  />
                </div>

                {names.length > 1 && (
                  <button
                    onClick={() => removeMember(index)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-red-50 hover:text-red-500"
                    aria-label="삭제"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}

            {/* 여기를 예쁘게 변경했습니다! */}
            {names.length < 6 && (
              <button
                onClick={addMember}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-pink-50 py-3.5 text-base font-bold text-pink-500 transition-all hover:bg-pink-100 hover:text-pink-600 active:scale-[0.98]"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-200 text-white transition-transform group-hover:rotate-90 group-hover:bg-pink-300">
                  <Plus size={14} strokeWidth={3} />
                </div>
                인원 추가하기
              </button>
            )}
          </div>

          <button
            onClick={handleStart}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-pink-400 to-rose-500 py-4 text-lg font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={names.every((n) => n.trim() === "")}
          >
            시작하기
          </button>
        </div>

        <div className="text-center text-xs text-zinc-400">© Seungje</div>
      </div>
    </div>
  );
}
