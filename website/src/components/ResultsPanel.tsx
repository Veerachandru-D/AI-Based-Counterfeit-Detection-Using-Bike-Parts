import {
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  Eye,
  Tag,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Award,
  Wrench,
  MessageSquare,
  Layers,
} from "lucide-react";
import { DetectionResult } from "../types";

interface ResultsPanelProps {
  result: DetectionResult;
}

function QualityBadge({ quality }: { quality: string }) {
  if (quality === "HIGH") {
    return (
      <div className="flex items-center gap-3 p-4 sm:p-5 bg-gradient-to-r from-emerald-500/15 to-green-500/10 border border-emerald-500/30 rounded-2xl">
        <div className="p-2.5 bg-emerald-500/20 rounded-xl shrink-0">
          <ShieldCheck className="w-7 h-7 text-emerald-400" />
        </div>
        <div>
          <p className="text-lg font-bold text-emerald-400">Likely Authentic</p>
          <p className="text-sm text-emerald-300/70">Quality indicators appear genuine</p>
        </div>
      </div>
    );
  }
  if (quality === "LOW") {
    return (
      <div className="flex items-center gap-3 p-4 sm:p-5 bg-gradient-to-r from-red-500/15 to-orange-500/10 border border-red-500/30 rounded-2xl">
        <div className="p-2.5 bg-red-500/20 rounded-xl shrink-0">
          <ShieldAlert className="w-7 h-7 text-red-400" />
        </div>
        <div>
          <p className="text-lg font-bold text-red-400">Potential Counterfeit</p>
          <p className="text-sm text-red-300/70">Quality defects detected — exercise caution</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3 p-4 sm:p-5 bg-gradient-to-r from-amber-500/15 to-yellow-500/10 border border-amber-500/30 rounded-2xl">
      <div className="p-2.5 bg-amber-500/20 rounded-xl shrink-0">
        <ShieldQuestion className="w-7 h-7 text-amber-400" />
      </div>
      <div>
        <p className="text-lg font-bold text-amber-400">Uncertain</p>
        <p className="text-sm text-amber-300/70">Insufficient data for conclusive assessment</p>
      </div>
    </div>
  );
}

function ConfidenceBar({ confidence }: { confidence: number }) {
  const pct = Math.round(confidence * 100);
  const color =
    pct >= 70 ? "from-emerald-500 to-cyan-500" : pct >= 40 ? "from-amber-500 to-yellow-500" : "from-red-500 to-orange-500";
  const textColor =
    pct >= 70 ? "text-emerald-400" : pct >= 40 ? "text-amber-400" : "text-red-400";

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-300">Confidence</span>
        <span className={`text-sm font-bold ${textColor}`}>{pct}%</span>
      </div>
      <div className="h-2.5 bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  color = "text-slate-300",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`w-4 h-4 ${color}`} />
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</span>
      </div>
      <p className={`text-sm font-semibold ${color}`}>{value}</p>
    </div>
  );
}

function TagList({
  items,
  color = "emerald",
  emptyText = "None",
  icon: Icon,
}: {
  items: string[];
  color?: "emerald" | "red" | "amber" | "slate" | "cyan";
  emptyText?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  const colors = {
    emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    red: "bg-red-500/15 text-red-300 border-red-500/20",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    slate: "bg-slate-700/40 text-slate-400 border-slate-600/30",
    cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
  };

  if (items.length === 0) {
    return <span className="text-sm text-slate-500 italic">{emptyText}</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, idx) => (
        <span
          key={idx}
          className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border ${colors[color]}`}
        >
          {Icon && <Icon className="w-3 h-3" />}
          {item}
        </span>
      ))}
    </div>
  );
}

function formatPartType(type: string): string {
  return type
    .split("_")
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(" ");
}

function formatViewType(type: string): string {
  return type
    .split("_")
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(" ");
}

export function ResultsPanel({ result }: ResultsPanelProps) {
  return (
    <div className="space-y-5">
      {/* Quality Badge */}
      <QualityBadge quality={result.visual_quality} />

      {/* Confidence */}
      <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-4">
        <ConfidenceBar confidence={result.confidence} />
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <InfoCard
          icon={Wrench}
          label="Part Type"
          value={formatPartType(result.part_type)}
          color="text-cyan-300"
        />
        <InfoCard
          icon={Eye}
          label="View Type"
          value={formatViewType(result.view_type)}
          color="text-purple-300"
        />
        <InfoCard
          icon={Tag}
          label="Brand"
          value={result.brand_detected || "Not Detected"}
          color={result.brand_detected ? "text-emerald-300" : "text-slate-500"}
        />
      </div>

      {/* Indicators */}
      <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          Indicators
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-900/40 rounded-lg p-3">
            <p className="text-xs text-slate-500 mb-1">Visible Quality</p>
            <p
              className={`text-sm font-bold ${
                result.indicators.primary_visible_quality === "HIGH"
                  ? "text-emerald-400"
                  : result.indicators.primary_visible_quality === "LOW"
                  ? "text-red-400"
                  : "text-amber-400"
              }`}
            >
              {result.indicators.primary_visible_quality}
            </p>
          </div>
          <div className="bg-slate-900/40 rounded-lg p-3">
            <p className="text-xs text-slate-500 mb-1">Branding</p>
            <p
              className={`text-sm font-bold ${
                result.indicators.branding === "PROFESSIONAL"
                  ? "text-emerald-400"
                  : result.indicators.branding === "SUSPICIOUS"
                  ? "text-red-400"
                  : "text-slate-400"
              }`}
            >
              {result.indicators.branding}
            </p>
          </div>
          <div className="bg-slate-900/40 rounded-lg p-3">
            <p className="text-xs text-slate-500 mb-1">Certifications</p>
            {result.indicators.certifications_found.length > 0 ? (
              <TagList items={result.indicators.certifications_found} color="cyan" icon={Award} />
            ) : (
              <p className="text-sm text-slate-500 italic">None found</p>
            )}
          </div>
        </div>
      </div>

      {/* Assessed Features */}
      <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Assessed Features
        </h3>
        <TagList items={result.assessed_features} color="emerald" icon={CheckCircle2} />
      </div>

      {/* Not in Frame */}
      {result.not_in_frame.length > 0 && (
        <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Eye className="w-4 h-4 text-slate-400" />
            Not in Frame
            <span className="text-xs text-slate-500 font-normal">(not penalized)</span>
          </h3>
          <TagList items={result.not_in_frame} color="slate" />
        </div>
      )}

      {/* Visible Defects */}
      <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          {result.visible_defects.length > 0 ? (
            <AlertTriangle className="w-4 h-4 text-red-400" />
          ) : (
            <XCircle className="w-4 h-4 text-slate-400" />
          )}
          Visible Defects
        </h3>
        {result.visible_defects.length > 0 ? (
          <TagList items={result.visible_defects} color="red" icon={AlertTriangle} />
        ) : (
          <div className="flex items-center gap-2 text-sm text-emerald-400/80">
            <CheckCircle2 className="w-4 h-4" />
            No visible defects detected
          </div>
        )}
      </div>

      {/* Reasoning */}
      <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-purple-400" />
          Analysis Reasoning
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">{result.reasoning}</p>
      </div>
    </div>
  );
}
