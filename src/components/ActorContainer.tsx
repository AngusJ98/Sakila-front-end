import useFetch from "../hooks/useFetch";
import ActorInstance from "./ActorInstance";
import Actor from "../interfaces/Actor";
import { useState, useEffect } from "react";
import { Config } from "../Config";

export default function ActorContainer () {
    const { data: actors, loading, error } = useFetch<Actor[]>(Config.API_URL + "/actors");
    const [search, setSearch] = useState("");
    const [filteredActors, setFilteredActors]  = useState<Actor[]>([]);



    useEffect(() => {
        if (actors !== null) {
            const filteredItems = actors.filter(a => (a.firstName.toUpperCase() + " " + a.lastName.toUpperCase()).includes(search.toUpperCase()))
            setFilteredActors(filteredItems)
        } 
    }, [search, actors])

    function handleSearchChange (s: string) {
        setSearch(s);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: error</p>;

    return (
        <>
            <section className="instanceList">
                <section className="top">
                    <h1>List of all actors</h1>
                    <section className="coolBoxRed searchBar">
                            <input type="search" name="searchForm" id="searchForm" placeholder="Search actor names..." value={search}
                            onChange={e => handleSearchChange(e.target.value)}></input>
                        </section>
                </section>
                <ul className="instanceContainerList">
                    {filteredActors.map(a => <ActorInstance id={a.id} firstName={a.firstName} lastName={a.lastName} films={a.films}/>)}
                </ul>
            </section>
        </>
    )
}