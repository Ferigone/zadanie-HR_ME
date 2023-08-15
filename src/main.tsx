import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./ThemeContext.tsx";
import { FirebaseAuthProvider } from "./firebase/FirebaseAuth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <FirebaseAuthProvider>
        <App />
      </FirebaseAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
