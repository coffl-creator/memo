"use client";

import { useState } from "react";
import { CATEGORIES, type Memo } from "@/data/memos";
import { ButtonPrimary } from "./ButtonPrimary";
import { CardHeader } from "./CardHeader";
import { Chip } from "./Chip";
import { MemoItem } from "./MemoItem";

function toItemProps(memo: Memo) {
  const { title, preview, date, label } = memo;
  return { title, preview, date, label, href: `/memos/${memo.id}` };
}

type MemoHomeProps = {
  today: string;
  memos: Memo[];
};

export function MemoHome({ today, memos }: MemoHomeProps) {
  const [category, setCategory] = useState(CATEGORIES[0]);

  const visible = memos.filter(
    (memo) => category === CATEGORIES[0] || memo.category === category,
  );
  const pinned = visible.filter((memo) => memo.pinned);
  const recent = visible.filter((memo) => !memo.pinned);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-surface-page px-space-16 pt-space-64">
      <main className="flex flex-1 flex-col gap-space-16">
        <header className="flex flex-col gap-space-8 px-space-8">
          <p className="text-caption-md text-text-muted">{today}</p>
          <h1 className="text-heading-xl text-text-primary">
            오늘까지 메모를
            <br />
            <span className="text-primary">{memos.length}개</span> 남겼어요
          </h1>
        </header>

        <div className="flex gap-space-8 overflow-x-auto px-space-4">
          {CATEGORIES.map((name) => (
            <Chip
              key={name}
              label={name}
              selected={name === category}
              onClick={() => setCategory(name)}
            />
          ))}
        </div>

        {pinned.length > 0 && (
          <section className="overflow-clip rounded-xl bg-surface-card py-space-8">
            <CardHeader title="고정한 메모" pin />
            {pinned.map((memo) => (
              <MemoItem key={memo.id} {...toItemProps(memo)} />
            ))}
          </section>
        )}

        {recent.length > 0 && (
          <section className="overflow-clip rounded-xl bg-surface-card py-space-8">
            <CardHeader title="최근 메모" action />
            {recent.map((memo) => (
              <MemoItem key={memo.id} {...toItemProps(memo)} />
            ))}
          </section>
        )}
      </main>

      <div className="sticky bottom-0 bg-surface-page pb-space-34 pt-space-16">
        <ButtonPrimary label="새 메모 쓰기" icon href="/write" />
      </div>
    </div>
  );
}
