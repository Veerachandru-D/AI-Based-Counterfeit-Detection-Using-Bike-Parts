import { ShieldCheck, Settings } from "lucide-react";

interface HeaderProps {
  onSettingsClick: () => void;
}

export function Header({ onSettingsClick }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-emerald-400 to-cyan-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Bike Parts Counterfeit Detection
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              AI-Powered Quality Inspection & Authentication
            </p>
          </div>
        </div>
        <button
          onClick={onSettingsClick}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-all duration-200 cursor-pointer"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
