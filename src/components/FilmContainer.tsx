import useFetch from "../hooks/useFetch";
import FilmInstance from "./filmInstance";
import Film from "../interfaces/film";

export default function FilmContainer () {
    const { data: films, loading, error } = useFetch<Film[]>("http://localhost:8080/films");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: error</p>;

    const filmList = films!.map(film => (
        <FilmInstance id={film.id} title={film.title} description={film.description} releaseYear = {film.releaseYear} key={film.id} />
    ))

    return (
        <>
            <section className="filmList">
                <h1>List of all films</h1>

                <ul className="filmContainerList">
                    {filmList}
                </ul>
            </section>
        </>
    )
}