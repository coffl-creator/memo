import type { MemoLabel } from "@/components/labelStyle";

/** 본문 문단 안의 조각. bold가 true면 굵게 보인다 */
export type TextPart = { text: string; bold?: boolean };

export type MemoBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; parts: TextPart[] }
  | { type: "list"; items: string[] };

export type Memo = {
  id: string;
  title: string;
  preview: string;
  date: string;
  /** 상세 화면 메타에 보이는 작성 시각 */
  createdAt: string;
  label: MemoLabel;
  category: string;
  pinned: boolean;
  body?: MemoBlock[];
};

export const CATEGORIES = ["전체", "업무", "개인", "아이디어"];
