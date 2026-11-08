/// <reference types="vite/client" />

// TS concept: interface
interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_COURSE_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
