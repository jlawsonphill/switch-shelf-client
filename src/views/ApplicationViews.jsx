import { Outlet, Route, Routes } from "react-router-dom"
import { GameList } from "../components/Games/GameList"
import { GameForm } from "../components/Games/GameForm"
import { NavBar } from "../components/nav/NavBar"
import {GameDetail} from "../components/Games/GameDetails"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <NavBar />
                    <Outlet />
                </>
            }>
                {/* Home Page */}
                <Route index element={<GameList />} />
                
                {/* Create Page */}
                <Route path="games/create" element={<GameForm />} />
                
                {/* EDIT PAGE - Linking to GameForm*/}
                <Route path="games/:gameId/edit" element={<GameForm />} />
                
                {/* GameDetails page*/}
                <Route path="games/:gameId" element={<GameDetail />} />
                
            </Route>
        </Routes>
    )
}