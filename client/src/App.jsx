import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/authContext";

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
    return (
        <AuthProvider>
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

        </AuthProvider>
    )
}

export default App
