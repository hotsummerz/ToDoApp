// Parse local date from YYYY-MM-DD (avoid UTC offset bugs)
export function parseLocalDate(dateStr: string): Date | null {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  const y = parseInt(parts[0]!, 10);
  const m = parseInt(parts[1]!, 10);
  const d = parseInt(parts[2]!, 10);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
  return new Date(y, m - 1, d);
}

export function formatLocalDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function getLocalMidnight(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function daysDiff(from: Date, to: Date): number {
  const msPerDay = 86400000;
  return Math.floor((to.getTime() - from.getTime()) / msPerDay);
}

export function formatDeadline(deadline: string | null): { text: string; urgency: 'overdue' | 'soon' | 'normal' } | null {
  if (!deadline) return null;

  const date = parseLocalDate(deadline);
  if (!date) return null;

  const today = getLocalMidnight();
  const diff = daysDiff(today, date);

  let relative = '';
  let urgency: 'overdue' | 'soon' | 'normal' = 'normal';

  if (diff < 0) {
    relative = ` · Terlambat ${Math.abs(diff)} hari`;
    urgency = 'overdue';
  } else if (diff === 0) {
    relative = ' · Hari ini';
    urgency = 'soon';
  } else if (diff === 1) {
    relative = ' · Besok';
    urgency = 'soon';
  } else if (diff <= 3) {
    relative = ` · ${diff} hari lagi`;
    urgency = 'soon';
  }

  return { text: formatLocalDate(date) + relative, urgency };
}
