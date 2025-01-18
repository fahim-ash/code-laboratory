import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const TokenValidate = ({children}) => {
    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:8000/api/valid_user/',
                    {},
                    {withCredentials: true}
                );
                console.log("response---:", response)
                if (!response.data.success) {
                    navigate("/");
                }
            } catch (error) {
                console.error("Token validation failed:", error);
                navigate("/");
            }
        };

        validateToken();
    }, [navigate]);

    return <>{children}</>;
};

export default TokenValidate;
