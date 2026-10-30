import Link from "next/link";
import { Icon } from "./Icon";

type ButtonPrimaryProps = {
  label: string;
  icon?: boolean;
  /** 있으면 버튼 대신 링크로 그려 그 주소로 이동한다 */
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const BASE =
  "flex h-[56px] w-full items-center justify-center gap-space-8 rounded-md px-space-24 text-button-md";
const ENABLED = "bg-primary text-text-on-primary";
const DISABLED = "bg-border-default text-text-muted";

export function ButtonPrimary({
  label,
  icon = false,
  href,
  disabled = false,
  onClick,
}: ButtonPrimaryProps) {
  const content = (
    <>
      {icon && <Icon name="plus" size={20} />}
      {label}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${BASE} ${ENABLED}`}>
        {content}
      </Link>
    );
  }
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${BASE} ${disabled ? DISABLED : ENABLED}`}
    >
      {content}
    </button>
  );
}
