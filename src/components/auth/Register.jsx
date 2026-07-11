import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Register = () => {
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                first_name: firstName,
                last_name: lastName,
                password: password
            })
        })
            .then(res => res.json())
            .then(authInfo => {
                if (authInfo.token) {
                    localStorage.setItem("switch_token", JSON.stringify(authInfo))
                    navigate("/")
                } else {
                    window.alert("Could not create account")
                }
            })
    }

return (
        <div style={{ backgroundColor: "#e0e0e0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="shadow" style={{ width: "420px", borderRadius: "20px", overflow: "hidden", backgroundColor: "white" }}>

                <div className="text-white text-center py-4" style={{ backgroundColor: "#e60012" }}>
                    <h1 className="fw-bold mb-1">Switch Shelf</h1>
                    <p className="mb-0">Create an account</p>
                </div>

                <div className="p-4">
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label className="form-label text-dark fw-bold" htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName"
                                value={firstName}
                                onChange={evt => setFirstName(evt.target.value)}
                                className="form-control"
                                placeholder="First name"
                                required autoFocus />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-dark fw-bold" htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName"
                                value={lastName}
                                onChange={evt => setLastName(evt.target.value)}
                                className="form-control"
                                placeholder="Last name"
                                required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-dark fw-bold" htmlFor="username">Username</label>
                            <input type="text" id="username"
                                value={username}
                                onChange={evt => setUsername(evt.target.value)}
                                className="form-control"
                                placeholder="Username"
                                required />
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
                            Register
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <Link to="/login">Already have an account?</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}