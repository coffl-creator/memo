"use client";

import { useEffect, useRef, useState } from "react";
import type { MemoBlock } from "@/data/memos";
import { blocksToHtml, domToBlocks } from "@/lib/editorBlocks";
import {
  EditorToolbar,
  type FormatCommand,
  type Formats,
} from "./EditorToolbar";

const NO_FORMATS: Formats = {
  bold: false,
  heading: false,
  subheading: false,
  list: false,
};

const EMPTY_HTML = "<p><br></p>";

function readFormats(): Formats {
  const block = String(document.queryCommandValue("formatBlock")).toLowerCase();
  return {
    bold: document.queryCommandState("bold"),
    heading: block === "h2",
    subheading: block === "h3",
    list: document.queryCommandState("insertUnorderedList"),
  };
}

type MemoEditorProps = {
  initialBlocks: MemoBlock[];
  onChange: (blocks: MemoBlock[]) => void;
};

export function MemoEditor({ initialBlocks, onChange }: MemoEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  // 비어 있어도 빈 문단 하나로 시작해야 서식 버튼이 첫 줄에 바로 먹는다
  const [html] = useState(() => blocksToHtml(initialBlocks) || EMPTY_HTML);
  const [formats, setFormats] = useState(NO_FORMATS);

  useEffect(() => {
    const update = () => {
      const editor = ref.current;
      const anchor = document.getSelection()?.anchorNode;
      if (editor && anchor && editor.contains(anchor)) {
        setFormats(readFormats());
      }
    };
    document.addEventListener("selectionchange", update);
    return () => document.removeEventListener("selectionchange", update);
  }, []);

  const emit = () => {
    const editor = ref.current;
    if (!editor) return;
    // 전체를 지우면 줄 요소까지 사라질 수 있어서 빈 문단을 다시 만든다
    if (!editor.firstElementChild && !editor.textContent) {
      editor.innerHTML = EMPTY_HTML;
      const caret = document.createRange();
      caret.setStart(editor.firstElementChild!, 0);
      caret.collapse(true);
      const selection = document.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(caret);
    }
    onChange(domToBlocks(editor));
  };

  const run = (command: FormatCommand) => {
    ref.current?.focus();
    switch (command) {
      case "bold":
        document.execCommand("bold");
        break;
      case "heading":
        document.execCommand("formatBlock", false, formats.heading ? "p" : "h2");
        break;
      case "subheading":
        document.execCommand(
          "formatBlock",
          false,
          formats.subheading ? "p" : "h3",
        );
        break;
      case "list":
        document.execCommand("insertUnorderedList");
        break;
    }
    setFormats(readFormats());
    emit();
  };

  return (
    <div className="overflow-clip rounded-lg border-2 border-border-default bg-surface-card focus-within:border-primary">
      <EditorToolbar formats={formats} onCommand={run} />
      <hr className="border-t border-border-default" />
      <div
        ref={ref}
        role="textbox"
        aria-multiline
        aria-label="메모 내용"
        contentEditable
        className="memo-editor"
        dangerouslySetInnerHTML={{ __html: html }}
        onFocus={() =>
          document.execCommand("defaultParagraphSeparator", false, "p")
        }
        onInput={emit}
        // 다른 곳에서 복사한 서식이 섞이지 않게 글자만 붙여 넣는다
        onPaste={(event) => {
          event.preventDefault();
          document.execCommand(
            "insertText",
            false,
            event.clipboardData.getData("text/plain"),
          );
        }}
      />
    </div>
  );
}
