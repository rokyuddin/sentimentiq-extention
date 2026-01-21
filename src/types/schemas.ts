import { z } from "zod";

export const ProductMetadataSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    brand: z.string().optional(),
    category: z.string().optional(),
    url: z.string().url().optional(),
});

export const SentimentResultSchema = z.object({
    score: z.number().min(0).max(100),
    label: z.enum(["low", "medium", "high"]),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    warnings: z.array(z.string()),
    platforms: z.array(z.string()).default(["Reddit"]),
});

export type ProductMetadata = z.infer<typeof ProductMetadataSchema>;
export type SentimentResult = z.infer<typeof SentimentResultSchema>;
