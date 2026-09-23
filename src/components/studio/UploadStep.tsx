"use client";

import { useState, useRef, useCallback } from "react";
import { usageConfig } from "@/config/wedding";

type Props = {
  onComplete: (imageBase64: string, mimeType: string) => void;
};

export function UploadStep({ onComplete }: Props) {
  const [preview, setPreview] = useState<string>("");
  const [fileName, setFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      setError("");

      if (!usageConfig.supportedMimeTypes.includes(file.type)) {
        setError("Please upload a JPG, PNG, or WebP image.");
        return;
      }

      if (file.size > usageConfig.maxUploadSizeBytes) {
        setError("Image is too large. Please use an image under 10MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPreview(dataUrl);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleContinue = useCallback(() => {
    if (!preview) return;
    // Extract base64 from data URL
    const [meta, data] = preview.split(",");
    const mimeMatch = meta.match(/data:(.*?);/);
    const mimeType = mimeMatch?.[1] ?? "image/jpeg";
    onComplete(data, mimeType);
  }, [preview, onComplete]);

  const handleRemove = useCallback(() => {
    setPreview("");
    setFileName("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  return (
    <div className="max-w-lg mx-auto w-full px-4 py-8 flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-display font-semibold text-foreground">
          Upload Your Photo
        </h2>
        <p className="mt-2 text-muted-foreground text-sm">
          For best results, use a clear, well-lit photo with your face visible.
        </p>
      </div>

      {!preview ? (
        <div
          className={`w-full aspect-[3/4] max-h-[400px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Drag & drop your photo here</p>
            <p className="text-xs text-muted-foreground mt-1">or tap to select from gallery</p>
          </div>
          <p className="text-xs text-muted-foreground">JPG, PNG, or WebP · Up to 10MB</p>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-4">
          <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden border border-border shadow-lg">
            <img
              src={preview}
              alt="Your uploaded photo"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-muted-foreground truncate max-w-[200px]">{fileName}</p>
          <div className="flex gap-3">
            <button
              onClick={handleRemove}
              className="px-4 py-2 text-sm text-muted-foreground border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Remove
            </button>
            <button
              onClick={() => inputRef.current?.click()}
              className="px-4 py-2 text-sm text-muted-foreground border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Replace
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleInputChange}
      />

      {error && (
        <p className="text-sm text-danger">{error}</p>
      )}

      {preview && (
        <button
          onClick={handleContinue}
          className="w-full max-w-sm py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity text-base"
        >
          Continue →
        </button>
      )}
    </div>
  );
}
