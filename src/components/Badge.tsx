import { LABEL_STYLE, type MemoLabel } from "./labelStyle";

type BadgeProps = {
  label: string;
  color: MemoLabel;
};

export function Badge({ label, color }: BadgeProps) {
  return (
    <span
      className={`flex h-[26px] items-center whitespace-nowrap rounded-full px-space-8 text-caption-sm ${LABEL_STYLE[color]}`}
    >
      {label}
    </span>
  );
}
