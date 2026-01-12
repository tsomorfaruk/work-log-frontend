import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import { Camera, Pencil } from "lucide-react";
import clsx from "clsx";

interface ImageUploaderProps {
  imageUrl?: string | null; // existing image url for edit
  onChange: (file: File | null) => void;
  size?: number; // default 150
  layoutClassName?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageUrl,
  onChange,
  size = 150,
  layoutClassName,
}) => {
  const [preview, setPreview] = useState<string | null>(imageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Update preview if imageUrl changes externally
    setPreview(imageUrl || null);
  }, [imageUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    onChange(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={clsx(
        "relative flex items-center justify-center cursor-pointer",
        layoutClassName
      )}
      style={{ width: size, height: size }}
      onClick={handleClick}
    >
      {/* Circle background */}
      <div
        className="rounded-full overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {preview ? (
          <img
            src={preview}
            alt="uploaded"
            className="w-full h-full object-cover"
          />
        ) : (
          <Camera className="w-8 h-8 text-gray-400" />
        )}
      </div>

      {/* Pencil icon when image exists */}
      {preview && (
        <div className="absolute top-2 right-2 rounded-full z-10">
          <Pencil className="w-5 h-5 text-gray-700" />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
