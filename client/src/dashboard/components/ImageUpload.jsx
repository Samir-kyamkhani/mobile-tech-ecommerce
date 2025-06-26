import React, { useState, useEffect } from "react";
import { Image as ImageIcon, X, PlusCircle } from "lucide-react";

export default function ImageUpload({
  label = "Upload Image",
  value = "", // Single image
  multipleVal = [], // Array of images
  multiple = false,
  onChange,
  name = "image",
  className = "",
  maxSizeMB = 5,
  allowRemove = true,
}) {
  const [previewFile, setPreviewFile] = useState(() => value || null); // Single image
  const [previewFiles, setPreviewFiles] = useState(() => multipleVal || []); // Multiple images

  useEffect(() => {
    if (value !== previewFile) {
      setPreviewFile(value || null);
    }
  }, [value]);

  useEffect(() => {
    const sameLength = multipleVal.length === previewFiles.length;
    const sameRefs = multipleVal.every((file, i) => file === previewFiles[i]);

    if (!sameLength || !sameRefs) {
      setPreviewFiles(multipleVal || []);
    }
  }, [multipleVal]);

  const handleSingleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size / (1024 * 1024) > maxSizeMB) {
      alert(`File exceeds the ${maxSizeMB}MB limit.`);
      return;
    }

    setPreviewFile(file);
    onChange({ target: { name, value: file } });
  };

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const oversized = files.some((f) => f.size / (1024 * 1024) > maxSizeMB);

    if (oversized) {
      alert(`One or more files exceed the ${maxSizeMB}MB limit.`);
      return;
    }

    const updated = [...previewFiles, ...files];
    setPreviewFiles(updated);
    onChange({ target: { name: "multi_" + name, value: updated } });
  };

  const removeSingleImage = () => {
    setPreviewFile(null);
    onChange({ target: { name, value: "" } });
  };

  const removeMultipleImage = (index) => {
    const updated = previewFiles.filter((_, i) => i !== index);
    setPreviewFiles(updated);
    onChange({ target: { name: "multi_" + name, value: updated } });
  };

  const renderImagePreview = (file, index, removeFn) => {
    let imageSrc = "";

    if (typeof file === "string") {
      imageSrc = file.startsWith("http")
        ? file
        : `${import.meta.env.VITE_API_BASE_URL_For_Image}${file}`;
    } else if (file instanceof File || file instanceof Blob) {
      try {
        imageSrc = URL.createObjectURL(file);
      } catch (err) {
        console.error("Failed to createObjectURL:", err);
        return null;
      }
    } else {
      // Unknown object type
      if (import.meta.env.DEV) {
        console.warn("Unsupported image format:", file);
      }
      return null;
    }

    return (
      <div
        key={index}
        className="relative w-20 h-20 flex justify-center items-center"
      >
        <img
          src={imageSrc}
          alt="Preview"
          className="w-full h-full object-cover rounded-md border"
        />
        {allowRemove && (
          <button
            type="button"
            onClick={() => removeFn(index)}
            className="absolute top-0 right-0 bg-white border border-gray-300 rounded-full p-0.5 hover:bg-red-200"
            title="Remove Image"
          >
            <X className="h-4 w-4 text-red-600" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          <ImageIcon className="inline h-4 w-4 mr-1" />
          {label}
        </label>
      )}

      {/* Single image preview */}
      {!multiple && (
        <div className="flex items-center gap-4 flex-wrap">
          {previewFile && renderImagePreview(previewFile, 0, removeSingleImage)}
          <input
            type="file"
            accept="image/*"
            onChange={handleSingleFileChange}
            className="text-sm text-gray-600 border border-gray-300 rounded-lg p-2 w-full sm:w-auto"
          />
        </div>
      )}

      {/* Multiple image previews */}
      {multiple && previewFiles.length > 0 && (
        <div className="flex items-center gap-4 flex-wrap mt-2">
          {previewFiles.map((file, index) =>
            renderImagePreview(file, index, removeMultipleImage)
          )}
        </div>
      )}

      {/* Add More Images Button */}
      {multiple && previewFiles.length < 5 && (
        <div className="mt-2">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleMultipleFileChange}
            className="hidden"
            id="multi-image-upload"
          />
          <button
            type="button"
            onClick={() =>
              document.getElementById("multi-image-upload").click()
            }
            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray-600 text-white hover:bg-gray-700 text-sm"
          >
            <PlusCircle className="h-5 w-5" />
            Add more images
          </button>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-1">
        Supported formats: JPG, PNG, GIF. Max size: {maxSizeMB}MB per file.
      </p>
    </div>
  );
}
