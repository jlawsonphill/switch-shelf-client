import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getAuthHeaders } from "../../services/AuthHeaders"

export const GameDetail = () => {
    const [game, setGame] = useState({
        title: "",
        rating: 0,
        hours_played: 0,
        date_added: "",
        status: { name: "" },
        genres: []
})
    const { gameId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8000/games/${gameId}`, getAuthHeaders())
            .then(res => res.json())
            .then(data => setGame(data))
    }, [gameId])

    
    const statusColors = {
        "Playing": "#4dc9e6",
        "Finished": "#5cb85c",
        "Backlog": "#adb5bd",
        "Wishlist": "#f2a7c3"
    }

    const dateAdded = game.date_added.split("T")[0]

    return (
        <div style={{ backgroundColor: "#e0e0e0", minHeight: "100vh", padding: "40px 0" }}>
            <div className="container" style={{ maxWidth: "950px" }}>
                <div className="bg-white p-5" style={{ borderRadius: "20px" }}>

                    <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
                        <h2 className="fw-bold text-dark mb-0">{game.title}</h2>
                        <span
                            className="badge fw-bold px-3 py-2"
                            style={{
                                backgroundColor: statusColors[game.status.name],
                                borderRadius: "20px"
                            }}
                        >
                            {game.status.name}
                        </span>
                        {game.genres.map(genre => (
                            <span
                                key={genre.id}
                                className="badge fw-bold px-3 py-2"
                                style={{ backgroundColor: "#adb5bd", borderRadius: "20px" }}
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className="d-flex gap-4 align-items-start">
                        <div
                            className="d-flex align-items-center justify-content-center text-white fw-bold text-center p-3"
                            style={{
                                backgroundColor: "#5b6ef5",
                                borderRadius: "16px",
                                width: "190px",
                                height: "240px",
                                flexShrink: 0
                            }}
                        >
                            {game.title}
                        </div>

                        <div className="text-dark">
                            <p className="fs-5 mb-3">
                                <span className="fw-bold">Rating: </span>
                                <span style={{ color: "#f5c518" }}>{"★".repeat(game.rating)}</span>
                            </p>
                            <p className="fs-5 mb-3">
                                <span className="fw-bold">Hours Played: </span>{game.hours_played}
                            </p>
                            <p className="fs-5 mb-3">
                                <span className="fw-bold">Date Added: </span>{dateAdded}
                            </p>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-4">
                        <button
                            className="btn btn-lg text-white fw-bold"
                            style={{ backgroundColor: "#e60012" }}
                            onClick={() => navigate("/")}
                        >
                            Done
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}