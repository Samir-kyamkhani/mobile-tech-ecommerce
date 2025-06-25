import React from "react";
import { Image as ImageIcon, X } from "lucide-react";

export default function ImageUpload({
  label = "Upload Image",
  value = "",
  onChange,
  name = "image",
  className = "",
  maxSizeMB = 5,
  allowRemove = true,
}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSizeMB) {
        alert(`File size exceeds ${maxSizeMB}MB limit.`);
        return;
      }

      onChange({ target: { name, value: file } });
    }
  };

  const handleRemoveImage = () => {
    onChange({ target: { name, value: "" } });
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          <ImageIcon className="inline h-4 w-4 mr-1" />
          {label}
        </label>
      )}

      <div className="flex items-center gap-4 flex-wrap">
        {value && (
          <div className="relative w-20 h-20">
            <img
              src={
                typeof value === "string"
                  ? `${import.meta.env.VITE_API_BASE_URL_For_Image}${value}`
                  : URL.createObjectURL(value)
              }
              alt="Preview"
              className="w-full h-full object-cover rounded border"
            />

            {allowRemove && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 bg-white border border-gray-300 rounded-full p-0.5 hover:bg-red-100"
                title="Remove Image"
              >
                <X className="h-4 w-4 text-red-600" />
              </button>
            )}
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-sm text-gray-600 border border-gray-300 rounded-lg p-2 w-full sm:w-auto"
        />
      </div>

      <p className="text-xs text-gray-500 mt-1">
        JPG, PNG or GIF. Max size: {maxSizeMB}MB.
      </p>
    </div>
  );
}
