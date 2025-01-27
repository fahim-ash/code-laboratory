import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, Button, Box } from "@mui/material";

const FileUploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadStatus(""); // Reset status on new file selection
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("description", "Sample file upload");

        try {
            const response = await axios.post("/file/api/upload/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
                {withCredentials: true}
            );

            if (response.status === 201) {
                setUploadStatus(`File uploaded successfully! File ID: ${response.data.file_id}`);
            } else {
                setUploadStatus("File upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus("An error occurred while uploading the file.");
        }
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
                {uploadStatus && (
                    <Typography variant="body1" sx={{ mt: 2, color: "green" }}>
                        {uploadStatus}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default FileUploadPage;
