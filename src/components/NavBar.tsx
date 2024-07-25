import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/films">FILMS</Link>
            <Link to="/actors">ACTORS</Link>
    
        </nav>
    )
}