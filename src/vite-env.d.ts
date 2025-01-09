/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GOOGLE_MAPS_API_KEY: string;
  // Add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
