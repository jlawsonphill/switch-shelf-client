import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8000/login`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(authInfo => {
                if (authInfo.token) {
                    localStorage.setItem("switch_token", JSON.stringify(authInfo))
                    navigate("/")
                } else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <div style={{ backgroundColor: "#e0e0e0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="shadow" style={{ width: "420px", borderRadius: "20px", overflow: "hidden", backgroundColor: "white" }}>

                <div className="text-white text-center py-4" style={{ backgroundColor: "#e60012" }}>
                    <h1 className="fw-bold mb-1">Switch Shelf</h1>
                    <p className="mb-0">Please sign in</p>
                </div>

                <div className="p-4">
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label text-dark fw-bold" htmlFor="username">Username</label>
                            <input type="text" id="username"
                                value={username}
                                onChange={evt => setUsername(evt.target.value)}
                                className="form-control"
                                placeholder="Username"
                                required autoFocus />
                        </div>

                        <div className="mb-4">
                            <label className="form-label text-dark fw-bold" htmlFor="password">Password</label>
                            <input type="password" id="password"
                                value={password}
                                onChange={evt => setPassword(evt.target.value)}
                                className="form-control"
                                placeholder="Password"
                                required />
                        </div>

                        <button
                            type="submit"
                            className="btn w-100 text-white fw-bold py-2"
                            style={{ backgroundColor: "#e60012" }}
                        >
                            Sign in
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <Link to="/register">Not a member yet?</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}