import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import Context from "./globalContext";


const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {globalcontext, setGlobalContext} = useContext(Context);
    const navigate = useNavigate();

    const handleLogin = async (action) => {
        try {
            let data = {username, password};
            let url = `${process.env.REACT_APP_AUTH_SERVICE}/auth/api/${action}/`;

            const response = await axios.post(
                url, 
                data,
                {withCredentials: true}
            );

            // Check if the login is successful
            if (response.status === 200) {
                setGlobalContext(response.data.user);
                console.log(globalcontext);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/home"); // Redirect to Home Page
            } else {
                alert("Login failed: " + response.data.message);
            }
        } catch (error) {
            // Handle errors (e.g., network issues, invalid credentials, etc.)
            console.error("Login error:", error);
            if (error.response) {
                const {status, data} = error.response;
                if (status === 401) {
                    alert("Login failed: " + data.message);
                } else if (status === 400) {
                    alert("Validation error: " + JSON.stringify(data.message));
                } else {
                    alert("Error: " + data.message || "Something went wrong!");
                }
            } else {
                alert("An error occurred while logging in. Please try again.");
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 10 }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary"  fullWidth onClick={()=>handleLogin('login')}>
                    Login
                </Button>
                <Button variant="contained" color="primary" sx={{ mt: 5 }} fullWidth onClick={()=>handleLogin('register')}>
                    Create User
                </Button>
            </Box>
        </Container>
    );
};

export default LoginPage;
