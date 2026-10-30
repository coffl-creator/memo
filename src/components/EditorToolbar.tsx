export type FormatCommand = "bold" | "heading" | "subheading" | "list";
export type Formats = Record<FormatCommand, boolean>;

const BUTTONS: { command: FormatCommand; label: string }[] = [
  { command: "bold", label: "B" },
  { command: "heading", label: "제목" },
  { command: "subheading", label: "소제목" },
  { command: "list", label: "목록" },
];

type EditorToolbarProps = {
  formats: Formats;
  onCommand: (command: FormatCommand) => void;
};

/** 본문 서식 막대. 커서가 있는 글자의 서식은 파랗게 보인다 */
export function EditorToolbar({ formats, onCommand }: EditorToolbarProps) {
  return (
    <div
      role="toolbar"
      aria-label="서식"
      className="flex h-[52px] items-center gap-space-4 px-space-12"
    >
      {BUTTONS.map(({ command, label }) => (
        <button
          key={command}
          type="button"
          aria-pressed={formats[command]}
          // 누르는 순간 편집기의 선택 영역이 풀리지 않게 한다
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onCommand(command)}
          className={`flex h-[36px] items-center justify-center rounded-sm px-space-12 text-label-md ${
            formats[command]
              ? "bg-label-blue-soft text-primary"
              : "text-text-secondary"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
