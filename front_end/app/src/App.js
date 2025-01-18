import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import FileUploadPage from "./components/FileUpload";
import FileListPage from "./components/FlieListPage";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
// import UrlToServerMapper from "./components/UrlToServerMapper";
import UserList from "./components/UserPage";
import TokenValidate from "./components/TokenValidate";
import Logout from "./components/Logout";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route
                    path="/home"
                    element={
                        <TokenValidate>
                            <HomePage />
                        </TokenValidate>
                    }
                />
                <Route
                    path="/upload"
                    element={
                        <TokenValidate>
                            <FileUploadPage />
                        </TokenValidate>
                    }
                />
                <Route
                    path="/files"
                    element={
                        <TokenValidate>
                            <FileListPage />
                        </TokenValidate>
                    }
                />
                <Route
                    path="/users"
                    element={
                        <TokenValidate>
                            <UserList />
                        </TokenValidate>
                    }
                />
                <Route path="/logout" element={<Logout/>}/>
            </Routes>
        </Router>
    );
}

export default App;
