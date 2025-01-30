import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const TokenValidate = ({children}) => {
    const navigate = useNavigate();
    let [flag, setFlag] = useState(false);
    

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await axios.post(
                    '/auth/api/valid_user/',
                    {},
                    {withCredentials: true}
                );
                if (!response.data.success) {
                    setFlag(false)
                    navigate("/");
                    
                }else{
                    setFlag(true);

                }

            } catch (error) {
                setFlag(false)
                navigate("/");
            }
        };

        validateToken();
    }, [navigate]);

    if (flag){
        return <>{children}</>
    }else{
        return null;
    };
};

export default TokenValidate;
