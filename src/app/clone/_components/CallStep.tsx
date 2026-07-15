"use client";

import { useState, useRef, useEffect } from "react";
import { StepHeader } from "./StepHeader";
import { StatusPill } from "./StatusPill";
import type { CallState, TranscriptItem } from "@/lib/types";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_CLONE_BACKEND_URL || "https://api.kyronmedical.com";
const avatar = {
  user: "rgba(219,234,254,1)",
  agent: "linear-gradient(135deg, #059669, #047857)",
};
type StepStatus = "pending" | "active" | "done";

export function CallStep({
  agentId,
  stepStatus,
}: {
  agentId: string | null;
  stepStatus: StepStatus;
}) {
  const [state, setState] = useState<CallState>("idle");
  const [msgs, setMsgs] = useState<TranscriptItem[]>([]);
  const [paused, setPaused] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [timer, setTimer] = useState(180); // 3 min cap
  const [callEnded, setCallEnded] = useState(false);

  const call = useRef<any>(null);
  const unsub = useRef<(() => void) | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const countDown = useRef<NodeJS.Timeout | null>(null);
  const originalError = useRef<any>(null);

  useEffect(() => {
    if (box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [msgs]);

  // Countdown timer - hard limit at 0
  useEffect(() => {
    if (state === "connected" && timer > 0) {
      countDown.current = setInterval(
        () =>
          setTimer((t) => {
            if (t <= 1) {
              // Force hangup at 0
              setTimeout(() => hangup(), 100);
              return 0;
            }
            return t - 1;
          }),
        1000,
      );
    }
    return () => {
      if (countDown.current) clearInterval(countDown.current);
    };
  }, [state, timer]);

  const fmt = (s: number) => {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${m}:${sec}`;
  };

  const start = async () => {
    if (!agentId) return;
    setErr(null);
    setState("connecting");
    setMsgs([]);
    setTimer(180);

    try {
      const { VogentCall } = await import("@vogent/vogent-web-client");

      // Suppress DataChannel console errors
      originalError.current = console.error;
      console.error = (...args: any[]) => {
        if (
          args[0]?.includes?.("DataChannel") ||
          JSON.stringify(args[0])?.includes?.("DataChannel")
        ) {
          return;
        }
        originalError.current?.(...args);
      };

      const res = await fetch(`${BACKEND_URL}/api/clone/dial`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      const { dialToken, sessionId, dialId } = await res.json();

      const c = new VogentCall({ sessionId, dialId, token: dialToken });
      call.current = c;

      await c.start();
      await c.connectAudio();

      unsub.current = c.monitorTranscript((items: TranscriptItem[]) => {
        setMsgs([...items]);

        // Check if user said bye/goodbye to end call
        const lastMsg = items[items.length - 1];
        if (lastMsg && lastMsg.speaker === "HUMAN") {
          const text = lastMsg.text.toLowerCase();
          if (text.includes("bye") || text.includes("goodbye")) {
            setTimeout(() => {
              hangup();
            }, 1000);
          }
        }
      });
      c.on("status", (s: string) => {
        if (s === "connected") setState("connected");
        else if (s === "ended" || s === "error") end(s as CallState);
      });

      // Suppress DataChannel warnings in console
      if (window.console) {
        const originalWarn = console.warn;
        console.warn = (...args: any[]) => {
          if (args[0]?.includes?.("DataChannel")) return;
          originalWarn(...args);
        };
      }
    } catch (e) {
      setErr((e as Error).message);
      setState("error");
    }
  };

  const toggle = async () => {
    if (!call.current) return;
    const next = !paused;
    await call.current.setPaused(next);
    setPaused(next);
  };

  const hangup = async () => {
    unsub.current?.();
    await call.current?.hangup().catch(() => {});
    call.current = null;
    setCallEnded(true);
    end("ended");

    // Restore original console.error
    if (originalError.current) {
      console.error = originalError.current;
    }
  };
  const end = (reason: CallState) => {
    setState(reason);
    setPaused(false);
    unsub.current?.();
    call.current = null;
    if (countDown.current) clearInterval(countDown.current);
  };

  const variant =
    state === "connecting" || state === "connected"
      ? "calling"
      : state === "error"
        ? "error"
        : "idle";
  const label =
    state === "connecting"
      ? "Connecting…"
      : state === "connected"
        ? `Live • ${fmt(timer)}`
        : state === "ended"
          ? "Ended"
          : state === "error"
            ? "Error"
            : "Idle";

  return (
    <div className="animate-fade-up mb-8" style={{ animationDelay: "0.25s" }}>
      <StepHeader
        num="03"
        title="Talk to Your Clone"
        sub="Chat with yourself for 3 minutes"
        status={stepStatus}
      />
      <div className="gradient-border-card rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div
          ref={box}
          className="mb-5 max-h-[360px] min-h-[200px] overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-5"
        >
          {msgs.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center gap-2 text-gray-400">
              <span className="text-3xl opacity-50">💬</span>
              <span className="text-sm">Conversation appears here</span>
            </div>
          ) : (
            msgs.map((item, i) => {
              const isAgent = item.speaker === "AI" || item.speaker === "agent";
              return (
                <div
                  key={i}
                  className="animate-fade-up mb-3.5 flex items-start gap-2.5"
                >
                  <div
                    className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs"
                    style={{
                      background: isAgent ? avatar.agent : avatar.user,
                      color: isAgent ? "white" : "#1f2937",
                    }}
                  >
                    {isAgent ? "🤖" : "👤"}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-500">
                      {isAgent ? "clone" : "you"}
                    </div>
                    <div
                      className={`rounded-2xl border px-4 py-3 text-base leading-snug ${isAgent ? "bg-primary-50 border-primary-200 text-gray-900" : "border-blue-200 bg-blue-50 text-gray-900"}`}
                    >
                      {item.text}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {err && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {err}
          </div>
        )}

        {(state === "idle" || state === "ended" || state === "error") &&
          !callEnded && (
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <StatusPill variant={variant} label={label} />
              </div>
              <button
                className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition-all hover:bg-blue-700"
                onClick={start}
                disabled={!agentId}
              >
                <span>📞</span> Call Clone
              </button>
            </div>
          )}

        {callEnded && (
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <StatusPill variant="idle" label="Call Ended" />
            </div>
          </div>
        )}

        {(state === "connecting" || state === "connected") && (
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1">
              <StatusPill variant={variant} label={label} />
            </div>
            {state === "connecting" && (
              <button
                className="animate-pulse rounded-xl bg-blue-600 px-4 py-2 font-medium text-white shadow-[0_0_15px_rgba(88,124,232,0.6)]"
                disabled
              >
                <span className="border-primary-300 mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-t-white" />
                Connecting…
              </button>
            )}
            {state === "connected" && (
              <>
                <button
                  className={`rounded-xl px-4 py-2 font-medium transition-all ${paused ? "bg-primary-100 text-primary-700 border-primary-300 border" : "border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  onClick={toggle}
                >
                  {paused ? "▶ Resume" : "⏸ Pause"}
                </button>
              </>
            )}
            <button
              className="rounded-lg border border-red-300 bg-red-100 px-3 py-2 text-sm font-medium text-red-700 transition-all hover:bg-red-200"
              onClick={hangup}
            >
              ⏹️ Stop
            </button>
          </div>
        )}

        {!agentId && (
          <p className="mt-3 text-xs text-gray-500">
            ↑ Complete steps 1–2 first
          </p>
        )}
      </div>
    </div>
  );
}
