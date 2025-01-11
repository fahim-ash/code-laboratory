import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const getFiles = async () => {
    return axios.get(`${API_BASE_URL}/files`);
};
