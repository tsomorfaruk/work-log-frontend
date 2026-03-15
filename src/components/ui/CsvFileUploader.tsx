import React, { useRef, useState, DragEvent, ChangeEvent } from "react";
import { FaFileCsv } from "react-icons/fa";
import { clsx } from "clsx";
import Button from "./button";

interface CsvFileUploaderProps {
  maxFiles?: number;
  placeholder?: string;
  maxFileNameLength?: number;
  allowDragDrop?: boolean;
  onSelectFile?: (files: File | File[] | null) => void;
  className?: string;
}

const CsvFileUploader: React.FC<CsvFileUploaderProps> = ({
  maxFiles = 1,
  placeholder = "upload csv file",
  maxFileNameLength = 20,
  allowDragDrop = true,
  onSelectFile,
  className,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const csvFiles = Array.from(files).filter(
      (file) => file.type === "text/csv" || file.name.endsWith(".csv")
    );

    if (csvFiles.length === 0) return;

    const limitedFiles = csvFiles.slice(0, maxFiles);
    setSelectedFiles(limitedFiles);

    if (onSelectFile) {
      onSelectFile(maxFiles === 1 ? limitedFiles[0] : limitedFiles);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (!allowDragDrop) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    if (!allowDragDrop) return;
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    if (!allowDragDrop) return;
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const truncateFileName = (name: string) => {
    if (name.length <= maxFileNameLength) return name;
    return name.substring(0, maxFileNameLength) + "...";
  };

  return (
    <div
      className={clsx(
        "relative flex flex-col items-center gap-3 p-4 border-2 border-dashed rounded-xl transition-all duration-300",
        isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-gray-300 bg-transparent",
        className
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".csv"
        multiple={maxFiles > 1}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-2">
        {selectedFiles.length > 0 ? (
          <div className="flex flex-col items-center gap-1 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-2 text-[#007B99]">
              <FaFileCsv size={32} />
              <div className="flex flex-col">
                {selectedFiles.map((file, index) => (
                  <span key={index} title={file.name} className="text-sm font-medium">
                    {truncateFileName(file.name)}
                  </span>
                ))}
              </div>
            </div>
            <Button variant="neutral" onClick={onButtonClick} className="mt-2 scale-90">
              Change File
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Button variant="neutral" onClick={onButtonClick}>
              Upload CSV
            </Button>
            <p className="text-xs text-gray-400 italic">
              {placeholder} {allowDragDrop && "(or drag & drop)"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CsvFileUploader;
