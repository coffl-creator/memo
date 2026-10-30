import { Icon } from "./Icon";

type CardHeaderProps = {
  title: string;
  pin?: boolean;
  action?: boolean;
  onAction?: () => void;
};

export function CardHeader({
  title,
  pin = false,
  action = false,
  onAction,
}: CardHeaderProps) {
  return (
    <div className="flex h-[40px] items-center gap-space-4 pb-space-4 pl-space-20 pr-space-16 pt-space-12">
      {pin && (
        <span className="text-primary">
          <Icon name="pin" size={16} />
        </span>
      )}
      <h2 className="flex-1 text-label-md text-text-primary">{title}</h2>
      {action && (
        <button
          type="button"
          onClick={onAction}
          className="flex items-center gap-space-4 text-caption-md text-text-muted"
        >
          전체 보기
          <Icon name="chevron-right" size={16} />
        </button>
      )}
    </div>
  );
}
