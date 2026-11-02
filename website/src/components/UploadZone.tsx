import { useState, useRef } from "react";
import { Upload, ImagePlus, Clipboard, X, Camera } from "lucide-react";

interface UploadZoneProps {
  imageData: string | null;
  fileName: string;
  onDrop: (e: React.DragEvent) => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export function UploadZone({
  imageData,
  fileName,
  onDrop,
  onFileInput,
  onClear,
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    setIsDragging(false);
    onDrop(e);
  };

  if (imageData) {
    return (
      <div className="relative group">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="relative">
            <img
              src={imageData}
              alt="Uploaded part"
              className="w-full max-h-[400px] object-contain bg-slate-900/50"
            />
            <button
              onClick={onClear}
              className="absolute top-3 right-3 p-2 bg-red-500/90 hover:bg-red-600 text-white rounded-xl shadow-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="px-4 py-3 bg-slate-800/80 border-t border-slate-700/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-slate-300 truncate max-w-[200px] sm:max-w-[300px]">
                {fileName}
              </span>
            </div>
            <button
              onClick={onClear}
              className="text-xs text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 cursor-pointer ${
        isDragging
          ? "border-emerald-400 bg-emerald-500/10 scale-[1.02]"
          : "border-slate-600 hover:border-slate-500 hover:bg-slate-800/30 bg-slate-800/10"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileInput}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-4">
        <div
          className={`p-4 rounded-2xl transition-all duration-300 ${
            isDragging
              ? "bg-emerald-500/20 scale-110"
              : "bg-slate-700/40"
          }`}
        >
          {isDragging ? (
            <ImagePlus className="w-10 h-10 text-emerald-400" />
          ) : (
            <Upload className="w-10 h-10 text-slate-400" />
          )}
        </div>

        <div className="space-y-2">
          <p className="text-base sm:text-lg font-medium text-slate-200">
            {isDragging ? "Drop your image here" : "Upload a bike part image"}
          </p>
          <p className="text-sm text-slate-400">
            Drag & drop, click to browse, or paste from clipboard
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/50 rounded-lg text-xs text-slate-400 border border-slate-600/30">
            <Upload className="w-3 h-3" /> Drag & Drop
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/50 rounded-lg text-xs text-slate-400 border border-slate-600/30">
            <ImagePlus className="w-3 h-3" /> Browse Files
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/50 rounded-lg text-xs text-slate-400 border border-slate-600/30">
            <Clipboard className="w-3 h-3" /> Ctrl+V Paste
          </span>
        </div>

        <p className="text-xs text-slate-500 mt-1">
          Supports PNG, JPG, WEBP
        </p>
      </div>
    </div>
  );
}
