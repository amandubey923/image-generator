export const openAiImageModels = ["gpt-image-1"] as const;

export type OpenAiImageModel = (typeof openAiImageModels)[number];

export const openAiImageModelLabels: Record<OpenAiImageModel, string> = {
  "gpt-image-1": "GPT Image 1 (Image Edits)",
};
