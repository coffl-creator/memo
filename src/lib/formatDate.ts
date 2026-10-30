const TIME_ZONE = "Asia/Seoul";

const dayKeyFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const monthDayFormat = new Intl.DateTimeFormat("ko-KR", {
  timeZone: TIME_ZONE,
  month: "long",
  day: "numeric",
});
const dateTimeFormat = new Intl.DateTimeFormat("ko-KR", {
  timeZone: TIME_ZONE,
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const DAY_MS = 24 * 60 * 60 * 1000;

/** 한국 시간 기준 날짜 키. 예: "2026-10-30" */
export function dayKey(ms: number) {
  return dayKeyFormat.format(ms);
}

export function todayKey() {
  return dayKey(Date.now());
}

/** 목록에 보이는 날짜. 오늘/어제, 그 밖에는 "10월 28일" */
export function dateLabel(ms: number, today: string) {
  if (today) {
    const diff = Math.round((Date.parse(today) - Date.parse(dayKey(ms))) / DAY_MS);
    if (diff === 0) return "오늘";
    if (diff === 1) return "어제";
  }
  return monthDayFormat.format(ms);
}

/** 상세 화면에 보이는 작성 시각. 예: "10월 30일 오전 9:12" */
export function dateTimeLabel(ms: number) {
  return dateTimeFormat.format(ms);
}
