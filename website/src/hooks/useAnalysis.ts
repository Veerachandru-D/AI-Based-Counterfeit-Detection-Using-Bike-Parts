import { useState, useCallback } from "react";
import { DetectionResult, AnalysisStatus } from "../types";
import { SYSTEM_PROMPT, USER_PROMPT, RESPONSE_SCHEMA } from "../constants";

export function useAnalysis() {
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string>("");

  const analyze = useCallback(async (imageData: string, apiUrl: string, modelName: string) => {
    setStatus("analyzing");
    setError("");
    setResult(null);

    try {
      const base64Data = imageData.split(",")[1];
      const mimeType = imageData.split(";")[0].split(":")[1];

      const response = await fetch(`${apiUrl}/v1/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: modelName,
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: USER_PROMPT,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${mimeType};base64,${base64Data}`,
                  },
                },
              ],
            },
          ],
          response_format: RESPONSE_SCHEMA,
          temperature: 0.3,
          max_tokens: 1024,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error("No response content from model");
      }

      const parsed: DetectionResult = JSON.parse(content);
      setResult(parsed);
      setStatus("done");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setError("");
  }, []);

  return { status, result, error, analyze, reset };
}
