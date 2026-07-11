import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAuthHeaders } from "../../services/AuthHeaders"


export const GameList = () => {
    const [games, setGames] = useState([])
    const [gameFilter, setGameFilter] = useState("All")
    const navigate = useNavigate()


    const getAllGames = () => {
        fetch(`http://localhost:8000/games`, getAuthHeaders()).then(res => res.json())
        .then(data => setGames(data))
    }

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this spool?")) {
            fetch(`http://localhost:8000/games/${id}`, {
                headers: getAuthHeaders().headers,
                method: "DELETE"
            })
            .then(() => {
                getAllGames()
            })
        }
    }

    useEffect(() => {
        getAllGames()
    }, [])

    const statusColors = {
        "Playing": "#4dc9e6",
        "Finished": "#5cb85c",
        "Backlog": "#adb5bd",
        "Wishlist": "#f2a7c3"
    }

    const filterOptions = ["All", "Playing", "Finished", "Backlog", "Wishlist"]

    let visibleGames

    if(gameFilter === "All") {
        visibleGames = games
    } else {
        visibleGames = games.filter(game => game.status.name === gameFilter)
    }


    return (
        <div style={{ backgroundColor: "#e0e0e0", minHeight: "100vh", padding: "40px 0" }}>
            <div className="container" style={{ maxWidth: "950px" }}>
                <div className="bg-white p-4" style={{ borderRadius: "20px" }}>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold mb-0 text-dark">My Games</h2>
                        <button
                            className="btn text-white fw-bold"
                            style={{ backgroundColor: "#e60012", borderRadius: "8px" }}
                            onClick={() => navigate("/games/create")}
                        >
                            + Add Game
                        </button>
                    </div>

                    <div className="d-flex gap-2 mb-4 flex-wrap">
                        {filterOptions.map(name => (
                            <button
                                key={name}
                                className="btn fw-bold text-white"
                                style={{
                                    backgroundColor: gameFilter === name ? "#e60012" : "#adb5bd",
                                    borderRadius: "20px",
                                    minWidth: "110px"
                                }}
                                onClick={() => setGameFilter(name)}
                            >
                                {name}
                            </button>
                        ))}
                    </div>

                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th className="fw-bold">Title</th>
                                <th className="fw-bold">Status</th>
                                <th className="fw-bold">Rating</th>
                                <th className="fw-bold">Genres</th>
                                <th className="fw-bold text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleGames.map(game => (
                                <tr key={game.id}>
                                    <td className="fw-bold">
                                        <span
                                            style={{ cursor: "pointer" }}
                                            onClick={() => navigate(`/games/${game.id}`)}
                                        >
                                            {game.title}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className="badge fw-bold px-3 py-2"
                                            style={{
                                                backgroundColor: statusColors[game.status.name],
                                                borderRadius: "20px"
                                            }}
                                        >
                                            {game.status.name}
                                        </span>
                                    </td>
                                    <td style={{ color: "#f5c518", fontSize: "18px" }}>
                                        {"★".repeat(game.rating)}
                                    </td>
                                    <td>{game.genres.map(genre => genre.name).join(", ")}</td>
                                    <td className="text-end">
                                        {game.is_owner && (
                                            <>
                                                <button
                                                    className="btn btn-secondary btn-sm me-2 fw-bold"
                                                    onClick={() => navigate(`/games/${game.id}/edit`)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm fw-bold text-white"
                                                    style={{ backgroundColor: "#e60012" }}
                                                    onClick={() => handleDelete(game.id)}
                                                >
                                                    X
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}