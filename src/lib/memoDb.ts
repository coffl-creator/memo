import type { LabelName } from "@/components/labelStyle";
import type { Memo, MemoBlock } from "@/data/memos";
import { dateLabel, dateTimeLabel, todayKey } from "./formatDate";
import { supabase } from "./supabase";

type MemoRow = {
  id: string;
  title: string;
  body: MemoBlock[];
  category: string;
  label: LabelName;
  pinned: boolean;
  created_at: string;
};

/** 작성 화면에서 저장할 메모 */
export type NewMemo = {
  title: string;
  category: string;
  label: LabelName;
  body: MemoBlock[];
};

function textOf(block: MemoBlock) {
  switch (block.type) {
    case "heading":
    case "subheading":
      return block.text;
    case "paragraph":
      return block.parts.map((part) => part.text).join("");
    case "list":
      return block.items.join(", ");
  }
}

function toMemo(row: MemoRow, today: string): Memo {
  const createdMs = Date.parse(row.created_at);
  const preview = row.body.map(textOf).filter(Boolean).join(" ");
  return {
    id: row.id,
    title: row.title,
    preview: preview || "내용 없음",
    date: dateLabel(createdMs, today),
    createdAt: dateTimeLabel(createdMs),
    label: row.label,
    category: row.category,
    pinned: row.pinned,
    body: row.body,
  };
}

/** 모든 메모. 최신순 */
export async function fetchMemos(): Promise<Memo[]> {
  const { data, error } = await supabase
    .from("memos")
    .select("*")
    .order("created_at", { ascending: false })
    .overrideTypes<MemoRow[], { merge: false }>();
  if (error) throw new Error(error.message);
  const today = todayKey();
  return data.map((row) => toMemo(row, today));
}

/** 메모 한 건. 없으면 null */
export async function fetchMemo(id: string): Promise<Memo | null> {
  const { data, error } = await supabase
    .from("memos")
    .select("*")
    .eq("id", id)
    .maybeSingle<MemoRow>();
  // 형식이 맞지 않는 id도 없는 메모로 본다
  if (error) return null;
  return data ? toMemo(data, todayKey()) : null;
}

/** 새 메모를 저장한다. 저장하지 못하면 false */
export async function insertMemo(memo: NewMemo) {
  const { error } = await supabase.from("memos").insert(memo);
  return !error;
}
