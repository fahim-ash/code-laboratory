import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import FileUploadPage from "./components/FileUpload";
import FileListPage from "./components/FlieListPage";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import UserList from "./components/UserPage";
import TokenValidate from "./components/TokenValidate";
import Logout from "./components/Logout";
import {GlobalContext} from "./components/globalContext";

function App() {
    return (
        <GlobalContext>
            <Router>
                <TokenValidate> 
                    <Navbar /> 
                </TokenValidate>
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
        </GlobalContext>
    );
}

export default App;
