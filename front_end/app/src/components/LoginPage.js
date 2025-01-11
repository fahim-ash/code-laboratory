import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Replace with your backend login endpoint
            const response = await axios.post(
                "http://localhost:5000/api/login",
                {
                    username,
                    password,
                }
            );

            // Check if the login is successful
            if (response.status === 200 && response.data.success) {
                alert("Login successful!");
                navigate("/home"); // Redirect to Home Page
            } else {
                alert("Login failed: " + response.data.message);
            }
        } catch (error) {
            // Handle errors (e.g., network issues, invalid credentials, etc.)
            console.error("Login error:", error);
            alert("An error occurred while logging in. Please try again.");
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
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
};

export default LoginPage;
