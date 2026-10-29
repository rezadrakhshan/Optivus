/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the API gateway, e.g. http://localhost:3000/ */
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
