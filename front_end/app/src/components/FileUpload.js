import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, Button, Box, LinearProgress } from "@mui/material";

const FileUploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setProgress(0); // Reset progress
        setUploadStatus("");
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus("Please select a file first.");
            return;
        }

        let chunkSize = 1024 * 1024 * 2; // 2MB chunks
        let totalSize = selectedFile.size;
        let totalChunks = Math.ceil(totalSize / chunkSize);
        let uploadedChunks = 0;

        for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
            let start = chunkNumber * chunkSize;
            let end = Math.min(start + chunkSize, totalSize);
            let chunk = selectedFile.slice(start, end);

            let formData = new FormData();
            formData.append("file", chunk);
            formData.append("file_name", selectedFile.name);
            formData.append("chunk_number", chunkNumber);
            formData.append("total_chunks", totalChunks);
            formData.append("description", "Chunked file upload");

            try {
                await axios.post("/file/api/upload/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
                    {withCredentials: true}
                    );

                uploadedChunks += 1;
                setProgress(Math.round((uploadedChunks / totalChunks) * 100));
            } catch (error) {
                console.error("Chunk upload error:", error);
                setUploadStatus("Error uploading file. Please try again.");
                return;
            }
        }

        setUploadStatus("File uploaded successfully!");
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 10 }}>
                <Typography variant="h4" gutterBottom>
                    Upload Large File
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
                <LinearProgress variant="determinate" value={progress} sx={{ mt: 2 }} />
                <Typography variant="body1" sx={{ mt: 2, color: progress === 100 ? "green" : "black" }}>
                    {progress}% uploaded
                </Typography>
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
