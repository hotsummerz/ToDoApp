import type { AppConfig } from './types';

export const config: AppConfig = {
  appName: import.meta.env.VITE_APP_NAME ?? 'Todo Tugas Kuliah',
  appVersion: import.meta.env.VITE_APP_VERSION ?? '0.0.0',
  courseName: import.meta.env.VITE_COURSE_NAME ?? '',
};
