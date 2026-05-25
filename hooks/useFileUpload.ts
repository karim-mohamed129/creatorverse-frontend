import { useRef, useState, useCallback } from "react";

export type UploadedFile = {
  file: File;
  previewUrl: string;
  name: string;
  size: string;
};

type UseFileUploadOptions = {
  accept?: string;       // e.g. "image/png,image/jpeg,image/webp"
  maxMB?: number;        // default 2
  onError?: (msg: string) => void;
};

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const { accept = "image/png,image/jpeg,image/jpg,image/webp", maxMB = 2 } = options;
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploaded, setUploadedState] = useState<UploadedFile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const open = useCallback(() => {
    setError(null);
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const maxBytes = maxMB * 1024 * 1024;
      if (file.size > maxBytes) {
        const msg = `File too large. Maximum size is ${maxMB}MB.`;
        setError(msg);
        options.onError?.(msg);
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);

      setUploadedState({ file, previewUrl, name: file.name, size: `${sizeMB} MB` });
      setError(null);

      e.target.value = "";
    },
    [maxMB, options]
  );

  const setUploaded = useCallback((fileData: UploadedFile | null) => {
    setUploadedState(fileData);
  }, []);

  const clear = useCallback(() => {
    if (uploaded?.previewUrl) URL.revokeObjectURL(uploaded.previewUrl);
    setUploadedState(null);
    setError(null);
  }, [uploaded]);

  const inputProps = {
    ref: inputRef,
    type: "file" as const,
    accept,
    style: { display: "none" } as React.CSSProperties,
    onChange: handleChange,
  };

  return { open, clear, setUploaded, uploaded, error, inputProps };
}