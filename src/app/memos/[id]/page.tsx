import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { MemoDetail } from "@/components/MemoDetail";
import { fetchMemo } from "@/lib/memoDb";

// 메모는 언제든 바뀌어서 캐시하지 않고 요청마다 읽는다
async function Memo({ params }: Pick<PageProps<"/memos/[id]">, "params">) {
  await connection();
  const { id } = await params;
  const memo = await fetchMemo(id);
  if (!memo) notFound();

  return <MemoDetail memo={memo} />;
}

export default function MemoPage({ params }: PageProps<"/memos/[id]">) {
  return (
    <Suspense fallback={null}>
      <Memo params={params} />
    </Suspense>
  );
}
