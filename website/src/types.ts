export interface DetectionResult {
  part_type: string;
  view_type: string;
  brand_detected: string | null;
  assessed_features: string[];
  not_in_frame: string[];
  indicators: {
    primary_visible_quality: string;
    branding: string;
    certifications_found: string[];
  };
  visible_defects: string[];
  visual_quality: "HIGH" | "LOW" | "UNCERTAIN";
  confidence: number;
  reasoning: string;
}

export type AnalysisStatus = "idle" | "uploading" | "analyzing" | "done" | "error";
