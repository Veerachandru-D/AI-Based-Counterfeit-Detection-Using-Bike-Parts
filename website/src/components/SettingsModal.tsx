import { X, Server, Cpu } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiUrl: string;
  onApiUrlChange: (url: string) => void;
  modelName: string;
  onModelNameChange: (name: string) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  apiUrl,
  onApiUrlChange,
  modelName,
  onModelNameChange,
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between p-5 border-b border-slate-700/60">
          <h2 className="text-lg font-semibold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
              <Server className="w-4 h-4 text-emerald-400" />
              LM Studio API URL
            </label>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => onApiUrlChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all"
              placeholder="http://localhost:1234"
            />
            <p className="text-xs text-slate-500 mt-1.5">
              The URL where LM Studio server is running
            </p>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Model Name
            </label>
            <input
              type="text"
              value={modelName}
              onChange={(e) => onModelNameChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              placeholder="model-name"
            />
            <p className="text-xs text-slate-500 mt-1.5">
              The model identifier loaded in LM Studio (use any loaded model name)
            </p>
          </div>
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="text-emerald-400 font-medium">Tip:</span> Make sure LM Studio is running with a vision-capable model loaded. Start the server from the Developer tab or run{" "}
              <code className="bg-slate-700 px-1.5 py-0.5 rounded text-emerald-300 text-[11px]">
                lms server start
              </code>{" "}
              in your terminal.
            </p>
          </div>
        </div>
        <div className="p-5 border-t border-slate-700/60">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
