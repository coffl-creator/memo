type InputFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  onChange: (value: string) => void;
};

/** 제목 입력 칸. 입력 중에는 파란 테두리를 보인다 */
export function InputField({
  label,
  value,
  placeholder,
  maxLength,
  onChange,
}: InputFieldProps) {
  return (
    <label className="flex flex-col gap-space-4 rounded-lg bg-surface-card px-space-20 py-space-16 ring-primary focus-within:ring-2">
      <span className="text-caption-sm text-text-muted">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent text-title-md text-text-primary outline-none placeholder:text-text-muted"
      />
    </label>
  );
}
