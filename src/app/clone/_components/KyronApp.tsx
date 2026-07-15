"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { RecordStep } from "./RecordStep";
import { SetupStep } from "./SetupStep";
import { CallStep } from "./CallStep";
import { Toast } from "./Toast";
import type { SetupStep as SetupStepType } from "@/lib/types";
import type { ToastState } from "./Toast";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_CLONE_BACKEND_URL || "https://api.kyronmedical.com";
const bg = "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50";
const card = "bg-white border border-gray-200 rounded-2xl shadow-sm";
const inputClasses =
  "w-full bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-500";

export function KyronApp() {
  const [name, setName] = useState("My Clone");
  const [customPhrase, setCustomPhrase] = useState("");
  const [blob, setBlob] = useState<Blob | null>(null);
  const [step, setStep] = useState<SetupStepType>("idle");
  const [agentId, setAgentId] = useState<string | null>(null);
  const [voiceId, setVoiceId] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "info",
    visible: false,
  });
  const lock = useRef(false);

  const notify = useCallback(
    (msg: string, type: ToastState["type"] = "info") => {
      setToast({ message: msg, type, visible: true });
      setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3500);
    },
    [],
  );

  useEffect(() => {
    if (!blob || lock.current) return;
    setup(blob);
  }, [blob]);

  const setup = async (audioBlob: Blob) => {
    if (lock.current) return;
    lock.current = true;

    setAgentId(null);
    setVoiceId(null);
    setErr(null);

    try {
      setStep("cloning-voice");
      const form = new FormData();
      form.append("audio", audioBlob, "sample.webm");
      form.append("voiceName", name || "My Clone");

      const res = await fetch(`${BACKEND_URL}/api/clone/setup`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

      setStep("creating-agent");
      await new Promise((r) => setTimeout(r, 700));
      setStep("creating-prompt");
      await new Promise((r) => setTimeout(r, 700));

      setVoiceId(data.voiceId);
      setAgentId(data.agentId);
      setStep("ready");
      notify("Your Kyron agent is ready! 🎉", "success");
    } catch (e) {
      const msg = (e as Error).message;
      setErr(msg);
      setStep("error");
      notify(`Setup failed: ${msg}`, "error");
    } finally {
      lock.current = false;
    }
  };

  const retry = () => {
    if (blob) {
      lock.current = false;
      setup(blob);
    }
  };

  const onRecord = (audioBlob: Blob) => {
    setBlob(audioBlob);
    lock.current = false;
    notify("Recording saved — building your Kyron agent…", "info");
  };

  const recordStatus = blob ? "done" : "active";
  const setupStatus =
    step === "ready" ? "done" : step === "idle" ? "pending" : "active";
  const callStatus = agentId ? "active" : "pending";

  return (
    <div className={`relative min-h-screen overflow-x-hidden ${bg}`}>
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="relative z-10 mx-auto max-w-[900px] px-6 pb-20">
        <header className="mb-10 border-b border-gray-200 pb-8 pt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/images/logo/kyron_medical.png"
                alt="Kyron Medical"
                className="h-20 object-contain"
              />
              <div>
                <h1 className="from-primary-700 via-primary-400 to-primary-700 animate-shimmer bg-gradient-to-r bg-[length:200%_auto] bg-clip-text text-3xl font-bold tracking-tight text-slate-950 text-transparent">
                  Kyron
                </h1>
                <p className="mt-0.5 text-sm text-slate-500">
                  AI-powered voice agents modernizing patient access &amp;
                  insurance workflows.
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">
                  Your name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My Clone"
                  className={`${inputClasses} w-48`}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Custom Phrase Input */}
        <div
          className={`${card} gradient-border-card mb-8 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              📖 Custom Phrase (15-20 seconds)
            </label>
            <textarea
              value={customPhrase}
              onChange={(e) => setCustomPhrase(e.target.value)}
              placeholder="Hi, this is a patient access agent from Kyron Medical calling..."
              className={`${inputClasses} min-h-20`}
            />
          </div>
        </div>

        <RecordStep
          onRecorded={onRecord}
          stepStatus={recordStatus}
          customPhrase={customPhrase}
        />
        <div className="step-divider my-8 h-px bg-gray-200" />

        <SetupStep
          setupStep={step}
          agentId={agentId}
          voiceId={voiceId}
          error={err}
          onRetry={retry}
          stepStatus={setupStatus}
          voiceName={name}
        />
        <div className="step-divider my-8 h-px bg-gray-200" />

        <CallStep agentId={agentId} stepStatus={callStatus} />
      </div>

      <Toast toast={toast} />
    </div>
  );
}
