import useFetch from "../hooks/useFetch";
import FilmInstance from "./1ilmInstance";
import { Config } from "../Config";
import Film from "../interfaces/Film";
import { useEffect, useState } from "react";

export default function FilmContainer () {
    const { data: films, loading, error } = useFetch<Film[]>(Config.API_URL + "/films");
    const [search, setSearch] = useState("");
    const [filteredFilms, setFilteredFilms]  = useState<Film[]>([]);
    
    
    
    useEffect(() => {
        if (films !== null) {
            const filteredItems = films.filter(f => f.title.toUpperCase().includes(search.toUpperCase()) || f.description.toUpperCase().includes(search.toUpperCase()))
            setFilteredFilms(filteredItems)
        } 
    }, [search, films]) //Should be used whenever films is changed (should happen only when it's loaded, and when search bar content changes)

    function handleSearchChange (s: string) {
        setSearch(s);
    }


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error... oops</p>


    

    if (filteredFilms === null || filteredFilms === undefined) {
        return (<p>Films is undefined/null for some reason</p>)
    }
    

    return (
        <>
            <section className="instanceList">
                <section className="top">
                <h1>List of all films</h1>
                    <section className="coolBoxRed searchBar">
                        <input type="search" name="searchForm" id="searchForm" placeholder="Search titles and descriptions..." value={search}
                        onChange={e => handleSearchChange(e.target.value)}></input>
                    </section>
                </section>
                <ul className="instanceContainerList">
                    {filteredFilms!.map(film => (
                            <FilmInstance id={film.id} title={film.title} description={film.description} releaseYear = {film.releaseYear} key={film.id} />
                        ))}
                </ul>
            </section>
        </>
    )
}