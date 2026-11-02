import { useState } from "react";
import { Scan, RotateCcw, Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { Header } from "./components/Header";
import { SettingsModal } from "./components/SettingsModal";
import { UploadZone } from "./components/UploadZone";
import { ResultsPanel } from "./components/ResultsPanel";
import { useImageUpload } from "./hooks/useImageUpload";
import { useAnalysis } from "./hooks/useAnalysis";
import { DEFAULT_API_URL } from "./constants";

export function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);
  const [modelName, setModelName] = useState("");

  const { imageData, fileName, handleDrop, handleFileInput, clearImage } = useImageUpload();
  const { status, result, error, analyze, reset } = useAnalysis();

  const handleAnalyze = () => {
    if (!imageData) return;
    analyze(imageData, apiUrl, modelName);
  };

  const handleReset = () => {
    clearImage();
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Header onSettingsClick={() => setSettingsOpen(true)} />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        apiUrl={apiUrl}
        onApiUrlChange={setApiUrl}
        modelName={modelName}
        onModelNameChange={setModelName}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Steps Indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
          <StepBadge
            step={1}
            label="Upload"
            active={!imageData && status === "idle"}
            completed={!!imageData}
          />
          <StepLine completed={!!imageData} />
          <StepBadge
            step={2}
            label="Analyze"
            active={!!imageData && status !== "done" && status !== "error"}
            completed={status === "done"}
          />
          <StepLine completed={status === "done"} />
          <StepBadge
            step={3}
            label="Results"
            active={status === "done"}
            completed={false}
          />
        </div>

        {/* Upload Section */}
        <div className="mb-6">
          <UploadZone
            imageData={imageData}
            fileName={fileName}
            onDrop={handleDrop}
            onFileInput={handleFileInput}
            onClear={() => {
              clearImage();
              reset();
            }}
          />
        </div>

        {/* Action Buttons */}
        {imageData && status !== "done" && (
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={handleAnalyze}
              disabled={status === "analyzing"}
              className="flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20 disabled:shadow-none transition-all duration-200 cursor-pointer"
            >
              {status === "analyzing" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Scan className="w-5 h-5" />
                  Analyze Part
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              disabled={status === "analyzing"}
              className="flex items-center justify-center gap-2 py-3.5 px-6 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-300 font-medium rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        )}

        {/* Analyzing Animation */}
        {status === "analyzing" && (
          <div className="mb-6">
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 text-center">
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="absolute w-16 h-16 rounded-full border-2 border-emerald-500/20 animate-ping" />
                <div className="absolute w-20 h-20 rounded-full border border-cyan-500/10 animate-pulse" />
                <div className="p-4 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full">
                  <ShieldCheck className="w-8 h-8 text-emerald-400 animate-pulse" />
                </div>
              </div>
              <p className="text-lg font-medium text-slate-200 mb-2">Inspecting Part...</p>
              <p className="text-sm text-slate-400">
                AI is analyzing the image for quality and authenticity
              </p>
              <div className="mt-4 flex justify-center gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    style={{
                      animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="mb-6">
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-red-400 mb-1">Analysis Failed</p>
                  <p className="text-sm text-red-300/80 break-words">{error}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={handleAnalyze}
                      className="px-4 py-2 text-xs font-medium bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors cursor-pointer"
                    >
                      Retry
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 text-xs font-medium bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {status === "done" && result && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Inspection Results
              </h2>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                New Inspection
              </button>
            </div>
            <ResultsPanel result={result} />
          </div>
        )}

        {/* Empty State Info */}
        {!imageData && status === "idle" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <InfoTile
              icon="🪖"
              title="Helmets"
              desc="Shell finish, certifications, padding quality"
            />
            <InfoTile
              icon="🔧"
              title="Engine Parts"
              desc="Spark plugs, air filters, chains"
            />
            <InfoTile
              icon="🛑"
              title="Brake Parts"
              desc="Brake pads, friction material, wear indicators"
            />
          </div>
        )}
      </main>

      {/* Inline keyframes */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function StepBadge({
  step,
  label,
  active,
  completed,
}: {
  step: number;
  label: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
          completed
            ? "bg-emerald-500 text-white"
            : active
            ? "bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30"
            : "bg-slate-800 text-slate-500 border border-slate-700"
        }`}
      >
        {completed ? "✓" : step}
      </div>
      <span
        className={`text-sm font-medium hidden sm:inline ${
          active ? "text-white" : completed ? "text-emerald-400" : "text-slate-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function StepLine({ completed }: { completed: boolean }) {
  return (
    <div
      className={`w-8 sm:w-16 h-0.5 rounded-full transition-all duration-500 ${
        completed ? "bg-emerald-500" : "bg-slate-700"
      }`}
    />
  );
}

function InfoTile({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-5 text-center hover:bg-slate-800/50 transition-colors">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-sm font-semibold text-slate-200 mb-1">{title}</h3>
      <p className="text-xs text-slate-400">{desc}</p>
    </div>
  );
}
