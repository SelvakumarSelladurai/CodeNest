import { useEffect, useState } from "react";
import { FiCheck, FiPause, FiPlay } from "react-icons/fi";

import Button from "../../../components/ui/Button";

type TimerStatus = "idle" | "running" | "paused";

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

/** 3723000 -> "01:02:03" */
export function formatClock(ms: number): string {
  const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((n) => String(n).padStart(2, "0")).join(":");
}

/* -------------------------------------------------------------------------- */
/*                                    Hook                                    */
/* -------------------------------------------------------------------------- */

type UsePreparationTimerOptions = {
  /** Called with the total elapsed milliseconds when the session is finished. Use this to save to the API. */
  onFinish?: (durationMs: number) => void;
};

/**
 * Tracks one preparation session. Elapsed time is computed from timestamps,
 * so it stays accurate even when the browser throttles timers in background tabs.
 */
export function usePreparationTimer({ onFinish }: UsePreparationTimerOptions = {}) {
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [accumulatedMs, setAccumulatedMs] = useState(0);
  const [segmentStart, setSegmentStart] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  // Re-render once a second while running, to update the display.
  useEffect(() => {
    if (status !== "running") return;

    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [status]);

  const elapsedMs =
    accumulatedMs + (status === "running" && segmentStart !== null ? now - segmentStart : 0);

  const start = () => {
    const timestamp = Date.now();
    setNow(timestamp);
    setSegmentStart(timestamp);
    setStatus("running");
  };

  const pause = () => {
    if (segmentStart !== null) {
      setAccumulatedMs((ms) => ms + (Date.now() - segmentStart));
    }
    setSegmentStart(null);
    setStatus("paused");
  };

  const finish = () => {
    onFinish?.(elapsedMs);

    setAccumulatedMs(0);
    setSegmentStart(null);
    setStatus("idle");
  };

  return { status, elapsedMs, start, pause, finish };
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

type PreparationTimerProps = {
  onFinish?: (durationMs: number) => void;
};

export default function PreparationTimer({ onFinish }: PreparationTimerProps) {
  const { status, elapsedMs, start, pause, finish } = usePreparationTimer({ onFinish });

  if (status === "idle") {
    return (
      <Button size="lg" onClick={start}>
        <FiPlay size={15} aria-hidden="true" />
        Start preparing
      </Button>
    );
  }

  const isRunning = status === "running";

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[#e7ebf2] bg-white py-2 pl-4 pr-2 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          {isRunning && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-75 motion-reduce:animate-none" />
          )}
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${
              isRunning ? "bg-[#10b981]" : "bg-[#f59e0b]"
            }`}
          />
        </span>

        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#718096]">
            {isRunning ? "Preparing" : "Paused"}
          </p>
          <p
            role="timer"
            aria-label="Preparation time"
            className="font-mono text-lg font-bold tabular-nums leading-tight text-[#111827]"
          >
            {formatClock(elapsedMs)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isRunning ? (
          <Button size="sm" variant="secondary" onClick={pause}>
            <FiPause size={13} aria-hidden="true" />
            Pause
          </Button>
        ) : (
          <Button size="sm" variant="secondary" onClick={start}>
            <FiPlay size={13} aria-hidden="true" />
            Resume
          </Button>
        )}

        <Button size="sm" onClick={finish}>
          <FiCheck size={13} aria-hidden="true" />
          Finish
        </Button>
      </div>
    </div>
  );
}