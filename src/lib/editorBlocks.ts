import type { MemoBlock, TextPart } from "@/data/memos";

const HEADINGS = new Set(["H1", "H2"]);
const SUBHEADINGS = new Set(["H3", "H4"]);
const LISTS = new Set(["UL", "OL"]);
const BLOCKS = new Set(["DIV", "P"]);

function isBoldStyle(el: HTMLElement) {
  const weight = el.style.fontWeight;
  return weight === "bold" || Number(weight) >= 600;
}

/** 편집기 DOM에서 저장용 블록(제목·소제목·문단·목록)만 뽑는다. 그 밖의 서식과 태그는 버린다. */
export function domToBlocks(root: HTMLElement): MemoBlock[] {
  const blocks: MemoBlock[] = [];
  let parts: TextPart[] = [];

  const flush = () => {
    const text = parts.map((part) => part.text).join("");
    if (text.trim()) {
      const first = parts[0];
      const last = parts[parts.length - 1];
      first.text = first.text.trimStart();
      last.text = last.text.trimEnd();
      blocks.push({ type: "paragraph", parts: parts.filter((p) => p.text) });
    }
    parts = [];
  };

  const addText = (text: string, bold: boolean) => {
    const clean = text.replace(/ /g, " ");
    if (!clean) return;
    const last = parts[parts.length - 1];
    if (last && Boolean(last.bold) === bold) {
      last.text += clean;
    } else {
      parts.push(bold ? { text: clean, bold: true } : { text: clean });
    }
  };

  const visit = (node: Node, bold: boolean) => {
    if (node.nodeType === Node.TEXT_NODE) {
      addText(node.textContent ?? "", bold);
      return;
    }
    if (!(node instanceof HTMLElement)) return;

    const tag = node.tagName;
    if (tag === "BR") {
      flush();
      return;
    }
    if (HEADINGS.has(tag) || SUBHEADINGS.has(tag)) {
      flush();
      const text = (node.textContent ?? "").replace(/ /g, " ").trim();
      if (text) {
        blocks.push({
          type: HEADINGS.has(tag) ? "heading" : "subheading",
          text,
        });
      }
      return;
    }
    if (LISTS.has(tag)) {
      flush();
      const items = Array.from(node.querySelectorAll("li"))
        .map((li) => (li.textContent ?? "").replace(/ /g, " ").trim())
        .filter(Boolean);
      if (items.length) blocks.push({ type: "list", items });
      return;
    }

    const isBlock = BLOCKS.has(tag);
    if (isBlock) flush();
    const nextBold =
      bold || tag === "B" || tag === "STRONG" || isBoldStyle(node);
    node.childNodes.forEach((child) => visit(child, nextBold));
    if (isBlock) flush();
  };

  root.childNodes.forEach((child) => visit(child, false));
  flush();
  return blocks;
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** 저장된 블록을 편집기에 채울 HTML로 바꾼다. 글자는 모두 이스케이프한다. */
export function blocksToHtml(blocks: MemoBlock[]) {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "heading":
          return `<h2>${escapeHtml(block.text)}</h2>`;
        case "subheading":
          return `<h3>${escapeHtml(block.text)}</h3>`;
        case "paragraph": {
          const inner = block.parts
            .map((part) =>
              part.bold
                ? `<b>${escapeHtml(part.text)}</b>`
                : escapeHtml(part.text),
            )
            .join("");
          return `<p>${inner}</p>`;
        }
        case "list": {
          const items = block.items
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join("");
          return `<ul>${items}</ul>`;
        }
      }
    })
    .join("");
}
