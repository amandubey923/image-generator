"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  openAiImageModels,
  type OpenAiImageModel,
} from "@/lib/openai-image-models";
import { stylePresets } from "@/lib/style-presets";
import type { GenerationHistorySummaryItem, GenerationQuotaSnapshot } from "@/lib/types";

type StudioWorkbenchContextValue = {
  error: string | null;
  file: File | null;
  history: GenerationHistorySummaryItem[];
  inputId: string;
  isGenerateDisabled: boolean;
  isLoading: boolean;
  quota: GenerationQuotaSnapshot;
  replaceFile: (nextFile: File | null) => void;
  resultPreview: string | null;
  selectedModel: OpenAiImageModel;
  selectedPreset: (typeof stylePresets)[number];
  selectedStyle: string;
  selectModel: (model: OpenAiImageModel) => void;
  selectStyle: (slug: string) => void;
  sourcePreview: string | null;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  viewedHistoryItem: GenerationHistorySummaryItem | null;
  openHistoryPreview: (item: GenerationHistorySummaryItem) => void;
  closeHistoryPreview: () => void;
};

const StudioWorkbenchContext = createContext<StudioWorkbenchContextValue | null>(null);

export function StudioWorkbenchProvider({
  children,
  initialHistory,
  initialQuota,
}: {
  children: ReactNode;
  clerkUserId: string;
  initialHistory: GenerationHistorySummaryItem[];
  initialQuota: GenerationQuotaSnapshot;
}) {
  const inputId = useId();
  const [history, setHistory] = useState(initialHistory);
  const [quota, setQuota] = useState(initialQuota);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<OpenAiImageModel>(openAiImageModels[0]);
  const [selectedStyle, setSelectedStyle] = useState(stylePresets[0]?.slug ?? "");
  const [resultPreview, setResultPreview] = useState<string | null>(null);
  const [sourcePreview, setSourcePreview] = useState<string | null>(null);
  const [viewedHistoryItem, setViewedHistoryItem] = useState<GenerationHistorySummaryItem | null>(null);
  const sourcePreviewRef = useRef<string | null>(null);

  const selectedPreset =
    stylePresets.find((preset) => preset.slug === selectedStyle) ?? stylePresets[0];

  const replaceFile = useCallback((nextFile: File | null) => {
    if (sourcePreviewRef.current) {
      URL.revokeObjectURL(sourcePreviewRef.current);
      sourcePreviewRef.current = null;
    }

    setFile(nextFile);
    setError(null);

    if (!nextFile) {
      setSourcePreview(null);
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(nextFile);
    sourcePreviewRef.current = nextPreviewUrl;
    setSourcePreview(nextPreviewUrl);
  }, []);

  useEffect(() => {
    return () => {
      if (sourcePreviewRef.current) {
        URL.revokeObjectURL(sourcePreviewRef.current);
      }
    };
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!file) {
        setError("Please upload an image first.");
        return;
      }

      if (quota.remaining <= 0) {
        setError("You have reached your monthly generation limit.");
        return;
      }

      setError(null);
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 700));

      const resultImageUrl = sourcePreview ?? selectedPreset.thumbnailPath;
      const nextItem: GenerationHistorySummaryItem = {
        id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()),
        createdAt: new Date().toISOString(),
        model: selectedModel,
        originalFileName: file.name,
        resultImageUrl,
        styleLabel: selectedPreset.label,
        styleSlug: selectedPreset.slug,
      };

      setResultPreview(resultImageUrl);
      setHistory((prev) => [nextItem, ...prev]);
      setQuota((prev) => {
        const used = Math.min(prev.limit, prev.used + 1);
        return {
          ...prev,
          used,
          remaining: Math.max(0, prev.limit - used),
        };
      });
      setIsLoading(false);
    },
    [file, quota.remaining, selectedModel, selectedPreset, sourcePreview],
  );

  const value = useMemo<StudioWorkbenchContextValue>(
    () => ({
      closeHistoryPreview: () => setViewedHistoryItem(null),
      error,
      file,
      handleSubmit,
      history,
      inputId,
      isGenerateDisabled: !file || isLoading || quota.remaining <= 0,
      isLoading,
      openHistoryPreview: (item) => setViewedHistoryItem(item),
      quota,
      replaceFile,
      resultPreview,
      selectedModel,
      selectedPreset,
      selectedStyle,
      selectModel: setSelectedModel,
      selectStyle: setSelectedStyle,
      sourcePreview,
      viewedHistoryItem,
    }),
    [
      error,
      file,
      handleSubmit,
      history,
      inputId,
      isLoading,
      quota,
      replaceFile,
      resultPreview,
      selectedModel,
      selectedPreset,
      selectedStyle,
      sourcePreview,
      viewedHistoryItem,
    ],
  );

  return <StudioWorkbenchContext.Provider value={value}>{children}</StudioWorkbenchContext.Provider>;
}

export function useStudioWorkbench() {
  const contextValue = useContext(StudioWorkbenchContext);

  if (!contextValue) {
    throw new Error("useStudioWorkbench must be used within StudioWorkbenchProvider");
  }

  return contextValue;
}
