import { SentimentResultSchema, type SentimentResult, type ProductMetadata } from "../types/schemas";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Gets or creates a persistent user session ID for anonymous tracking.
 */
export async function getSessionId(): Promise<string> {
  const data = await chrome.storage.local.get("userSessionId");
  if (data.userSessionId) {
    return String(data.userSessionId);
  }

  const newId = `anon_${crypto.randomUUID()}`;
  await chrome.storage.local.set({ userSessionId: newId });
  return newId;
}

export interface AnalyzeParams {
  product: ProductMetadata;
  token?: string;
}

/**
 * Calls the backend to analyze a product.
 */
export async function analyzeProduct({ product, token }: AnalyzeParams): Promise<SentimentResult> {
  const sessionId = await getSessionId();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BACKEND_URL}/api/analyze`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      product,
      userSessionId: sessionId,
    }),
  });

  if (!response.ok) {
    const errorRes= await response.json();
    if (response.status === 402) {
      throw new Error(errorRes.error || "Quota exceeded. Please upgrade to Pro.");
    }
    if (response.status === 429) {
      throw new Error(errorRes.error || "Rate limit exceeded. Please try again later.");
    }
    throw new Error(errorRes.error || `API error: ${response.status}`);
  }

  const result = await response.json();
  console.log(result.data)
  const parsed = SentimentResultSchema.safeParse(result.data);
  
  if (!parsed.success) {
    console.error("Failed to parse API response:", parsed.error);
    throw new Error("Invalid response format from server");
  }

  return parsed.data;
}

/**
 * Initiates the subscription checkout process.
 */
export async function initiateCheckout(token: string): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/api/subscription/checkout`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Checkout error: ${response.status}`);
  }

  const { url } = await response.json();
  if (url) {
    window.location.href = url;
  }
}
