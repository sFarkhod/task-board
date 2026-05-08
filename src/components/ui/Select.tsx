import ReactSelect from "react-select";

export interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  value?: Option | null;
  onChange: (value: Option | null) => void;
  placeholder?: string;
  isClearable?: boolean;
  error?: string | null;
  loading?: boolean;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder,
  isClearable = false,
  error,
  loading = false,
}: Props) {
  return (
    <div className="w-full">
      <ReactSelect
        options={options}
        value={value}
        onChange={onChange}
        isLoading={loading}
        isClearable={isClearable}
        placeholder={placeholder}
        classNamePrefix="react-select"
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor: error
              ? "#ef4444"
              : state.isFocused
                ? "#3b82f6"
                : "#d1d5db",
            minHeight: "44px",
            boxShadow: state.isFocused
              ? error
                ? "0 0 0 2px rgba(239, 68, 68, 0.2)"
                : "0 0 0 2px rgba(59, 130, 246, 0.2)"
              : "none",

            "&:hover": {
              borderColor: error ? "#ef4444" : "#9ca3af",
            },
          }),
          menuList: (base) => ({
            ...base,
            maxHeight: "200px",
            overflowY: "auto",
          }),
        }}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
