import type { Task, Filter, SortKey } from '../types';
import { parseLocalDate } from './date';

// TS concept: generics
export function sortBy<T>(items: readonly T[], compare: (a: T, b: T) => number): T[] {
  return [...items].sort(compare);
}

export function filterTasks(tasks: readonly Task[], filter: Filter): Task[] {
  if (filter === 'all') return [...tasks];
  if (filter === 'done') return tasks.filter(t => t.completed);
  return tasks.filter(t => !t.completed);
}

const priorityOrder: Record<string, number> = { high: 3, medium: 2, low: 1 };

function compareByDeadline(a: Task, b: Task): number {
  if (a.completed !== b.completed) return a.completed ? 1 : -1;

  if (a.completed) {
    return (b.completedAt ?? 0) - (a.completedAt ?? 0);
  }

  const aDate = a.deadline ? parseLocalDate(a.deadline) : null;
  const bDate = b.deadline ? parseLocalDate(b.deadline) : null;

  if (aDate && bDate) {
    const diff = aDate.getTime() - bDate.getTime();
    if (diff !== 0) return diff;
  } else if (aDate) return -1;
  else if (bDate) return 1;

  const priorityDiff = priorityOrder[b.priority]! - priorityOrder[a.priority]!;
  if (priorityDiff !== 0) return priorityDiff;

  return a.createdAt - b.createdAt;
}

function compareByNewest(a: Task, b: Task): number {
  return b.createdAt - a.createdAt;
}

function compareByPriority(a: Task, b: Task): number {
  const priorityDiff = priorityOrder[b.priority]! - priorityOrder[a.priority]!;
  if (priorityDiff !== 0) return priorityDiff;

  const aDate = a.deadline ? parseLocalDate(a.deadline) : null;
  const bDate = b.deadline ? parseLocalDate(b.deadline) : null;

  if (aDate && bDate) {
    const diff = aDate.getTime() - bDate.getTime();
    if (diff !== 0) return diff;
  } else if (aDate) return -1;
  else if (bDate) return 1;

  return a.createdAt - b.createdAt;
}

export function sortTasks(tasks: readonly Task[], sortKey: SortKey): Task[] {
  if (sortKey === 'newest') return sortBy(tasks, compareByNewest);
  if (sortKey === 'priority') return sortBy(tasks, compareByPriority);
  return sortBy(tasks, compareByDeadline);
}
