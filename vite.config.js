import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import imageUploads from "./vite-plugin-image-uploads.js";
export default defineConfig({ plugins: [react(), imageUploads()] });
