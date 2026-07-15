// src/components/Demo/FileUpload.tsx
"use client";

import React, { useState } from "react";

interface FileUploadBoxProps {
  onFileChange: (file: File | null) => void;
  label: string;
}

const FileUploadBox: React.FC<FileUploadBoxProps> = ({
  onFileChange,
  label,
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputId = label.replace(/\s+/g, "-");
  const labelId = `${inputId}-label`;

  const handleActivate = (): void => {
    document.getElementById(inputId)?.click();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setUploadedFile(file);
    onFileChange(file);
    setIsDragOver(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setUploadedFile(file);
    onFileChange(file);
  };

  return (
    <div
      className="flex w-full max-w-md flex-col items-center"
      data-oid=":4kc:6m"
    >
      <label
        id={labelId}
        htmlFor={inputId}
        className="mb-2 block text-sm font-medium text-dark dark:text-white"
        data-oid="6fde4az"
      >
        {label}
      </label>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          dashed border-2 ${isDragOver ? "border-blue-500" : "border-blue-200"}
          flex
          h-48
          w-full
          cursor-pointer
          flex-col items-center
          justify-center rounded-lg bg-[#f8f8f8] p-8 text-center transition-colors
          duration-300 dark:bg-[#2C303B]
        `}
        role="button"
        tabIndex={0}
        aria-labelledby={labelId}
        aria-describedby={`${inputId}-desc`}
        onClick={handleActivate}
        onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleActivate();
          }
        }}
        data-oid="c0jx1g_"
      >
        Drag and drop a file here or click to select a file
        <p id={`${inputId}-desc`} className="sr-only">
          Drag and drop a file here, or press Enter or Space to open the file
          picker.
        </p>
        <input
          id={inputId}
          type="file"
          onChange={handleFileSelect}
          style={{ display: "none" }}
          data-oid="c2xz3s."
        />
      </div>
      {uploadedFile && (
        <p className="mt-2 text-sm text-body-color" data-oid="hkwvl5t">
          Uploaded: {uploadedFile.name}
        </p>
      )}
    </div>
  );
};

export default FileUploadBox;
