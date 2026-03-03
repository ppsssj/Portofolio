import { useEffect, useMemo, useState } from "react";

export default function Intro({ onSkip }) {
  const lines = useMemo(
    () => [
      "$ pnpm run build",
      "✓ analyzing modules...",
      "✓ transpiling TypeScript → JavaScript",
      "✓ tree-shaking unused exports",
      "✓ minifying chunks",
      "✓ optimizing assets (14/18)",
      "",
      "[INFO] Generating static pages...",
      '[WARN] Image "hero.png" is larger than recommended size.',
    ],
    [],
  );

  const [visibleCount, setVisibleCount] = useState(0);
  const [progress, setProgress] = useState(0);

  // 타이핑처럼 로그가 한 줄씩 등장
  useEffect(() => {
    const t = setInterval(() => {
      setVisibleCount((c) => Math.min(c + 1, lines.length));
    }, 180);
    return () => clearInterval(t);
  }, [lines.length]);

  // 하단 프로그레스 바
  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        const next = p + (p < 85 ? 2 : 0.2);
        return Math.min(next, 100);
      });
    }, 60);
    return () => clearInterval(t);
  }, []);

  // 일정 진행 후 자동 스킵(원하면 제거 가능)
  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(onSkip, 450);
      return () => clearTimeout(t);
    }
  }, [progress, onSkip]);

  return (
    <div className="min-h-screen w-full bg-[#F6F8FB] text-slate-900 relative overflow-hidden">
      {/* Top left label */}
      <div className="absolute left-6 top-5 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg border border-slate-900/10 bg-white/70 grid place-items-center">
          <span className="text-xs text-slate-700">⌁</span>
        </div>
        <div className="leading-tight">
          <div className="text-[11px] tracking-[0.18em] text-slate-600">
            SYSTEM.INIT
          </div>
          <div className="text-[11px] text-cyan-600">v4.0.2-stable</div>
        </div>
      </div>

      {/* Skip */}
      <button
        type="button"
        onClick={onSkip}
        className="absolute right-6 top-5 text-[12px] text-slate-600 hover:text-slate-900 transition"
      >
        Skip Intro <span className="ml-1">»</span>
      </button>

      {/* Center editor mock */}
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-5xl">
          {/* 카드: 요청대로 그대로 유지 (다크 톤/화이트 기준 컬러 유지) */}
          <div className="rounded-2xl border border-slate-800 bg-[#0D1117] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* window chrome */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-300/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />
              </div>
              <div className="text-[12px] text-slate-400">Portfolio.tsx</div>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="text-[12px]">⌕</span>
                <span className="text-[12px]">⚙</span>
              </div>
            </div>

            {/* code area */}
            <div className="px-6 py-6">
              <pre className="text-[13px] leading-6 text-slate-300 overflow-hidden">
                <code>
                  <span className="text-violet-300">import</span>{" "}
                  <span className="text-white/90">React</span>{" "}
                  <span className="text-violet-300">from</span>{" "}
                  <span className="text-emerald-300">'react'</span>;{"\n"}
                  <span className="text-violet-300">import</span> {"{ "}
                  <span className="text-white/90">Hero</span>,{" "}
                  <span className="text-white/90">ProjectGrid</span> {"} "}
                  <span className="text-violet-300">from</span>{" "}
                  <span className="text-emerald-300">'./components'</span>;
                  {"\n\n"}
                  <span className="text-violet-300">const</span>{" "}
                  <span className="text-sky-300">Portfolio</span>{" "}
                  <span className="text-white/70">=</span>{" "}
                  <span className="text-white/90">()</span>{" "}
                  <span className="text-white/70">=&gt;</span> {"{"}
                  {"\n"}
                  {"  "}
                  <span className="text-violet-300">return</span> {"("}
                  {"\n"}
                  {"    "}
                  {"<"}
                  <span className="text-white/90">main</span>{" "}
                  <span className="text-amber-200">
                    className="max-w-7xl mx-auto"
                  </span>
                  {">"}
                  {"\n"}
                  {"      "}
                  {"<"}
                  <span className="text-white/90">Hero</span>
                  {"\n"}
                  {"        "}
                  <span className="text-amber-200">
                    title="Building digital experiences"
                  </span>
                  {"\n"}
                  {"        "}
                  <span className="text-amber-200">
                    subtitle="Full-stack Developer & Designer"
                  </span>
                  {"\n"}
                  {"      "}
                  {"/>"}
                  {"\n\n"}
                  {"      "}
                  {"<"}
                  <span className="text-white/90">ProjectGrid</span>{" "}
                  <span className="text-amber-200">
                    filter={"{"}true{"}"}
                  </span>{" "}
                  {"/>"}
                  <span className="inline-block w-[10px] h-[18px] bg-sky-400/80 align-middle ml-1 animate-pulse" />
                  {"\n"}
                  {"    "}
                  {"</"}
                  <span className="text-white/90">main</span>
                  {">"}
                  {"\n"}
                  {"  "}
                  {");"}
                  {"\n"}
                  {"};"}
                </code>
              </pre>
            </div>

            {/* bottom terminal */}
            <div className="border-t border-slate-800">
              <div className="flex items-center gap-6 px-6 py-3 text-[12px] text-slate-400">
                <span className="text-sky-400/90">●</span>
                <span className="text-sky-400/90">TERMINAL</span>
                <span>BUILD</span>
                <span>LOGS</span>
                <span className="ml-auto text-slate-500">MEMORY: 42.1MB</span>
              </div>

              <div className="px-6 pb-4">
                <div className="font-mono text-[12px] leading-5 text-slate-300 min-h-[120px]">
                  {lines.slice(0, visibleCount).map((l, i) => (
                    <div
                      key={i}
                      className={
                        l.startsWith("[WARN]")
                          ? "text-amber-300/80"
                          : l.startsWith("[INFO]")
                            ? "text-slate-400"
                            : ""
                      }
                    >
                      {l || "\u00A0"}
                    </div>
                  ))}
                </div>

                <div className="mt-4 h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-sky-400/80 transition-[width] duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>OPTIMIZING... {Math.floor(progress)}%</span>
                  <span className="text-slate-600">
                    main · 0.4s · BUILD SUCCESS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* hint (카드 밖) */}
          <div className="mt-5 text-center text-[12px] text-slate-500">
            Press <span className="text-slate-900">Esc</span> to skip
          </div>
        </div>
      </div>
    </div>
  );
}
