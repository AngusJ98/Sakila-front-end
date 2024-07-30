import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Film from "../interfaces/Film";


export default function FilmDetail() {
    const {filmId} = useParams();
    const { data: film, loading, error } = useFetch<Film>("/films/" + filmId);
    if (loading) return <p>Loading...</p>;
    if (error) return <section id="error"> <h1>Error: Something went wrong</h1> <Link className="coolBoxRed" to="/">GO HOME</Link> </section>;
    if (film === undefined || film === null) {
        return <p>Somehow film was null/undefined. Very sad.</p>
    }
    return (
        <>
 <article className="coolBoxRed wideFixedBox">
    <h1>{film.title}</h1>
    <section className="film-details">
      <span>Release Year: {film.releaseYear}</span>
      <span>Language: {film.language.name}</span>
      <span>Rating: {film.rating}</span>
    </section>
    <section className="film-description">
      {film.description}
    </section>
    <h2>Cast</h2>
    <ul className="cast-list">
        {film.cast.map(a => <Link to={"/actors/" + a.id} key={a.id}>{a.firstName} {a.lastName}</Link>)}
    </ul>
    <h2>Special Features</h2>
    <ul className="special-features">
        {film?.specialFeatures.join(", ")}
    </ul>
    
    <h2>Rental Details</h2>
    <p><strong>Rental cost:</strong> {film.rentalRate} </p>
    <p><strong>Rental Duration:</strong> {film.rentalDuration} days</p>
    
    
</article>
    <Link to="/films">Back to Films</Link>
        </>
    )
}