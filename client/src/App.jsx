import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import * as authService from "./services/authService";
import AuthContext from "./contexts/authContext";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import AllRecipes from "./components/all-recipes/AllRecipes";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Logout from "./components/logout/Logout";

import "./App.css";

function App() {
    const [auth, setAuth] = useState(() => {
        localStorage.removeItem("accessToken");

        return {};
    });
    const navigate = useNavigate();

    const loginSubmitHandler = async (values) => {
        const result = await authService.login(values.email, values.password);

        localStorage.setItem("accessToken", result.accessToken);
        setAuth(result);

        navigate("/");
    };

    const registerSubmitHandler = async (values) => {
        if (values.password !== values['repeat-password']) {
            alert("Passwords do not match!");

            return;
        }
        
        const result = await authService.register(values.email, values.password);

        localStorage.setItem("accessToken", result.accessToken);
        setAuth(result);

        navigate("/");
    };

    const logoutHandler = () => {
        localStorage.removeItem("accessToken");
        setAuth({});

        navigate("/");
    }

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        username: auth.username || auth.email,
        email: auth.email,
        isAuthenticated: !!auth.email,
    };

    return (
        <AuthContext.Provider value={values}>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/all-recipes" element={<AllRecipes />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>

        </AuthContext.Provider>
    )
}

export default App
