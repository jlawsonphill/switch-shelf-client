import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {getAuthHeaders} from "../../services/AuthHeaders"

export const GameForm = () => {
    const [game, setGame] = useState({
        title: "",
        statusId: 0,
        rating: 0,
        hours_played: 0,
        genreIds: [],
        
    })
    const [statuses, setStatuses] = useState([])
    const [genres, setGenres] = useState([])

    const { gameId } = useParams() 
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:8000/status", getAuthHeaders()).then(res => res.json()).then(setStatuses)
        fetch("http://localhost:8000/genres", getAuthHeaders()).then(res => res.json()).then(setGenres)

        if (gameId) {
            fetch(`http://localhost:8000/games/${gameId}`, getAuthHeaders())
                .then(res => res.json())
                .then((data) => {
                    setGame({
                        title: data.title,
                        rating: data.rating,
                        hours_played: data.hours_played,
                        statusId: data.status.id,
                        genreIds: data.genres.map(genre => genre.id)
                    })
                })
        }
    }, [gameId])

    const handleSave = (event) => {
        event.preventDefault()

        if (game.title === "" || parseInt(game.statusId) === 0 || parseInt(game.rating) === 0 || game.genreIds.length === 0)   {
            window.alert("Please fill in a title, pick a status and a rating, and select at least one genre")
            return
        }


        const gameToSend = {
            title: game.title,
            rating: parseInt(game.rating),
            hours_played: parseInt(game.hours_played),
            status: parseInt(game.statusId),
            genres: game.genreIds
        }

        if (gameId) {
            fetch(`http://localhost:8000/games/${gameId}`, {
                method: "PUT",
                // ... allows you to combine objects together. .headers reaches into getAuthHeaders and
                // grabs the inner piece after without headers key
                headers: {...getAuthHeaders().headers, "Content-Type": "application/json" },
                body: JSON.stringify(gameToSend)
            })
            .then(() => navigate("/"))
        } else {
            fetch("http://localhost:8000/games", {
                method: "POST",
                headers: {...getAuthHeaders().headers, "Content-Type": "application/json" },
                body: JSON.stringify(gameToSend)
            })
            .then(() => navigate("/"))
        }
    }

    const updateState = (evt) => {
        
        const copy = { ...game }
        copy[evt.target.name] = evt.target.value
        setGame(copy)

    }

const handleGenreCheckbox = (evt) => {
    const genreId = parseInt(evt.target.value)
    const copy = { ...game }

    if (evt.target.checked) {
        copy.genreIds = [...copy.genreIds, genreId]        // add it
    } else {
        copy.genreIds = copy.genreIds.filter(id => id !== genreId)   // remove it
    }

    setGame(copy)
}

    return (
        <div className="container mt-5" style={{maxWidth: "800px"}}>
            <div className="card mb-3 shadow">
                <div className="card-header text-white" style={{ backgroundColor: "#e60012" }}>
                    {gameId ? "Edit Game" : "Add New Game"}
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group mb-4">
                            <label className="form-label text-dark fw-bold">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                placeholder="e.g. Mario Kart World"
                                value={game.title}
                                onChange={updateState}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label className="form-label text-dark fw-bold">Status</label>
                            <select
                                className="form-select"
                                name="statusId"
                                onChange={updateState}
                                value={game.statusId}
                            >
                                <option value="0">Select a Status...</option>
                                {statuses.map(status => (
                                    <option key={status.id} value={status.id}>{status.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group mb-4">
                            <label className="form-label text-dark fw-bold">Rating</label>
                            <select
                                className="form-select"
                                name="rating"
                                onChange={updateState}
                                value={game.rating}
                            >
                                <option value="0">Select a Rating...</option>
                                <option value="1">1 ★</option>
                                <option value="2">2 ★★</option>
                                <option value="3">3 ★★★</option>
                                <option value="4">4 ★★★★</option>
                                <option value="5">5 ★★★★★</option>
                            </select>
                        </div>

                        <div className="form-group mb-4">
                            <label className="form-label text-dark fw-bold">Hours Played</label>
                            <input
                                type="number"
                                className="form-control"
                                name="hours_played"
                                value={game.hours_played}
                                onChange={updateState}
                                onKeyDown={(evt) => {
                                    if (["e", "E", "+", "-"].includes(evt.key)) {
                                        evt.preventDefault()
                                    }}}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label className="form-label text-dark fw-bold">Genres</label>
                            <div className="d-flex flex-wrap gap-3">
                                {genres.map(genre => (
                                    <div className="form-check" key={genre.id}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`genre-${genre.id}`}
                                            value={genre.id}
                                            onChange={handleGenreCheckbox}
                                            checked={game.genreIds.includes(genre.id)}
                                        />
                                        <label className="form-check-label" htmlFor={`genre-${genre.id}`}>
                                            {genre.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mt-5">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={(e) => {
                                    e.preventDefault()
                                    navigate("/")
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn text-white fw-bold btn-lg"
                                style={{ backgroundColor: "#e60012" }}
                                onClick={handleSave}
                            >
                                {gameId ? "Update Game" : "Save Game"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}