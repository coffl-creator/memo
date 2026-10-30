import { Suspense } from "react";
import { connection } from "next/server";
import { MemoHome } from "@/components/MemoHome";
import { fetchMemos } from "@/lib/memoDb";

// 오늘 날짜는 요청마다 달라서 캐시하지 않고 그린다
async function Today() {
  await connection();
  const today = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date());

  const memos = await fetchMemos();

  return <MemoHome today={today} memos={memos} />;
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Today />
    </Suspense>
  );
}
