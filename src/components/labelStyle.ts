export type LabelName = "blue" | "green" | "orange" | "pink";
export type MemoLabel = LabelName;

export const LABEL_NAMES: LabelName[] = ["blue", "green", "orange", "pink"];

/** 메모의 색 라벨 -> 연한 배경 + 진한 글자색 */
export const LABEL_STYLE: Record<LabelName, string> = {
  blue: "bg-label-blue-soft text-label-blue",
  green: "bg-label-green-soft text-label-green",
  orange: "bg-label-orange-soft text-label-orange",
  pink: "bg-label-pink-soft text-label-pink",
};
