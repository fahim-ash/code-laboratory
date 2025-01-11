import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import FileUploadPage from "./components/FileUpload";
import FileListPage from "./components/FlieListPage";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/upload" element={<FileUploadPage />} />
                <Route path="/files" element={<FileListPage />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;
