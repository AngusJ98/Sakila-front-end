import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <nav>
            <Link to="/" className="navButton">Home</Link>
            <Link to="/films" className="navButton">FILMS</Link>
            <Link to="/actors" className="navButton">ACTORS</Link>
    
        </nav>
    )
}