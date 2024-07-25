import { Link, useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import Actor from "../interfaces/Actor";

export default function ActorDetail () {
    const {actorId} = useParams();
    const { data: actor, loading, error } = useFetch<Actor>("http://localhost:8080/actors/" + actorId);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: error</p>;
    if (actor === undefined || actor === null) {
        return <p>Somehow actor was null/undefined. Very sad.</p>
    }

    const filmLinks = actor.films.map(f => <Link to={"/films/" + f.id}>{f.title}</Link>)
    return (
        <div className="coolBoxRed">
        <h1>{actor.firstName + " " + actor.lastName}</h1>
        <h2>Films</h2>
        <ul className="cast-list">
            {filmLinks}
        </ul>
      </div>
    )
}
