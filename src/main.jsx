import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "@context/AuthProvider";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Router>
);
