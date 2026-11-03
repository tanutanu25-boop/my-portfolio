import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ImagesProvider } from "./lib/images.jsx";
import "./styles.css";
createRoot(document.getElementById("root")).render(<React.StrictMode><ImagesProvider><App /></ImagesProvider></React.StrictMode>);
