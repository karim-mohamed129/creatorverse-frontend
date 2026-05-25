import { useRef, useState, useCallback } from "react";

export type UploadedFile = {
  id?: string | number; // For existing images
  file?: File;
  previewUrl: string;
  name: string;
  size: string;
};

type UseMultiFileUploadOptions = {
  accept?: string;
  maxMB?: number;
  onError?: (msg: string) => void;
};

export function useMultiFileUpload(options: UseMultiFileUploadOptions = {}) {
  const { accept = "image/png,image/jpeg,image/jpg,image/webp", maxMB = 2 } = options;
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploaded, setUploadedState] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const open = useCallback(() => {
    setError(null);
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      const newFiles: UploadedFile[] = [];
      const maxBytes = maxMB * 1024 * 1024;

      for (const file of files) {
        if (file.size > maxBytes) {
          const msg = `File ${file.name} is too large. Maximum size is ${maxMB}MB.`;
          setError(msg);
          options.onError?.(msg);
          continue;
        }

        const previewUrl = URL.createObjectURL(file);
        const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
        newFiles.push({ file, previewUrl, name: file.name, size: `${sizeMB} MB` });
      }

      setUploadedState((prev) => [...prev, ...newFiles]);
      e.target.value = "";
    },
    [maxMB, options]
  );

  const setUploaded = useCallback((fileData: UploadedFile[]) => {
    setUploadedState(fileData);
  }, []);

  const clear = useCallback((index: number) => {
    setUploadedState((prev) => {
      const newArr = [...prev];
      if (newArr[index]?.previewUrl) URL.revokeObjectURL(newArr[index].previewUrl);
      newArr.splice(index, 1);
      return newArr;
    });
  }, []);

  const move = useCallback((index: number, direction: "up" | "down") => {
    setUploadedState((prev) => {
      const newArr = [...prev];
      if (direction === "up" && index > 0) {
        [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
      } else if (direction === "down" && index < newArr.length - 1) {
        [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
      }
      return newArr;
    });
  }, []);

  const inputProps = {
    ref: inputRef,
    type: "file" as const,
    accept,
    multiple: true,
    style: { display: "none" } as React.CSSProperties,
    onChange: handleChange,
  };

  return { open, clear, move, setUploaded, uploaded, error, inputProps };
}
