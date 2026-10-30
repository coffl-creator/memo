import Link from "next/link";
import { Icon, type IconName } from "./Icon";

type IconButtonProps = {
  icon: IconName;
  label: string;
  /** 있으면 버튼 대신 링크로 그려 그 주소로 이동한다 */
  href?: string;
};

const BOX =
  "flex size-[40px] items-center justify-center rounded-sm text-text-primary";

/** 40x40 누르는 영역 가운데에 24px 아이콘을 둔 버튼 */
export function IconButton({ icon, label, href }: IconButtonProps) {
  if (href) {
    return (
      <Link href={href} aria-label={label} className={BOX}>
        <Icon name={icon} size={24} />
      </Link>
    );
  }
  return (
    <button type="button" aria-label={label} className={BOX}>
      <Icon name={icon} size={24} />
    </button>
  );
}
