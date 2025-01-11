import React, { useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";

const FileUploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        alert(`File uploaded: ${selectedFile?.name}`);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 10 }}>
                <Typography variant="h4" gutterBottom>
                    Upload File
                </Typography>
                <input type="file" onChange={handleFileChange} />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleUpload}
                    disabled={!selectedFile}
                >
                    Upload
                </Button>
            </Box>
        </Container>
    );
};

export default FileUploadPage;
