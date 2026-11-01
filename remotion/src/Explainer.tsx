import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/NotoSansTC";

// Noto Sans TC — SIL Open Font License 1.1
const { fontFamily } = loadFont("normal", {
  weights: ["400", "900"],
  ignoreTooManyRequestsWarning: true,
});

const BG = "#0B1E3F";
const YELLOW = "#FFC93C";
const WHITE = "#FFFFFF";

const fadeIn = (frame: number, start: number, len = 15) =>
  interpolate(frame, [start, start + len], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// ── 第 1 段：標題 ──
const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          fontSize: 140,
          fontWeight: 900,
          color: WHITE,
          transform: `scale(${pop})`,
        }}
      >
        什麼是 <span style={{ color: YELLOW }}>AI agent</span>？
      </div>
      <div
        style={{
          marginTop: 40,
          fontSize: 56,
          color: WHITE,
          opacity: fadeIn(frame, 25) * 0.85,
        }}
      >
        15 秒看懂
      </div>
    </AbsoluteFill>
  );
};

// ── 第 2 段：兩張對比卡 ──
const Card: React.FC<{
  title: string;
  line: string;
  delay: number;
  from: "left" | "right";
  highlight?: boolean;
}> = ({ title, line, delay, from, highlight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 15 } });
  const dx = (from === "left" ? -1 : 1) * 600 * (1 - p);
  return (
    <div
      style={{
        width: 680,
        height: 420,
        borderRadius: 36,
        background: "rgba(255,255,255,0.08)",
        border: `8px solid ${highlight ? YELLOW : "rgba(255,255,255,0.3)"}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transform: `translateX(${dx}px)`,
        opacity: p,
      }}
    >
      <div
        style={{
          fontSize: 84,
          fontWeight: 900,
          color: highlight ? YELLOW : WHITE,
        }}
      >
        {title}
      </div>
      <div style={{ marginTop: 30, fontSize: 60, color: WHITE }}>{line}</div>
    </div>
  );
};

const CompareScene: React.FC = () => (
  <AbsoluteFill
    style={{
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 120,
    }}
  >
    <Card title="聊天機器人" line="你問，它答" delay={0} from="left" />
    <Card title="AI agent" line="你交代，它去做" delay={25} from="right" highlight />
  </AbsoluteFill>
);

// ── 第 3 段：看 → 想 → 做 ──
const steps = [
  { big: "看", small: "讀資料" },
  { big: "想", small: "排步驟" },
  { big: "做", small: "用工具" },
];
const STEP_GAP = 30;

const LoopScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
        {steps.map((s, i) => {
          const start = 10 + i * STEP_GAP;
          const p = spring({ frame: frame - start, fps, config: { damping: 14 } });
          const lit = frame >= start;
          return (
            <React.Fragment key={s.big}>
              {i > 0 && (
                <div
                  style={{
                    fontSize: 90,
                    color: YELLOW,
                    opacity: fadeIn(frame, start - 10, 10),
                  }}
                >
                  →
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transform: `scale(${0.6 + 0.4 * p})`,
                  opacity: 0.25 + 0.75 * p,
                }}
              >
                <div
                  style={{
                    width: 260,
                    height: 260,
                    borderRadius: "50%",
                    background: lit ? YELLOW : "rgba(255,255,255,0.12)",
                    color: lit ? BG : WHITE,
                    fontSize: 130,
                    fontWeight: 900,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {s.big}
                </div>
                <div style={{ marginTop: 30, fontSize: 56, color: WHITE }}>
                  {s.small}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 80,
          fontSize: 56,
          color: WHITE,
          opacity: fadeIn(frame, 10 + 2 * STEP_GAP + 25),
        }}
      >
        做完再看結果，不對就再來一輪
      </div>
    </AbsoluteFill>
  );
};

// ── 第 4 段：結尾 ──
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200 } });
  const out = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: out }}>
      <div
        style={{
          fontSize: 120,
          fontWeight: 900,
          color: WHITE,
          transform: `translateY(${(1 - p) * 60}px)`,
          opacity: p,
        }}
      >
        你給<span style={{ color: YELLOW }}>目標</span>，它跑<span style={{ color: YELLOW }}>流程</span>
      </div>
      <div style={{ marginTop: 50, fontSize: 52, color: WHITE, opacity: fadeIn(frame, 20) * 0.8 }}>
        藍鴨 Launchdock Lab
      </div>
    </AbsoluteFill>
  );
};

export const Explainer: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily }}>
      <Sequence name="標題" durationInFrames={3 * fps}>
        <TitleScene />
      </Sequence>
      <Sequence name="對比" from={3 * fps} durationInFrames={4 * fps}>
        <CompareScene />
      </Sequence>
      <Sequence name="看想做" from={7 * fps} durationInFrames={5 * fps}>
        <LoopScene />
      </Sequence>
      <Sequence name="結尾" from={12 * fps} durationInFrames={3 * fps}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
