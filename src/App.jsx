import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import "./App.css"

export const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Layout Route Pattern:
                1. <Authorized> renders first.
                2. If logged in, it renders <Outlet />.
                3. <Outlet /> renders the child route (<ApplicationViews />). 
            */}
            <Route element={<Authorized />}>
                <Route path="*" element={<ApplicationViews />} />
            </Route>
        </Routes>
    )
}