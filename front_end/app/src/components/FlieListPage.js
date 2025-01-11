import React from "react";
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Box,
} from "@mui/material";

const FileListPage = () => {
    const files = ["file1.txt", "file2.jpg", "file3.pdf"]; // Example files

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 10 }}>
                <Typography variant="h4" gutterBottom>
                    File List
                </Typography>
                <List>
                    {files.map((file, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={file} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default FileListPage;
