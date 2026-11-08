import type { Task, StoredData, Result } from './types';

const STORAGE_KEY = 'todo-tugas-kuliah:v1';

function isStoredData(value: unknown): value is StoredData {
  if (!value || typeof value !== 'object') return false;
  const data = value as Record<string, unknown>;
  return (
    typeof data.version === 'number' &&
    Array.isArray(data.tasks)
  );
}

// TS concept: generics
export function loadTasks(): Result<readonly Task[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ok: true, value: [] };

    const parsed: unknown = JSON.parse(raw);
    if (!isStoredData(parsed)) {
      return { ok: false, error: 'Invalid data format' };
    }

    return { ok: true, value: parsed.tasks };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

export function saveTasks(tasks: readonly Task[]): Result<void> {
  try {
    const data: StoredData = { version: 1, tasks: [...tasks] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return { ok: true, value: undefined };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Storage failed' };
  }
}
