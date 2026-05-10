import ReactCreatableSelect from "react-select/creatable";

export interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  value?: Option | null;
  onChange: (value: Option | null) => void;
  placeholder?: string;
  error?: string | null;
  loading?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
}

export default function CreatableSelect({
  options,
  value,
  onChange,
  placeholder,
  error,
  loading = false,
  isClearable = false,
  isDisabled = false,
}: Props) {
  return (
    <div className="w-full">
      <ReactCreatableSelect
        options={options}
        value={value}
        onChange={(v) => onChange(v as Option | null)}
        isLoading={loading}
        isClearable={isClearable}
        isDisabled={isDisabled}
        placeholder={placeholder}
        menuPlacement="auto"
        menuPortalTarget={document.body}
        classNamePrefix="react-select"
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),

          control: (base, state) => ({
            ...base,

            minHeight: "44px",

            borderColor: error
              ? "#ef4444"
              : state.isFocused
                ? "#3b82f6"
                : "#d1d5db",

            boxShadow: state.isFocused
              ? error
                ? "0 0 0 2px rgba(239,68,68,.2)"
                : "0 0 0 2px rgba(59,130,246,.2)"
              : "none",

            "&:hover": {
              borderColor: error ? "#ef4444" : "#9ca3af",
            },
          }),

          menuList: (base) => ({
            ...base,
            maxHeight: "220px",
            overflowY: "auto",
          }),
        }}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
