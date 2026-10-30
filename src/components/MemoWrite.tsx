"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, type MemoBlock } from "@/data/memos";
import { insertMemo } from "@/lib/memoDb";
import { clearDraft, loadDraft, saveDraft, useHydrated } from "@/lib/memoStore";
import { BlurFade } from "./BlurFade";
import { ButtonPrimary } from "./ButtonPrimary";
import { Chip } from "./Chip";
import { IconButton } from "./IconButton";
import { InputField } from "./InputField";
import { LabelDot } from "./LabelDot";
import { LABEL_NAMES, type LabelName } from "./labelStyle";
import { MemoEditor } from "./MemoEditor";

// "전체"는 보기용 분류라서 작성할 때는 고르지 않는다
const WRITE_CATEGORIES = CATEGORIES.slice(1);

function WriteForm() {
  const router = useRouter();
  const [draft] = useState(loadDraft);
  const [title, setTitle] = useState(draft?.title ?? "");
  const [category, setCategory] = useState(draft?.category ?? "개인");
  const [label, setLabel] = useState<LabelName>(draft?.label ?? "blue");
  const [bodyVersion, setBodyVersion] = useState(0);
  const [autoSaved, setAutoSaved] = useState(draft !== null);
  const [failed, setFailed] = useState(false);
  const [saving, setSaving] = useState(false);
  const bodyRef = useRef<MemoBlock[]>(draft?.body ?? []);
  const submittedRef = useRef(false);

  // 입력이 멈추면 작성 중인 글을 보관한다
  useEffect(() => {
    const timer = setTimeout(() => {
      if (submittedRef.current) return;
      const body = bodyRef.current;
      if (!title.trim() && body.length === 0) {
        clearDraft();
        setAutoSaved(false);
        return;
      }
      setAutoSaved(saveDraft({ title, category, label, body }));
    }, 500);
    return () => clearTimeout(timer);
  }, [title, category, label, bodyVersion]);

  const canSave = title.trim().length > 0;

  const handleSave = async () => {
    if (!canSave || saving) return;
    setSaving(true);
    setFailed(false);
    const saved = await insertMemo({
      title: title.trim(),
      category,
      label,
      body: bodyRef.current,
    });
    if (!saved) {
      setSaving(false);
      setFailed(true);
      return;
    }
    submittedRef.current = true;
    clearDraft();
    router.replace("/");
    router.refresh();
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-surface-page px-space-16 pt-space-48">
      <BlurFade direction="up">
        <nav className="flex items-center justify-between">
          <IconButton icon="chevron-left" label="뒤로가기" href="/" />
          {autoSaved && (
            <span className="text-caption-sm text-text-muted">자동 저장됨</span>
          )}
        </nav>
      </BlurFade>

      <main className="mt-space-16 flex-1">
        <BlurFade
          direction="up"
          offset={12}
          delay={0.08}
          className="flex flex-col gap-space-12"
        >
          <InputField
            label="제목"
            value={title}
            placeholder="제목을 입력하세요"
            maxLength={80}
            onChange={setTitle}
          />

          <div className="flex flex-col gap-space-12 px-space-8 py-space-4">
            <div className="flex items-center gap-space-8">
              <span className="text-caption-sm text-text-muted">분류</span>
              {WRITE_CATEGORIES.map((name) => (
                <Chip
                  key={name}
                  label={name}
                  selected={name === category}
                  onClick={() => setCategory(name)}
                />
              ))}
            </div>
            <div className="flex items-center gap-space-8">
              <span className="text-caption-sm text-text-muted">색</span>
              <div
                role="radiogroup"
                aria-label="색"
                className="flex items-center gap-space-8"
              >
                {LABEL_NAMES.map((name) => (
                  <LabelDot
                    key={name}
                    color={name}
                    selected={name === label}
                    onClick={() => setLabel(name)}
                  />
                ))}
              </div>
            </div>
          </div>

          <MemoEditor
            initialBlocks={draft?.body ?? []}
            onChange={(blocks) => {
              bodyRef.current = blocks;
              setBodyVersion((version) => version + 1);
            }}
          />
        </BlurFade>
      </main>

      <div className="sticky bottom-0 bg-surface-page pb-space-34 pt-space-16">
        {failed && (
          <p role="alert" className="mb-space-8 text-caption-sm text-label-pink">
            저장하지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요.
          </p>
        )}
        <BlurFade direction="up" offset={12} delay={0.16}>
          <ButtonPrimary
            label="저장하기"
            disabled={!canSave || saving}
            onClick={handleSave}
          />
        </BlurFade>
      </div>
    </div>
  );
}

export function MemoWrite() {
  // 작성 중인 글은 이 브라우저에 있어서, 화면이 이어붙은 뒤에 그린다
  const hydrated = useHydrated();
  if (!hydrated) return <div className="min-h-dvh bg-surface-page" />;
  return <WriteForm />;
}
