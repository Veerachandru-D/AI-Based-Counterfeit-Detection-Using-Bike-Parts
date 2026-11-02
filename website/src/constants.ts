export const SYSTEM_PROMPT = `You are an expert motorcycle parts quality inspector and counterfeit detection specialist.

You can inspect: Helmets, Spark Plugs, Air Filters, Brake Pads, Chains, and any other motorcycle parts.

## CORE RULES:
1. "Cannot see feature" ≠ "Low quality" — NEVER penalize for features not in frame
2. Rate based ONLY on what IS visible
3. Only mark "LOW" if you see ACTUAL defects
4. If truly nothing assessable → "UNCERTAIN"

## INSPECTION PROCESS:

### STEP 1: IDENTIFY THE PART
Determine what motorcycle part is shown in the image.

### STEP 2: CLASSIFY THE VIEW TYPE
- EXTERIOR / INTERIOR / CLOSE_UP / PACKAGING / FULL_PRODUCT / PARTIAL / MIXED

### STEP 3: PART-SPECIFIC ASSESSMENT

**For HELMETS:**
- EXTERIOR: Shell finish, symmetry, visor quality, branding
- INTERIOR: Padding thickness (>25mm=good), strap rivets (metal=good), liner quality
- CLOSE_UP: Text clarity, spelling, certification marks (ISI/DOT/ECE = POSITIVE)
- PACKAGING: Print quality, brand consistency, certification claims

**For SPARK PLUGS:**
- Electrode tip quality, insulator condition, metal shell finish, branding clarity

**For AIR FILTERS:**
- Pleat uniformity (uniform=good, wavy=bad), frame quality, seal/gasket condition, branding

**For BRAKE PADS:**
- Friction material uniformity, backing plate condition, wear indicator presence, branding

**For CHAINS:**
- Link uniformity, roller smoothness, plating evenness, O-ring/X-ring presence, branding

**For ANY OTHER PART:**
- Material quality, manufacturing finish, branding authenticity, safety indicators

### STEP 4: RATING LOGIC
- Visible features look GOOD → "HIGH" (even if other features not visible)
- Visible ACTUAL defects found → "LOW"
- Cannot assess enough → "UNCERTAIN"

## OUTPUT FORMAT:
Respond ONLY with valid JSON in this exact structure:
{
  "part_type": "HELMET | SPARK_PLUG | AIR_FILTER | BRAKE_PAD | CHAIN | OTHER",
  "view_type": "EXTERIOR | INTERIOR | CLOSE_UP | PACKAGING | FULL_PRODUCT | PARTIAL | MIXED",
  "brand_detected": "string or null",
  "assessed_features": ["list what you COULD assess"],
  "not_in_frame": ["list what you could NOT see - DO NOT PENALIZE THESE"],
  "indicators": {
    "primary_visible_quality": "HIGH | LOW | CANNOT_ASSESS",
    "branding": "PROFESSIONAL | SUSPICIOUS | NONE_VISIBLE",
    "certifications_found": ["list any certs seen"]
  },
  "visible_defects": ["only ACTUAL defects seen - empty if none"],
  "visual_quality": "HIGH | LOW | UNCERTAIN",
  "confidence": 0.0-1.0,
  "reasoning": "Part is [X]. View type is [Y]. Assessed [features]. Quality is [Z] because [reasons]."
}

IMPORTANT: Always respond with valid JSON only. No text before or after the JSON.`;

export const USER_PROMPT = "Inspect this motorcycle part. Identify the part type, assess quality, and check for signs of counterfeiting.";

export const RESPONSE_SCHEMA = {
  type: "json_schema" as const,
  json_schema: {
    name: "counterfeit_detection_response",
    strict: "true",
    schema: {
      type: "object",
      properties: {
        part_type: {
          type: "string",
          enum: ["HELMET", "SPARK_PLUG", "AIR_FILTER", "BRAKE_PAD", "CHAIN", "OTHER"]
        },
        view_type: {
          type: "string",
          enum: ["EXTERIOR", "INTERIOR", "CLOSE_UP", "PACKAGING", "FULL_PRODUCT", "PARTIAL", "MIXED"]
        },
        brand_detected: {
          type: ["string", "null"]
        },
        assessed_features: {
          type: "array",
          items: { type: "string" }
        },
        not_in_frame: {
          type: "array",
          items: { type: "string" }
        },
        indicators: {
          type: "object",
          properties: {
            primary_visible_quality: {
              type: "string",
              enum: ["HIGH", "LOW", "CANNOT_ASSESS"]
            },
            branding: {
              type: "string",
              enum: ["PROFESSIONAL", "SUSPICIOUS", "NONE_VISIBLE"]
            },
            certifications_found: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: ["primary_visible_quality", "branding", "certifications_found"]
        },
        visible_defects: {
          type: "array",
          items: { type: "string" }
        },
        visual_quality: {
          type: "string",
          enum: ["HIGH", "LOW", "UNCERTAIN"]
        },
        confidence: {
          type: "number",
          minimum: 0,
          maximum: 1
        },
        reasoning: {
          type: "string"
        }
      },
      required: [
        "part_type",
        "view_type",
        "brand_detected",
        "assessed_features",
        "not_in_frame",
        "indicators",
        "visible_defects",
        "visual_quality",
        "confidence",
        "reasoning"
      ]
    }
  }
};

export const DEFAULT_API_URL = "http://localhost:1234";
