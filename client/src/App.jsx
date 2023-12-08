import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import * as authService from "./services/authService";
import AuthContext from "./contexts/authContext";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import UserProfile from "./components/user-profile/UserProfile";
import AllRecipes from "./components/all-recipes/AllRecipes";
import RecipeDetails from "./components/recipe-details/RecipeDetails";
import AddRecipe from "./components/add-recipe/AddRecipe";
import EditRecipe from "./components/edit-recipe/EditRecipe";
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
        try {
            const result = await authService.login(values.email, values.password);
    
            localStorage.setItem("accessToken", result.accessToken);
            setAuth(result);
    
            navigate("/");
            
            return { result: result, error: null }
            
        } catch (error) {
            return { result: null, error: error.message }
        }
    };

    const registerSubmitHandler = async (values) => {
        try {
            const result = await authService.register(values.email, values.password);
    
            localStorage.setItem("accessToken", result.accessToken);
            setAuth(result);
    
            navigate("/");

            return { result, error: null }
            
        } catch (error) {
            return { result: null, error: error.message }
        }
        
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
        id: auth._id,
        isAuthenticated: !!auth.email,
    };

    return (
        <AuthContext.Provider value={values}>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/my-profile" element={<UserProfile />} />
                <Route path="/all-recipes" element={<AllRecipes />} />
                <Route path="/all-recipes/:recipeId" element={<RecipeDetails />} />
                <Route path="/add-recipe" element={<AddRecipe />} />
                <Route path="/all-recipes/:recipeId/edit-recipe" element={<EditRecipe />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>

        </AuthContext.Provider>
    )
}

export default App
