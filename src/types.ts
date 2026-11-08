// TS concept: type alias + union types
export type Priority = 'low' | 'medium' | 'high';
export type Filter = 'all' | 'pending' | 'done';
export type SortKey = 'deadline' | 'newest' | 'priority';
export type TaskStatusLabel = 'Belum Selesai' | 'Selesai';

// TS concept: interface + primitive types + union with null
export interface Task {
  id: string;                 // TS concept: primitive types (string)
  title: string;
  course: string;
  deadline: string | null;    // TS concept: union types
  priority: Priority;
  notes: string;
  completed: boolean;         // TS concept: primitive types (boolean)
  createdAt: number;          // TS concept: primitive types (number)
  completedAt: number | null;
}

export interface StoredData {
  version: number;
  tasks: Task[];              // TS concept: arrays
}

export interface AppConfig {
  appName: string;
  appVersion: string;
  courseName: string;
}

// TS concept: generics
export type Result<T> = { ok: true; value: T } | { ok: false; error: string };
