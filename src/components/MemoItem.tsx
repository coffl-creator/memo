import Link from "next/link";
import { Icon } from "./Icon";
import { LABEL_STYLE, type MemoLabel } from "./labelStyle";

type MemoItemProps = {
  title: string;
  preview: string;
  date: string;
  label: MemoLabel;
  /** 있으면 누를 때 그 주소로 이동한다 */
  href?: string;
};

const ROW =
  "flex h-[72px] w-full items-center gap-space-16 px-space-20 py-space-12 text-left";

export function MemoItem({ title, preview, date, label, href }: MemoItemProps) {
  const content = (
    <>
      <span
        className={`flex size-[44px] shrink-0 items-center justify-center rounded-sm ${LABEL_STYLE[label]}`}
      >
        <Icon name="note" size={22} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-space-4">
        <span className="truncate text-title-md text-text-primary">{title}</span>
        <span className="truncate text-body-sm text-text-secondary">
          {preview}
        </span>
      </span>
      <span className="shrink-0 whitespace-nowrap text-caption-sm text-text-muted">
        {date}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={ROW}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={ROW}>
      {content}
    </button>
  );
}
