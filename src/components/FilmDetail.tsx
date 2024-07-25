import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Film from "../interfaces/Film";


export default function FilmDetail() {
    const {filmId} = useParams();
    const { data: film, loading, error } = useFetch<Film>("http://localhost:8080/films/" + filmId);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: error</p>;
    if (film === undefined || film === null) {
        return <p>Somehow film was null/undefined. Very sad.</p>
    }
    return (
        <>
 <div className="coolBoxRed">
    <h1>{film.title}</h1>
    <div className="film-details">
      <span>Release Year: {film.releaseYear}</span>
      <span>Language: {film.language.name}</span>
      <span>Rating: {film.rating}</span>
    </div>
    <div className="film-description">
      {film.description}
    </div>
    <h2>Cast</h2>
    <ul className="cast-list">
        {film.cast.map(a => <Link to={"/actors/" + a.id}>{a.firstName} {a.lastName}</Link>)}
    </ul>
    <h2>Special Features</h2>
    <ul className="special-features">
        {film?.specialFeatures}
    </ul>
  </div>
            <Link to="/films">Back to Films</Link>
        </>
    )
}