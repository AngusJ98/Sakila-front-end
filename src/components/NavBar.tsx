import { Link } from "react-router-dom"
export default function NavBar() {


    return (
        <nav className="navBar">
            <Link to="/" className="navButton">Home</Link>
            <Link to="/films" className="navButton">Films</Link>
            <Link to="/actors" className="navButton">Actors</Link>
    
        </nav>
    )
}