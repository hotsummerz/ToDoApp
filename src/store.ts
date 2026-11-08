import type { Task, Filter, SortKey } from './types';
import { loadTasks, saveTasks } from './storage';
import { showToast } from './ui/toast';

interface State {
  tasks: Task[];
  filter: Filter;
  sortKey: SortKey;
  editingId: string | null;
}

type Listener = () => void;

const state: State = {
  tasks: [],
  filter: 'all',
  sortKey: 'deadline',
  editingId: null,
};

const listeners: Listener[] = [];

export function getState(): Readonly<State> {
  return state;
}

export function subscribe(listener: Listener): () => void {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx >= 0) listeners.splice(idx, 1);
  };
}

function notify(): void {
  listeners.forEach(fn => fn());
}

function persist(): void {
  const result = saveTasks(state.tasks);
  if (!result.ok) {
    showToast('Data tidak dapat disimpan di browser ini.');
  }
}

export function init(): void {
  const result = loadTasks();
  if (result.ok) {
    state.tasks = [...result.value];
  }
  notify();
}

export function addTask(task: Task): void {
  state.tasks.push(task);
  persist();
  notify();
}

export function updateTask(id: string, updates: Partial<Task>): void {
  const idx = state.tasks.findIndex(t => t.id === id);
  if (idx >= 0) {
    state.tasks[idx] = { ...state.tasks[idx]!, ...updates };
    persist();
    notify();
  }
}

export function deleteTask(id: string): void {
  state.tasks = state.tasks.filter(t => t.id !== id);
  persist();
  notify();
}

export function toggleTask(id: string): void {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;

  const completed = !task.completed;
  updateTask(id, {
    completed,
    completedAt: completed ? Date.now() : null,
  });
}

export function setFilter(filter: Filter): void {
  state.filter = filter;
  notify();
}

export function setSortKey(sortKey: SortKey): void {
  state.sortKey = sortKey;
  notify();
}

export function setEditing(id: string | null): void {
  state.editingId = id;
  notify();
}
