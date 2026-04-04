export type GenerationQuotaSnapshot = {
  limit: number;
  used: number;
  remaining: number;
};

export type GenerationHistorySummaryItem = {
  id: string;
  resultImageUrl: string;
  styleLabel: string;
  styleSlug: string;
  model: string;
  createdAt: string;
  originalFileName: string | null;
};

export type StudioWorkbenchProps = {
  clerkUserId: string;
  initialHistory: GenerationHistorySummaryItem[];
  initialQuota: GenerationQuotaSnapshot;
};
