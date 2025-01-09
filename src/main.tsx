import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { APIProvider } from "@vis.gl/react-google-maps";

//# Using the Prefix 'VITE_' might cause leaking sensitive variables, will fix
const API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY ??
  process.env.VITE_GOOGLE_MAPS_API_KEY ??
  "";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <APIProvider apiKey={API_KEY} libraries={["marker"]}>
      <App />
    </APIProvider>
  </StrictMode>
);
