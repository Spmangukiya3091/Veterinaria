import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetLoginUserDetailsQuery } from "./services/ApiServices";

const useAuth = () => {
    const [cookies, , removeCookie] = useCookies(["user"]);
    const navigate = useNavigate();
    const token = cookies.user;
    const { data, isLoading, isError } = useGetLoginUserDetailsQuery(token);

    useEffect(() => {
        if (!token || isError) {
            removeCookie("user");
            navigate("/");
        }
    }, [token, isError, navigate, removeCookie]);

    return { data, isLoading, isError };
};

export default useAuth;
