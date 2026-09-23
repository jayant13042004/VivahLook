"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { Gender } from "@/config/wedding";
import { UploadStep } from "@/components/studio/UploadStep";
import { OccasionStep } from "@/components/studio/OccasionStep";
import { OutfitStep } from "@/components/studio/OutfitStep";
import { StyleStep } from "@/components/studio/StyleStep";
import { GenerationLoader } from "@/components/studio/GenerationLoader";
import { ResultViewer } from "@/components/studio/ResultViewer";
import { incrementUsage, hasReachedLimit, getRemainingLooks, resetUsage } from "@/lib/usage";

type StudioStep = "upload" | "occasion" | "outfit" | "style" | "generating" | "result";

type StudioState = {
  imageBase64: string;
  mimeType: string;
  gender: Gender;
  occasionId: string;
  outfitId: string;
  styleId: string;
  resultImageBase64: string;
};

const STEP_ORDER: StudioStep[] = ["upload", "occasion", "outfit", "style", "generating", "result"];

export function StudioWizard() {
  const [step, setStep] = useState<StudioStep>("upload");
  const [state, setState] = useState<StudioState>({
    imageBase64: "",
    mimeType: "",
    gender: "women",
    occasionId: "",
    outfitId: "",
    styleId: "",
    resultImageBase64: "",
  });
  const [error, setError] = useState<string>("");

  const currentStepIndex = STEP_ORDER.indexOf(step);
  const progress = Math.min(((currentStepIndex + 1) / STEP_ORDER.length) * 100, 100);

  const goBack = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx > 0 && step !== "generating" && step !== "result") {
      setStep(STEP_ORDER[idx - 1]);
      setError("");
    }
  }, [step]);

  const handleResetUsage = useCallback(() => {
    resetUsage();
    setError("");
  }, []);

  const handleUploadComplete = useCallback((imageBase64: string, mimeType: string) => {
    setState((s) => ({ ...s, imageBase64, mimeType }));
    setStep("occasion");
    setError("");
  }, []);

  const handleOccasionSelect = useCallback((occasionId: string) => {
    setState((s) => ({ ...s, occasionId }));
    setStep("outfit");
    setError("");
  }, []);

  const handleOutfitSelect = useCallback((outfitId: string, gender: Gender) => {
    setState((s) => ({ ...s, outfitId, gender }));
    setStep("style");
    setError("");
  }, []);

  const handleStyleSelect = useCallback(async (styleId: string) => {
    if (hasReachedLimit()) {
      setError("You've reached the free trial limit. Upgrade to a look pack to continue, or reset your trial below.");
      return;
    }

    setState((s) => ({ ...s, styleId }));
    setStep("generating");
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 5 min timeout — waterfall can try up to 5 models × 90s each
        signal: AbortSignal.timeout(300_000),
        body: JSON.stringify({
          imageBase64: state.imageBase64,
          mimeType: state.mimeType,
          gender: state.gender,
          occasionId: state.occasionId,
          outfitId: state.outfitId,
          styleId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error ?? "We couldn't create your look. Please try again.");
        setStep("style");
        return;
      }

      incrementUsage();
      setState((s) => ({ ...s, styleId, resultImageBase64: data.imageBase64 ?? "" }));
      setStep("result");
    } catch (err) {
      const msg = err instanceof Error && err.name === "TimeoutError"
        ? "Generation timed out — all AI models were busy. Please try again."
        : "Something went wrong with the connection. Please try again.";
      setError(msg);
      setStep("style");
    }
  }, [state.imageBase64, state.mimeType, state.gender, state.occasionId, state.outfitId]);

  const handleTryAnother = useCallback(() => {
    setState((s) => ({ ...s, occasionId: "", outfitId: "", styleId: "", resultImageBase64: "" }));
    setStep("occasion");
    setError("");
  }, []);

  const handleStartNew = useCallback(() => {
    setState({
      imageBase64: "",
      mimeType: "",
      gender: "women",
      occasionId: "",
      outfitId: "",
      styleId: "",
      resultImageBase64: "",
    });
    setStep("upload");
    setError("");
  }, []);

  const remaining = getRemainingLooks();

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Progress bar */}
      {step !== "result" && (
        <div className="w-full bg-muted/50 h-1">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Step header */}
      {step !== "generating" && step !== "result" && (
        <div className="max-w-2xl mx-auto w-full px-4 pt-6 pb-2 flex items-center justify-between">
          <div>
            {currentStepIndex > 0 && (
              <button
                onClick={goBack}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {remaining} {remaining === 1 ? "look" : "looks"} available
            </span>
            <button
              onClick={handleResetUsage}
              className="text-[11px] text-muted-foreground/70 hover:text-primary transition-colors underline"
              title="Reset looks for testing"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Error display with direct Reset button */}
      {error && step !== "generating" && (
        <div className="max-w-2xl mx-auto w-full px-4 pb-4">
          <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span>{error}</span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleResetUsage}
                className="px-3 py-1 bg-surface border border-border text-foreground hover:bg-muted text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                Reset Trial Looks
              </button>
              <Link
                href="/billing"
                className="px-3 py-1 bg-primary text-primary-foreground hover:opacity-90 text-xs font-semibold rounded-lg transition-opacity shadow-sm"
              >
                View Packs (₹99)
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Step content */}
      <div className="flex-1 flex flex-col">
        {step === "upload" && <UploadStep onComplete={handleUploadComplete} />}
        {step === "occasion" && <OccasionStep onSelect={handleOccasionSelect} />}
        {step === "outfit" && <OutfitStep onSelect={handleOutfitSelect} />}
        {step === "style" && <StyleStep onSelect={handleStyleSelect} />}
        {step === "generating" && <GenerationLoader />}
        {step === "result" && (
          <ResultViewer
            originalImageBase64={state.imageBase64}
            resultImageBase64={state.resultImageBase64}
            occasionId={state.occasionId}
            outfitId={state.outfitId}
            styleId={state.styleId}
            onTryAnother={handleTryAnother}
            onStartNew={handleStartNew}
          />
        )}
      </div>
    </div>
  );
}
