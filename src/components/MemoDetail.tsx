import type { Memo, MemoBlock } from "@/data/memos";
import { Badge } from "./Badge";
import { BlurFade } from "./BlurFade";
import { ButtonPrimary } from "./ButtonPrimary";
import { IconButton } from "./IconButton";

function Block({ block }: { block: MemoBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="text-title-lg text-text-primary">{block.text}</h2>;
    case "subheading":
      return <h3 className="text-title-md text-text-primary">{block.text}</h3>;
    case "paragraph":
      return (
        <p className="text-body-md text-text-secondary">
          {block.parts.map((part, index) =>
            part.bold ? (
              <strong key={index} className="font-bold text-text-primary">
                {part.text}
              </strong>
            ) : (
              part.text
            ),
          )}
        </p>
      );
    case "list":
      return (
        <ul className="flex flex-col gap-space-4">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-space-8 text-body-md text-text-secondary"
            >
              <span aria-hidden>•</span>
              <span className="min-w-0 flex-1">{item}</span>
            </li>
          ))}
        </ul>
      );
  }
}

type MemoDetailProps = {
  memo: Memo;
};

export function MemoDetail({ memo }: MemoDetailProps) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-surface-page px-space-16 pt-space-48">
      <BlurFade direction="up">
        <nav className="flex items-center justify-between">
          <IconButton icon="chevron-left" label="뒤로가기" href="/" />
          <div className="flex">
            <IconButton icon="pin" label="고정" />
            <IconButton icon="share" label="공유" />
            <IconButton icon="more" label="더보기" />
          </div>
        </nav>
      </BlurFade>

      <main className="mt-space-16 flex-1">
        <BlurFade direction="up" offset={12} delay={0.08}>
          <article className="flex flex-col gap-space-12 rounded-xl bg-surface-card px-space-20 py-space-24">
            <div className="flex items-center gap-space-8">
              <Badge label={memo.category} color={memo.label} />
              <span className="text-caption-sm text-text-muted">
                {memo.createdAt}
              </span>
            </div>
            <h1 className="text-heading-lg text-text-primary">{memo.title}</h1>
            <hr className="border-t border-border-default" />
            <div className="flex flex-col gap-space-12">
              {memo.body?.map((block, index) => (
                <Block key={index} block={block} />
              ))}
            </div>
          </article>
        </BlurFade>
      </main>

      <div className="sticky bottom-0 bg-surface-page pb-space-34 pt-space-16">
        <BlurFade direction="up" offset={12} delay={0.16}>
          <ButtonPrimary label="수정하기" />
        </BlurFade>
      </div>
    </div>
  );
}
