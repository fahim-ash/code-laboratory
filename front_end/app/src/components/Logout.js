import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await axios.post("http://localhost:8000/api/logout/", {}, { withCredentials: true });
                navigate("/");
            } catch (error) {
                console.error("Logout failed:", error);
            }
        };

        handleLogout();
    }, [navigate]);

    return <p>Logging out...</p>;
};

export default Logout;
