import { Link, useNavigate } from "react-router-dom"
import { useState } from "react" // 1. Import useState

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#e60012" }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Switch Shelf</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-controls="navbarColor01"
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/" onClick={() => setIsOpen(false)}>My Library</Link>
                        </li>

                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/login"
                                replace
                                onClick={() => {
                                    setIsOpen(false)
                                    localStorage.removeItem("switch_token")
                                }}
                            >
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}