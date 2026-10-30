type ChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

export function Chip({ label, selected = false, onClick }: ChipProps) {
  const color = selected
    ? "bg-primary text-text-on-primary"
    : "bg-surface-card text-text-secondary";
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`h-[36px] shrink-0 whitespace-nowrap rounded-full px-space-16 text-label-md ${color}`}
    >
      {label}
    </button>
  );
}
