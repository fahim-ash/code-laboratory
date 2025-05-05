import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                let url = `${process.env.REACT_APP_AUTH_SERVICE}/auth/api/logout/`
                await axios.post(url, {}, { withCredentials: true });
                localStorage.removeItem("user");
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
