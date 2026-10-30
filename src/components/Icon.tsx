export type IconName =
  | "plus"
  | "note"
  | "pin"
  | "chevron-left"
  | "chevron-right"
  | "share"
  | "more";

type IconProps = {
  name: IconName;
  size: number;
};

/** 선 아이콘. 색은 부모의 글자색(currentColor)을 따른다. */
export function Icon({ name, size }: IconProps) {
  const mask = `url(/icons/${name}.svg)`;
  return (
    <span
      aria-hidden
      className="inline-block shrink-0 bg-current"
      style={{
        width: size,
        height: size,
        maskImage: mask,
        WebkitMaskImage: mask,
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
      }}
    />
  );
}
