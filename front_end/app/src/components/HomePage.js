import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 10 }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to the Home Page!
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    Use the navigation bar above to upload files, view files, or
                    perform other actions.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 2 }}
                    onClick={() => navigate("/upload")}
                >
                    Go to File Upload
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate("/files")}
                >
                    View File List
                </Button>
            </Box>
        </Container>
    );
};

export default HomePage;
