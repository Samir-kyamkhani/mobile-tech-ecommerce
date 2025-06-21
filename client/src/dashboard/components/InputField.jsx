const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  disabled = false,
  readOnly = false,
  placeholder = "",
  className = "",
  icon: Icon,
}) => (
  <div className={`space-y-2 ${className}`}>
    <label className="block text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-4 w-4 text-gray-400" />
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`w-full ${
          Icon ? "pl-10" : "pl-4"
        } pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          disabled || readOnly ? "bg-gray-50 text-gray-500" : "bg-white"
        }`}
      />
    </div>
  </div>
);

export default InputField