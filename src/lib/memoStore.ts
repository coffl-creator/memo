import { useSyncExternalStore } from "react";
import type { LabelName } from "@/components/labelStyle";
import type { MemoBlock } from "@/data/memos";

/** 작성 중인 글. 저장하기 전까지 이 브라우저(로컬 스토리지)에 자동으로 보관한다 */
export type MemoDraft = {
  title: string;
  category: string;
  label: LabelName;
  body: MemoBlock[];
};

const DRAFT_KEY = "memo:draft";
const LABELS: LabelName[] = ["blue", "green", "orange", "pink"];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isTextPart(value: unknown) {
  return (
    isObject(value) &&
    typeof value.text === "string" &&
    (value.bold === undefined || typeof value.bold === "boolean")
  );
}

function isBlock(value: unknown): value is MemoBlock {
  if (!isObject(value)) return false;
  switch (value.type) {
    case "heading":
    case "subheading":
      return typeof value.text === "string";
    case "paragraph":
      return Array.isArray(value.parts) && value.parts.every(isTextPart);
    case "list":
      return (
        Array.isArray(value.items) &&
        value.items.every((item) => typeof item === "string")
      );
    default:
      return false;
  }
}

function isFields(value: unknown): value is MemoDraft {
  return (
    isObject(value) &&
    typeof value.title === "string" &&
    typeof value.category === "string" &&
    LABELS.includes(value.label as LabelName) &&
    Array.isArray(value.body) &&
    value.body.every(isBlock)
  );
}

function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function parse(raw: string | null): unknown {
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function loadDraft(): MemoDraft | null {
  const value = parse(read(DRAFT_KEY));
  return isFields(value) ? value : null;
}

export function saveDraft(draft: MemoDraft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    return true;
  } catch {
    return false;
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // 스토리지를 쓸 수 없으면 지울 것도 없다
  }
}

const subscribeNone = () => () => {};

/** 브라우저에서 화면이 이어붙은 뒤에만 true */
export function useHydrated() {
  return useSyncExternalStore(
    subscribeNone,
    () => true,
    () => false,
  );
}
